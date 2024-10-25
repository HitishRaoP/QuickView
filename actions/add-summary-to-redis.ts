"use server"

import { loadSummarizationChain } from "langchain/chains";
import { getTranscriptFromYoutube } from "./get-transcript-from-youtube";
import { model } from "@/lib/model";
import { getRedisClient } from "./redis-client";
import { SUMMARY_PROMPT } from "@/lib/summary-template";
import { auth } from "@/auth";
import { getVideoIdFromYoutube } from "./get-videoId-from-youtube";

export async function addSummaryToRedis(url: string) {

    try {
        const session = await auth();

        const { videoId } = await getVideoIdFromYoutube(url);

        const { transcript } = await getTranscriptFromYoutube(url);

        const chain = loadSummarizationChain(model, { type: "map_reduce", combinePrompt: SUMMARY_PROMPT });

        const res = await chain.invoke({
            input_documents: transcript,
        });
        
        const client = await getRedisClient();

        await client.set(`${session?.user?.id}:${videoId}:summary`, JSON.stringify(res));

        return {
            message: "Summary added to Redis",
            summary: res
        }

    } catch (error) {

        return {
            message: "Failed to add summary to Redis",
            error: error
        }
    }


}