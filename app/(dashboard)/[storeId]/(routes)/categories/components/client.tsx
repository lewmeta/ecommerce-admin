"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { CategoryColumn, columns } from "./columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps {
    data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
    data,
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`${data.length > 1 ? "Categories" : "Category"}  (${data.length})`}
                    description="Manage categories for you strore"
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="w-4 h-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading
                title="API"
                description="API calls from the category"
            />
            <ApiList
                entityIdName="categoryId"
                entityName="categories"
            />
        </>
    )
}
