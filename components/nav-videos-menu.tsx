"use client"

import React from 'react'
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ChevronRight, Folder, MoreHorizontal, Trash } from 'lucide-react'
import { Video } from '@prisma/client'
import Link from 'next/link'

interface NavVideosItemProps {
    videos: Video[] | undefined
}

export const NavVideosMenu = ({
    videos
}: NavVideosItemProps) => {

    const { isMobile } = useSidebar();

    return (
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
                            <DropdownMenuItem className="cursor-pointer">
                                <Folder className="text-muted-foreground w-4 h-4 mr-2" />
                                <span>View Project</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500 focus:bg-[#2A1314] focus:text-red-500 cursor-pointer">
                                <Trash className="w-4 h-4 mr-2" />
                                <span>Delete Project</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
                <Link href={"/history"}>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <span>View All</span>
                        <ChevronRight className="text-sidebar-foreground/70" />
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
