'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { monitorUpdateSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { api } from "@/trpc-server/react"
import { useRouter } from "next/navigation"

interface EditURL {
    name: string,
    checkInterval: string,
    timeout: string,
    url: string,
    id: string
}

interface UpdateURLProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    url: EditURL | undefined
}

const UpdateURL = ({ open, onOpenChange, url }: UpdateURLProps) => {
    const { mutateAsync: update, isPending } = api.urls.updateURL.useMutation({
        onError: (error) => {
            console.log("Error", error)
        }
    })

    const form = useForm<z.infer<typeof monitorUpdateSchema>>({
        resolver: zodResolver(monitorUpdateSchema),
        mode: "onChange"
    });

    const router = useRouter();

    useEffect(() => {
        if (url) {
            form.reset({
                name: url.name,
                url: url.url,
                checkInterval: url.checkInterval,
                timeout: url.timeout,
            });
        }
    }, [url, form]);

    async function onSubmit(values: z.infer<typeof monitorUpdateSchema>) {
        await update({
            ...values,
            id: url?.id || ""
        })
        toast.success("Monitor updated successfully");
        onOpenChange(false);
        router.refresh();
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit URL</SheetTitle>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Website Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>URL to Monitor</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="checkInterval"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Check Interval</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select interval" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">Every 1 minute</SelectItem>
                                                <SelectItem value="5">Every 5 minutes</SelectItem>
                                                <SelectItem value="10">Every 10 minutes</SelectItem>
                                                <SelectItem value="30">Every 30 minutes</SelectItem>
                                                <SelectItem value="60">Every 1 hour</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="timeout"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Timeout (seconds)</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="5" max="300" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <SheetFooter>
                            <Button disabled={isPending} type="submit">{isPending ? "Updating..." : "Update"}</Button>
                        </SheetFooter>
                    </form>
                </Form>

            </SheetContent>
        </Sheet>

    );
};


export default UpdateURL