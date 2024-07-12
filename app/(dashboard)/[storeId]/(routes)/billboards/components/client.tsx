"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { BillboardColumns, columns } from "./columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface BillboardClientProps {
    data: BillboardColumns[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data,
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`${data.length > 1 ? "Billboards" : "Billboard"}  (${data.length})`}
                    description="Manage billboards for you strore"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="w-4 h-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label" />
            <Heading
                title="API"
                description="API calls from the billboard"
            />
            <ApiList
                entityIdName="billboardId"
                entityName="billboards"
            />
        </>
    )
}
