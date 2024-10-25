import Stripe from "stripe";
import { NextRequest } from "next/server";
import { addPaymentToDb } from "@/actions/add-payment-to-db";
import { addUserCredits } from "@/actions/add-user-credits";
import { getUserByEmail } from "@/data/user";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
    const rawBody = await request.text();
    const stripeSignature = request.headers.get("stripe-signature");

    try {
        let event;

        try {
            event = stripe.webhooks.constructEvent(rawBody, stripeSignature!, endpointSecret!);
        } catch (err) {
            return new Response(`Webhook Error: ${err}`, { status: 400 });
        }

        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object;
                console.log("Payment succeeded:", session);

                if (session.payment_status === "paid") {
                    const user = await getUserByEmail(session.customer_details?.email as string);
                    await addPaymentToDb({
                        userId: user?.id as string,
                        session_id: session.id,
                        payment_status: session.payment_status,
                    });

                    await addUserCredits(user?.id as string);
                }
                break;
            default:
                console.warn("Unhandled event type:", event.type);
        }
        return new Response("Webhook received successfully", { status: 200 });
    } catch (error) {
        return new Response(`Webhook Error: ${error}`, { status: 400 });
    }
}
