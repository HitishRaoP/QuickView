'use client';

import { deleteVideoContent } from '@/actions/delete-video-content';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getVideoInfoFromDb } from '@/data/get-videoInfo-from-db';
import { Ellipsis, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

export const HistoryCard = ({ videoId }: { videoId: string }) => {
  const router = useRouter();
  const [data, setData] = React.useState<
    | {
        createdAt: Date;
      }
    | null
    | undefined
  >();

  useEffect(() => {
    async function fetchVideoDetails() {
      if (videoId) {
        const {videoInfo} = await getVideoInfoFromDb(videoId);
        setData(videoInfo);
      }
    }
    fetchVideoDetails();
  }, [videoId]);

  const handleDeleteContent = async () => {
    await toast.promise(deleteVideoContent(videoId), {
      loading: 'Loading...',
      success: 'Content cleared',
      error: 'Error clearing content',
    });
    router.push("/history");
  };
  return (
    <div className="flex h-fit flex-col rounded-lg border bg-card">
      <iframe
        className="h-52 w-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <Link href={`/playground?vid=${videoId}`}>
        <div className="flex items-center justify-between p-4 text-sm text-muted-foreground">
          {data?.createdAt.toDateString()}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={handleDeleteContent}
                className="cursor-pointer text-red-500 focus:bg-[#2A1314] focus:text-red-500"
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Link>
    </div>
  );
};