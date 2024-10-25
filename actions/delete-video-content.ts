"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getRedisClient } from "./redis-client"

export async function deleteVideoContent(videoId: string) {
    try {
        const session = await auth()

        const client = await getRedisClient()
        
        await client.del(`${session?.user?.id}:${videoId}:summary`)

        await db.video.delete({
            where: {
                id: videoId,
                userId: session?.user.id
            }
        })
        
        return {
            message: "Video content deleted successfully"
        }
    } catch (error) {
        return {
            message: "Failed to delete video content",
            error: error
        }
    }
}