import { DashboardLayout } from "@/components/layout/dashboard-layout";

export function EditPost(postId) {
    return (
        <DashboardLayout
            documentTitle="NozartBlog | Post Index"
            breadcrumbs={[{ label: "Post", to: "/posts" }]}
        >
            <h1>Hello, World</h1>
        </DashboardLayout>
    );
}
