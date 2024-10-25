"use server";

import { db } from "@/lib/db";

export async function addUserCredits(userId: string) {

    try {
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                credits: {
                    increment: 10,
                },
            },
        });
    } catch (error) {
        console.error("Error updating user credits:", error);
        throw new Error("Unable to update user credits");
    }
}
