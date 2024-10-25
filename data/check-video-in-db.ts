"use server"

import { getVideoIdFromYoutube } from "@/actions/get-videoId-from-youtube";
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function checkVideoInDb(url: string) {
    const session = await auth();
    const { videoId } = await getVideoIdFromYoutube(url);

    try {
        const video = await db.video.findUnique({
            where: {
                id: videoId as string,
                userId: session?.user.id
            }
        })

        if (!video) {
            return {
                message: "Video not found in DB",
                video: null
            }
        }

        return {
            message: "Video found in DB",
            video: video
        }
    } catch (error) {
        return {
            message: "Video not found in DB",
            error: error
        }
    }
}