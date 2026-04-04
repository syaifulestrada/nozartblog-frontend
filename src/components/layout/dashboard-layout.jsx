import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export function DashboardLayout({ documentTitle, breadcrumbs, children }) {
    useEffect(() => {
        document.title = documentTitle;
    }, [documentTitle]);

    return (
        <>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-2 md:px-0">
                    <div className="flex flex-1 items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((crumb, i) => (
                                    <React.Fragment key={`${crumb.label}-${i}`}>
                                        {i > 0 ? <BreadcrumbSeparator /> : null}
                                        <BreadcrumbItem
                                            className={
                                                i === 0
                                                    ? "hidden md:inline-flex"
                                                    : undefined
                                            }
                                        >
                                            {crumb.to ? (
                                                <BreadcrumbLink asChild>
                                                    <Link to={crumb.to}>
                                                        {crumb.label}
                                                    </Link>
                                                </BreadcrumbLink>
                                            ) : (
                                                <BreadcrumbPage>
                                                    {crumb.label}
                                                </BreadcrumbPage>
                                            )}
                                        </BreadcrumbItem>
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center pr-2 md:pr-4">
                        <ThemeToggle />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </>
    );
}
