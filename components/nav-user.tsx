"use client"

import {
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import LogoutButton from "./auth/logout-button"
import React, { useEffect, useState } from "react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { getUserCredits } from "@/data/get-user-credits"
import Link from "next/link"

export function NavUser() {
  const { isMobile } = useSidebar();
  const [credits, setCredits] = useState<Number | null>(null);
  const user = useCurrentUser();

  useEffect(() => {
    async function fetchUserCredits() {
      const credits = await getUserCredits();
      setCredits(credits?.credits as number);
    }

    fetchUserCredits();
  }, [])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image as string} alt={user?.name as string} />
                <AvatarFallback className="rounded-lg">{user?.name?.charAt(0) as string}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-xs">{user?.email}</span>
                <span className="truncate font-semibold">{credits?.toString()} Credits Left</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.image as string} alt={user?.name as string} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-xs">{user?.email}</span>
                  <span className="truncate font-semibold">{credits?.toString()} Credits Left</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/pricing">
                <DropdownMenuItem className="text-blue-500 focus:bg-[#0F1C2E] focus:text-blue-500 cursor-pointer">
                  <Sparkles className="w-4 h-4 mr-2 " />
                  Buy Credits
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <Link href="/billing">
                <DropdownMenuItem className="cursor-pointer">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <LogoutButton>
              <DropdownMenuItem className="text-red-500 focus:bg-[#2A1314] focus:text-red-500 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </LogoutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
