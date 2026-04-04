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
            <section className="table"></section>
        </DashboardLayout>
    );
}
