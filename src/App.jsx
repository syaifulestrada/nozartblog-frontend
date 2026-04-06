import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { PostPage } from "./components/page/post/PostPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { CreatePost } from "./components/page/post/CreatePost";
import { ViewPostPage } from "./components/page/post/ViewPostPage";
import { EditPost } from "./components/page/post/EditPost";

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <TooltipProvider>
                    <SidebarProvider>
                        <Routes>
                            <Route path="/" element={<Navigate to="/posts" replace />} />
                            <Route path="/posts" element={<PostPage />} />
                            <Route path="/posts/view/:postId" element={<ViewPostPage />} />
                            <Route path="/posts/create" element={<CreatePost />} />
                            <Route path="/posts/edit/:postId" element={<EditPost />} />
                        </Routes>
                    </SidebarProvider>
                </TooltipProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}
