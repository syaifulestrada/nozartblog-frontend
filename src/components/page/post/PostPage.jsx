import axios from "axios";
import { useMemo, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/page/post/DataTable";
import { formatDateDMY } from "@/lib/format-date";
import { Button } from "@/components/ui/button";

export function PostPage() {
    const columns = useMemo(() => [
        { accessorKey: "id", header: "Id" },
        { accessorKey: "title", header: "Title" },
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ getValue }) => formatDateDMY(getValue()),
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => {
                const post = row.original;
                return (
                    <div className="space-x-2">
                        <Button size="sm" variant="outline">
                            View
                        </Button>
                        <Button size="sm" variant="secondary">
                            Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ]);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchDataPost = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/posts`,
                {
                    headers: {
                        "x-api-key": `${import.meta.env.VITE_API_KEY}`,
                    },
                },
            );
            const list = response.data?.data;
            setPosts(Array.isArray(list) ? list : []);
        };
        fetchDataPost();
    }, []);

    return (
        <DashboardLayout
            documentTitle="NozartBlog | Post Index"
            breadcrumbs={[{ label: "Post" }]}
        >
            <h1 className="text-2xl font-semibold tracking-tight">
                Daftar post
            </h1>
            <DataTable columns={columns} data={posts} />
        </DashboardLayout>
    );
}
