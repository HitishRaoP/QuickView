"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getPaymentsFromDb = async () => {
    try {
        const session = await auth()
        const payments = await db.payment.findMany({
            where: {
                userId: session?.user.id
            },
            select: {
                id: true,
                session_id: true,
                payment_status: true,
                createdAt: true
            }
        })
        return payments;
    } catch (error) {
        throw new Error("Failed to get payments from db")
    }
}