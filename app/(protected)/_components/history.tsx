import { HistoryCard } from './history-card';
import { getVideosFromDb } from '@/data/get-videos-from-db';

export const History = async () => {
    const { videos } = await getVideosFromDb();
    return (
        <div className="p-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {videos?.map((video, index) => {
                return (<HistoryCard key={index} videoId={video.id} />);
            })}
        </div>
    );
};