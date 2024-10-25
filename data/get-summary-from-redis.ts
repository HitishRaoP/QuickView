"use server"

import { getRedisClient } from "@/actions/redis-client";
import { auth } from "@/auth";

export async function getSummaryFromRedis(videoId: string) {

    const client = await getRedisClient();
    
    const session = await auth();

    const summary = await client.get(`${session?.user?.id}:${videoId}:summary`) as string;

    if (!summary) {
        return {
            message: "Summary not found in Redis",
            summary: null
        }
    }

    return {
        message: "Summary retrieved successfully",
        summary: JSON.parse(summary).text,
    }

}