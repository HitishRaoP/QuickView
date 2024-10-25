"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { feedbackSchema } from "@/schemas";
import { z } from "zod";

export async function addFeedbackToDb({ feedback }: z.infer<typeof feedbackSchema>) {
    try {
        const session = await auth();
        await db.feedback.create({
            data: {
                userId: session?.user.id,
                feedback
            }
        })
    } catch (error) {
        throw new Error("Unable to add contact to db");
    }
}