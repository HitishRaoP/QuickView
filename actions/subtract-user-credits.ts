"use server";

import { auth } from "@/auth";
import { getUserCredits } from "@/data/get-user-credits";
import { db } from "@/lib/db";

export async function subtractUserCredits() {
    try {
        const session = await auth();
        if (!session || !session.user) {
            throw new Error("User not authenticated");
        }

        const credits = await getUserCredits().then(res => res?.credits as number);

        if (credits < 1) {
            throw new Error("User credits is less than 1");
        }

        await db.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                credits: {
                    decrement: 1,
                },
            },
        });

    } catch (error) {
        console.error("Error updating user credits:", error);
        throw new Error("Unable to update user credits");
    }
}
