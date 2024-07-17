"use client"

import { Heading } from "@/components/ui/heading"
import { OrderColumn, columns } from "./columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

interface OrderClientProps {
    data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data,
}) => {

    return (
        <>
            <Heading
                title={`${data.length > 1 ? "Orders" : "Order"}  (${data.length})`}
                description="Manage orders for you strore"
            />
            <Separator />
            <DataTable columns={columns} data={data} searchKey="products" />
        </>
    )
}
