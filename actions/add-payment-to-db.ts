"use server"

import { db } from "@/lib/db"
import { PaymentSchema } from "@/schemas"
import { z } from "zod"

export async function addPaymentToDb({ userId, session_id, payment_status }: z.infer<typeof PaymentSchema>) {
    try {
        await db.payment.create({
            data: {
                session_id,
                payment_status,
                userId: userId
            }
        })
        return {
            message: "Payment details added to db"
        }
    } catch (error) {
        return {
            message: "Error adding payment details to db",
            error
        }
    }
}