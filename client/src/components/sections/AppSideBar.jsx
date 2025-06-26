import {
  Home,
  Flower,
  Brain,
  Shuffle,
  GitCompare,
  Feather,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from "react-router-dom"

const navItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
    badge: null,
  },
  {
    title: "Brainstorm",
    url: "/brainstorm-document",
    icon: Brain,
    badge: null,
  },
  {
    title: "Roll Wiki",
    url: "/roll-wiki",
    icon: Shuffle,
    badge: "new/feat!",
  },
  {
    title: "Compare Documents",
    url: "/compare-documents",
    icon: GitCompare,
    badge: "under/dev",
  }
]

const aboutItems = [
  {
    title: "Creator's Page",
    url: "/suu-b",
    icon: Feather,
    badge: "under/dev",
  }
]

export default function AppSideBar({ ...props }) {
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="offcanvas" {...props} className="shadow-lg">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-100 text-sidebar-primary-foreground">
                    <Flower className="h-5 w-5" color="#8E80FC"/>
                  </div>
                  <div className="grid flex-1 text-left leading-tight mt-2 mr-5 cursor-pointer" onClick={() => navigate("/home")}>
                    <span className="truncate text-xl font-semibold text-slate-700">Project <span className="text-[#8E80FC] font-bold">June</span></span>
                    <span className="truncate text-xs text-slate-700">Your own Research bud</span>
                  </div>
                </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="size-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="outline"
                          className={`ml-auto h-5 px-1.5 text-xs ${item.badge == "under/dev" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : "bg-green-100 text-green-800 border-green-200"}`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>About</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aboutItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="size-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="outline"
                          className={`ml-auto h-5 px-1.5 text-xs ${item.badge == "under/dev" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : "bg-green-100 text-green-800 border-green-200"}`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                 <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="rounded-lg"><Flower className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
