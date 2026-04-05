import { useParams } from "react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function ViewPostPage() {
    const [posts, setPosts] = useState([]);
    let params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchViewDataPost = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/posts/show/${params.postId}`,
                {
                    headers: {
                        "x-api-key": `${import.meta.env.VITE_API_KEY}`,
                    },
                },
            );
            setPosts(
                Array.isArray(response.data.data) ? response.data.data : [],
            );
        };
        fetchViewDataPost();
    }, []);

    return (
        <DashboardLayout
            documentTitle="NozartBlog | View Post"
            breadcrumbs={[{ label: "Post" }]}
        >
            {posts.map((post) => {
                return (
                    <Card key={post.id}>
                        <img
                            src={post.cover}
                            width="400"
                            alt={post.title}
                            className="w-full h-64 object-cover rounded-t-xl"
                        />
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>
                                Category : {post.categories}
                            </CardDescription>
                            <CardAction>
                                <div className="space-x-1">
                                    <Button variant="secondary">Edit</Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate("/posts")}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </CardAction>
                        </CardHeader>
                        <CardContent>{post.content}</CardContent>
                    </Card>
                );
            })}
        </DashboardLayout>
    );
}
