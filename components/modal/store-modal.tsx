"use client"

import * as z from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import toast from "react-hot-toast"

import { useStoreModal } from "@/hooks/user-store-modal"
import { Modal } from "@/components/ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const formSchema = z.object({
    name: z.string().min(1),
})

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState<boolean>(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post("/api/stores", values);
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <Form
                {...form}
            >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="E-commerce"
                                        {...field}
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-6 space-x-2 flex items-center justify-end">
                        <Button
                            variant={"outline"}
                            onClick={storeModal.onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>

        </Modal>
    )
}
