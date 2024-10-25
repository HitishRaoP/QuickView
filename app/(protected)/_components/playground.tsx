"use client"

import { Metadata } from "next"
import { SummaryDelete } from "./summary-delete"
import { Summary } from "./summary"
import { YoutubeVideoDetails } from "./youtube-video-details"
import { useSearchParams } from "next/navigation"

export const metadata: Metadata = {
  title: "Summary",
  description: "Get summary of any youtube video",
}

export function Playground() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("vid") as string;
  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="md:text-2xl lg:text-3xl font-bold">Playground</h1>
        <div className="flex gap-2">
          <SummaryDelete videoId={videoId} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <YoutubeVideoDetails />
        <Summary />
      </div>
    </div>
  );
}
