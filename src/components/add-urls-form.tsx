'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { Button } from './ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from './ui/form'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { monitorSchema } from '@/schemas'
import { api } from '@/trpc-server/react'
import { toast } from 'sonner'
import { Label } from './ui/label'

type AddUrlsFormProps = {
    slackURL: string;
};


const AddUrlsForm = ({ slackURL }: AddUrlsFormProps) => {
    const { mutateAsync: addURL, isPending, } = api.monitor.add.useMutation({
        onError: (error) => {
            console.error("API error:", error);
        }
    })

    const form = useForm<z.infer<typeof monitorSchema>>({
        resolver: zodResolver(monitorSchema),
        defaultValues: {
            name: "",
            url: "",
            checkInterval: "5",
            timeout: "30",
            emailAlert: false,
        }
    });


    async function onSubmit(values: z.infer<typeof monitorSchema>) {
        await addURL({
            ...values
        })

        toast.success("Monitor Created Successfully");
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Monitor Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">

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

                            <FormField
                                control={form.control}
                                name="emailAlert"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between">
                                        <div>
                                            <FormLabel>Email Alerts</FormLabel>
                                            <p className="text-sm text-muted-foreground">Receive email notifications when status changes</p>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Slack Alerts</Label>
                                    <p className="text-sm text-muted-foreground">Send notifications to your Slack channel</p>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <Button onClick={() => {
                                        if (slackURL) {
                                            window.location.href = slackURL;
                                        }
                                    }}>
                                        Connect Slack
                                    </Button>
                                </div>
                            </div>


                        </div>

                        <div className="flex gap-4 mt-6">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating Monitor..." : "Create Monitor"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

export default AddUrlsForm
