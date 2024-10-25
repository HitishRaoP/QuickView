'use server';

import { Innertube, VideoInfo } from 'youtubei.js';

export async function getVideoInfoFromYoutube(videoId: string): Promise<VideoInfo> {
    const y = await Innertube.create();

    const result = (await y.getBasicInfo(videoId));

    const videoInfo = JSON.parse(JSON.stringify(result.basic_info));

    return {
        message: "Video info retrieved successfully",
        videoInfo: videoInfo
    }

}