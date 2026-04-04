import { DashboardLayout } from "@/components/layout/dashboard-layout";

export function PostPage() {
    return (
        <DashboardLayout
            documentTitle="NozartBlog | Post Index"
            breadcrumbs={[{ label: "Post" }]}
        >
            <h1 className="text-2xl font-semibold tracking-tight">Daftar post</h1>
        </DashboardLayout>
    );
}
