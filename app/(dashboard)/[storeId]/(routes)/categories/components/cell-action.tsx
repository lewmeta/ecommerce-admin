"use client"

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { CategoryColumn } from "./columns"
import { useRouter, useParams } from "next/navigation";
import { AlertModal } from "@/components/modal/alert-modal";

interface CellActionProps {
    data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    data,
}) => {
    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Category Id copied to the clipboard.");
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
            router.refresh();
            toast.success("Category deleted");
        } catch (error) {
            toast.error("Make sure you have removed all products using this category.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            ></AlertModal>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className="w-8 h-8 p-0"
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}