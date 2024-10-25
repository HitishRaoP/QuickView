"use server"

import { db } from "@/lib/db";
import { ContactSchema } from "@/schemas";
import { z } from "zod";

export async function addContactToDb({ email, info }: z.infer<typeof ContactSchema>) {
    try {
        await db.contact.create({
            data: {
                email,
                info
            }
        })
    } catch (error) {
        throw new Error("Unable to add contact to db");
    }
}