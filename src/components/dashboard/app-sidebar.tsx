"use client"

import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal
} from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Logo } from "./logo"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  user: {
    name: "Waqar Rana",
    email: "waqarahmed7861234@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Monitoring",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add URLs",
          url: "/dashboard/monitoring/add-urls",
          icon: Frame,
        },
        {
          title: "Logs",
          url: "/dashboard/monitoring/logs",
          icon: SquareTerminal,
        },
        {
          title: "Settings",
          url: "/dashboard/monitoring/settings",
          icon: Settings2,
        },
      ],
    },
    {
      title: "AI Assistant",
      url: "/dashboard/chatbot",
      icon: Bot,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
