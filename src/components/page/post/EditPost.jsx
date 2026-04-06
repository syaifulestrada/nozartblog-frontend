import { useParams } from "react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function EditPost(postId) {
    const params = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    console.log(params.postId);
    useEffect(() => {
        const fetchDataCategory = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY,
                },
            });
            setCategories(response.data.data);
        };
        fetchDataCategory();
    }, []);
    return (
        <DashboardLayout
            documentTitle="NozartBlog | Post Index"
            breadcrumbs={[{ label: "Post", to: "/posts" }, { label: "Edit Post" }]}
        >
            <div className="w-full">
                <Card className="p-5">
                    <form encType="multipart/form-data">
                        <FieldGroup>
                            <FieldLegend>Edit Post</FieldLegend>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="title">Title</FieldLabel>
                                        <Input id="title" name="title" required />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="categories">Category</FieldLabel>
                                        <Select name="categories" id="categories" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {categories.map((category) => {
                                                        return (
                                                            <SelectItem
                                                                key={category.id}
                                                                value={category.id}
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="content">Content</FieldLabel>
                                        <Textarea id="content" name="content" required />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="cover">Cover</FieldLabel>
                                        <Input type="file" id="cover" name="cover" required />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                            <Field orientation="horizontal">
                                <Button type="submit">Submit</Button>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => navigate("/posts")}
                                >
                                    Cancel
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </Card>
            </div>
        </DashboardLayout>
    );
}
