import { DashboardLayout } from "@/components/layout/dashboard-layout";

export function CreatePost() {
    return (
        <DashboardLayout
            documentTitle="NozartBlog | Buat Post"
            breadcrumbs={[
                { label: "Post", to: "/posts" },
                { label: "Buat post" },
            ]}
        >
            <h1 className="text-2xl font-semibold tracking-tight">
                Buat post baru
            </h1>
        </DashboardLayout>
    );
}
