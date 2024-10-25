"use client"

import {
  ChevronRight,
  Folder,
  MoreHorizontal,
  Trash,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Video } from "@prisma/client"
import Link from "next/link"
import React from "react"
import { getVideosFromDb } from "@/data/get-videos-from-db"
import { deleteVideoContent } from "@/actions/delete-video-content"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function NavVideos() {
  const { isMobile } = useSidebar();

  const router = useRouter();

  const [videos, setVideos] = React.useState<Video[]>();

  React.useEffect(() => {
    async function fetchVideosFromDb() {
      const { videos } = await getVideosFromDb(6);
      setVideos(JSON.parse(JSON.stringify(videos as Video[])));
    }

    fetchVideosFromDb();
  }, []);

  const handleDeleteContent = async (videoId: string) => {
    try {
      await toast.promise(deleteVideoContent(videoId), {
        loading: 'Deleting...',
        success: 'Video deleted',
        error: 'Error deleting video',
      });
      router.push('/history');
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };
  

  return videos?.length as number > 0 ? (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recent Videos</SidebarGroupLabel>
      <SidebarMenu>
        {videos?.map((video) => (
          <SidebarMenuItem key={video.id}>
            <SidebarMenuButton asChild>
              <a href={`/playground?vid=${video.id}`}>
                <span>{video?.title}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <Link href={`/playground?vid=${video.id}`}>
                  <DropdownMenuItem
                    className="cursor-pointer">
                    <Folder className="text-muted-foreground w-4 h-4 mr-2" />
                    <span>View Video</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDeleteContent(video.id)}
                  className="text-red-500 focus:bg-[#2A1314] focus:text-red-500 cursor-pointer">
                  <Trash className="w-4 h-4 mr-2" />
                  <span>Delete Video</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {
          videos?.length as number > 5 && (
            <SidebarMenuItem>
              <Link href={"/history"}>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <span>View All</span>
                  <ChevronRight className="text-sidebar-foreground/70" />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        }
      </SidebarMenu>
    </SidebarGroup>
  ) : null
}
