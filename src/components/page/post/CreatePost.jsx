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
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function CreatePost() {
    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState();
    const [cover, setCover] = useState();
    const navigate = useNavigate();

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

    async function handleSubmit(e) {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        const category = e.target.categories.value;
        const image = cover;

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/posts`,
                {
                    title: title,
                    content: content,
                    categoryIds: category,
                    cover: image,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-api-key": import.meta.env.VITE_API_KEY,
                    },
                },
            );
        } catch (error) {
            console.log(error);
        }
        navigate("/posts");
    }

    return (
        <DashboardLayout
            documentTitle="NozartBlog | Buat Post"
            breadcrumbs={[{ label: "Post", to: "/posts" }, { label: "Create Post" }]}
        >
            <div className="w-full">
                <Card className="p-5">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <FieldGroup>
                            <FieldLegend>Create Post</FieldLegend>
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
                                        <Input
                                            type="file"
                                            id="cover"
                                            name="cover"
                                            required
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];

                                                if (!file) return;

                                                if (file.size > 2 * 1024 * 1024) {
                                                    alert("Max file size 2MB");
                                                    return;
                                                }

                                                setSelectedImage(URL.createObjectURL(file));
                                                setCover(e.target.files?.[0]);
                                            }}
                                        />
                                        {selectedImage && (
                                            <div className="mt-2 w-fit">
                                                <img
                                                    accept="image/*"
                                                    src={selectedImage}
                                                    alt="selected cover"
                                                    className="w-100 h-100 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                            <Field orientation="horizontal">
                                <Button type="submit">Submit</Button>
                                <Button variant="outline" type="button">
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
