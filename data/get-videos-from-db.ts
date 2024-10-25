"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db";

export async function getVideosFromDb(take?: number) {
    try {
        const session = await auth();

        const videos = await db.video.findMany({
            where: {
                userId: session?.user.id
            },
            select: {
                id: true,
                userId: true,
                createdAt: true,
                title: true
            },
            take: take
        })

        return {
            message: "Videos retrieved successfully",
            videos: videos
        }
    } catch (error) {
        return {
            message: "Failed to retrieve videos",
            error: error
        }
    }
}