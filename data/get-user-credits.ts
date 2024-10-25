"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db";

export async function getUserCredits() {
    const session = await auth();

   return await db.user.findUnique({
        where: {
            id: session?.user?.id
        },
        select: {
            credits: true
        }
    })
}