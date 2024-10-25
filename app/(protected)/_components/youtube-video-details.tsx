"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { VideoInfo } from "youtubei.js";
import { getVideoInfoFromYoutube } from "@/actions/get-videoinfo-from-youtube"
import { Calendar, Fingerprint, UserRound } from "lucide-react"
import { FaYoutube } from "react-icons/fa"
import { getVideoInfoFromDb } from "@/data/get-videoInfo-from-db"
import Link from "next/link";

const getListElements = (videoId: string, videoInfo: VideoInfo | null, date: Date | null) => {
  if (!videoInfo || !date) return [];
  return [
    {
      name: "Source",
      icon: <FaYoutube className="w-4 h-4" />,
      description: `https://www.youtube.com/watch?v=${videoId}`,
    },
    {
      name: "Channel",
      icon: <UserRound className="w-4 h-4" />,
      description: videoInfo.author,
    },
    {
      name: "Created",
      icon: <Calendar className="w-4 h-4" />,
      description: date.toDateString(),
    },
    {
      name: "Video ID",
      icon: <Fingerprint className="w-4 h-4" />,
      description: videoId,
    },
  ];
}

export function YoutubeVideoDetails() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("vid") as string;
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [listElements, setListElements] = useState<any[]>([]);

  useEffect(() => {
    if (videoId) {
      getVideoInfoFromYoutube(videoId).then((res) => {
        setVideoInfo(res.videoInfo);
      });
    }
  }, [videoId]);

  useEffect(() => {
    const fetchDateFromDb = async () => {
      if (videoId) {
        const dbInfo = await getVideoInfoFromDb(videoId);
        if (dbInfo?.videoInfo?.createdAt) {
          setDate(new Date(dbInfo.videoInfo.createdAt));
        }
      }
    };

    fetchDateFromDb();
  }, [videoId]);

  useEffect(() => {
    const fetchListElements = async () => {
      if (videoId && videoInfo && date) {
        const elements = await getListElements(videoId, videoInfo, date);
        setListElements(elements);
      }
    };

    fetchListElements();
  }, [videoId, videoInfo, date]);

  return (
    <div className="border bg-background-secondary p-6 rounded-lg flex gap-4 flex-col">
      <iframe
        className="rounded-xl border h-[200px] sm:h-[400px] lg:h-full lg:w-[500px]"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
      <div className="grid pt-1 gap-4 h-full">
        {
          listElements.length > 0 && listElements.map((element, index) => (
            <div key={index}>
              <h2 className="text-sm text-neutral-400 mb-2 flex gap-1 items-center">
                {element.icon}
                {element.name}
              </h2>
              {
                element.description.includes("https://") ? (
                  <Link
                    className="text-sm font-semibold line-clamp-1 text-blue-500"
                    href={element.description}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {element.description}
                  </Link>
                ) : (
                  <p className="text-sm font-semibold line-clamp-1">{element.description}</p>
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}
