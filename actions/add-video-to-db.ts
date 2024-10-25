"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getVideoIdFromYoutube } from "./get-videoId-from-youtube"
import { getVideoInfoFromYoutube } from "./get-videoinfo-from-youtube"

export async function addVideoToDb(url: string) {
    try {
        const session = await auth()
        const { videoId } = await getVideoIdFromYoutube(url);

        const { videoInfo } = await getVideoInfoFromYoutube(videoId as string);

        if (!videoId) {
            return {
                message: "Failed to get video ID"
            }
        }

        await db.video.create({
            data: {
                id: videoId,
                userId: session?.user.id,
                title : videoInfo.title,
            }
        })

        return {
            message: "Video added to DB successfully"
        }
    } catch (error) {
        return {
            message: "Failed to add video to DB",
            error: error
        }
    }
}