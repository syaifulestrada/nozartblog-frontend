import axios from "axios";
import { useMemo, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/page/post/DataTable";
import { formatDateDMY } from "@/lib/format-date";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function PostPage() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

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
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/posts/view/${post.id}`)}
                        >
                            View
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => editPost(post.id)}>
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                                if (window.confirm("Are you sure to delete this record?"))
                                    deletePost(post.id);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ]);

    useEffect(() => {
        const fetchDataPost = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
                headers: {
                    "x-api-key": `${import.meta.env.VITE_API_KEY}`,
                },
            });
            setPosts(Array.isArray(response.data?.data) ? response.data?.data : []);
        };
        fetchDataPost();
    }, []);

    function deletePost(postId) {
        const fetchDeletePost = async () => {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
                    headers: {
                        "x-api-key": `${import.meta.env.VITE_API_KEY}`,
                    },
                });

                setPosts((prev) => prev.filter((p) => p.id !== postId));
            } catch (error) {
                console.error(error);
            }
        };
        fetchDeletePost();
    }

    function editPost(postId) {
        navigate(`/posts/edit/${postId}`);
    }

    return (
        <DashboardLayout documentTitle="NozartBlog | Post Index" breadcrumbs={[{ label: "Post" }]}>
            <h1 className="text-2xl font-semibold tracking-tight">Daftar post</h1>
            <div>
                <Button onClick={() => navigate("/posts/create")}>Create</Button>
            </div>
            <DataTable columns={columns} data={posts} />
        </DashboardLayout>
    );
}
