"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function getVideoInfoFromDb(videoId: string) {
    try {
        const session = await auth()
        const videoInfo = await db.video.findUnique({
            where: {
                id: videoId,
                userId: session?.user.id
            }
        })

        return {
            message: "Video info retrieved successfully",
            videoInfo: videoInfo
        }
    } catch (error) {
        return {
            message: "Failed to retrieve video info",
            error: error
        }
    }
}