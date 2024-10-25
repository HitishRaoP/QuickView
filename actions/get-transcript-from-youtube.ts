'use server';

import { auth } from '@/auth';
import { YoutubeLoader } from '@langchain/community/document_loaders/web/youtube';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { getVideoIdFromYoutube } from './get-videoId-from-youtube';

export async function getTranscriptFromYoutube(url: string) {
    try {

        const { videoId } = await getVideoIdFromYoutube(url);

        const session = await auth();

        const loader = YoutubeLoader.createFromUrl(url, {
            language: 'en',
            addVideoInfo: true,
        });

        const docs = await loader.load();

        const docsWithMetadata = docs.map((doc) => ({
            ...doc,
            metadata: {
                ...doc.metadata,
                userId: session?.user?.id,
                videoId: videoId,
            },
        }));

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const chunkedDocs = await textSplitter.splitDocuments(docsWithMetadata);

        return {
            message: "Transcript fetched successfully",
            transcript: chunkedDocs,
            docs : JSON.stringify(chunkedDocs),
        };

    } catch (error) {

        return {
            message: "Failed to fetch transcript",
            error: error
        }
    }
}