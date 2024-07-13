"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { ColorsColumn, columns } from "./columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ColorsClientProps {
    data: ColorsColumn[];
}

export const ColorsClient: React.FC<ColorsClientProps> = ({
    data,
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`${data.length > 1 ? "Colors" : "Color"}  (${data.length})`}
                    description="Manage billboards for you strore"
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="w-4 h-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading
                title="API"
                description="API calls from colors"
            />
            <ApiList
                entityIdName="colorsId"
                entityName="colors"
            />
        </>
    )
}
