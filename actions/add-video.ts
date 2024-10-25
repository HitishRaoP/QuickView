"use server"

import { checkVideoInDb } from "@/data/check-video-in-db"
import { addVideoToDb } from "./add-video-to-db"
import { addSummaryToRedis } from "./add-summary-to-redis"
import { getVideoIdFromYoutube } from "./get-videoId-from-youtube"
import { getUserCredits } from "@/data/get-user-credits"
import { subtractUserCredits } from "./subtract-user-credits"
import { getVideoInfoFromYoutube } from "./get-videoinfo-from-youtube"
import { redirect } from "next/navigation"

export async function addVideo(url: string) {
    try {
        const { videoId } = await getVideoIdFromYoutube(url)
        const { video } = await checkVideoInDb(url)

        if (video) {
            return {
                message: "Video found in DB",
                videoId: videoId as string
            }
        }

        const credits = await getUserCredits().then(res => res?.credits as number)

        if (credits < 1) {
            return {
                message: "Not enough credits",
                videoId: null
            }
        }

        await addVideoToDb(url)
        await addSummaryToRedis(url)
        await subtractUserCredits();

        return {
            message: "Video added successfully",
            videoId: videoId as string
        }

    } catch (error) {
        return {
            message: "Failed to add video",
            error: error
        }
    }
}