'use server';

import getYouTubeID from 'get-youtube-id';

export async function getVideoIdFromYoutube(url: string) {
    try {
        const id = getYouTubeID(url);
        return {
            message: "Video ID retrieved successfully",
            videoId: id as string
        };
    } catch (error) {
        return {
            message: "Failed to retrieve video ID",
            error: error
        }
    }
}