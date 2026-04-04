import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"
import { Link, useLocation } from "react-router"

function normalizePath(path) {
  if (!path || path === "/") return path
  return path.endsWith("/") ? path.slice(0, -1) : path
}

function pathMatches(pathname, url) {
  return normalizePath(pathname) === normalizePath(url)
}

function pathInSection(pathname, baseUrl) {
  const p = normalizePath(pathname)
  const b = normalizePath(baseUrl)
  if (!b) return false
  return p === b || p.startsWith(`${b}/`)
}

function NavMainItem({ item }) {
  const { pathname } = useLocation()
  const baseUrl = item.url ?? "/"
  const subItems = item.items ?? []
  const hasSubItems = subItems.length > 0

  const subActive = subItems.some((sub) => pathMatches(pathname, sub.url))
  const sectionHasActiveRoute = hasSubItems
    ? subActive || pathMatches(pathname, baseUrl)
    : pathMatches(pathname, baseUrl)

  const parentButtonActive = hasSubItems
    ? pathInSection(pathname, baseUrl)
    : pathMatches(pathname, baseUrl)

  const [open, setOpen] = React.useState(sectionHasActiveRoute)

  React.useEffect(() => {
    if (sectionHasActiveRoute) setOpen(true)
  }, [pathname, sectionHasActiveRoute])

  return (
    <Collapsible asChild open={open} onOpenChange={setOpen}>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={item.title}
          isActive={parentButtonActive}
        >
          <Link to={baseUrl}>
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
        {hasSubItems ? (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRightIcon />
                <span className="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {subItems.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathMatches(pathname, subItem.url)}
                    >
                      <Link to={subItem.url}>
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  )
}

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavMainItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
