import { useParams } from "react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export function EditPost(postId) {
    const params = useParams();
    console.log(params.postId);
    return (
        <DashboardLayout
            documentTitle="NozartBlog | Post Index"
            breadcrumbs={[{ label: "Post", to: "/posts" }, { label: "Edit Post" }]}
        >
            <h1>Hello, World</h1>
        </DashboardLayout>
    );
}
