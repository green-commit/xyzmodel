"use client"

import CustomDialogHeader from '@/components/partials/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CreateWorkflowSchema, CreateWorkflowSchemaType } from '@/schemas/workflow';
import { Layers2Icon, Loader2Icon } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkflow } from '@/actions/workflows/createSingle';
import { toast } from 'sonner';

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
    const [isOpen, setOpen] = useState(false);

    const form = useForm<CreateWorkflowSchemaType>({
        resolver: zodResolver(CreateWorkflowSchema),
        defaultValues: {
            name: "",
        }
    });

    const { mutate, isPending } = useMutation(
        {
            mutationFn: CreateWorkflow,
            onSuccess: () => {
                toast.success("Workflow created successfully", { id: "create-workflow" });
            },
            onError: (error) => {
                toast.error("Failed to create workflow", { id: "create-workflow" });
                console.log(error)
            }
        }
    );

    const onSubmit = useCallback((values: CreateWorkflowSchemaType) => {
        toast.loading("Creating workflow...", { id: "create-workflow" });
        mutate(values);
    }, [mutate]);

    return (
        <Dialog 
            open={isOpen} 
            onOpenChange={(open) => {
                form.reset();
                setOpen(open);
            }}
        >
            <DialogTrigger asChild>
                <Button>{triggerText ?? "Create workflow"}</Button>
            </DialogTrigger>
            <DialogContent className="px-0">
                <CustomDialogHeader
                    icon={Layers2Icon}
                    title="Create workflow"
                    subTitle="Start building your workflow"
                />
                <div className="p-6">
                    <Form {...form}>
                        <form 
                            className="space-y-8 w-full" 
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex gap-1 items-center">
                                                Name
                                                <p className="text-xs text-primary">(required)</p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="off" />
                                            </FormControl>
                                            <FormDescription>
                                                Choose a name for your workflow
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex gap-1 items-center">
                                                Description
                                                <p className="text-xs text-muted-foreground">(optional)</p>
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea className="resize-none" {...field} autoComplete="off" />
                                            </FormControl>
                                            <FormDescription>
                                                Provide a short description of your workflow
                                                <br />
                                                This is optional, but it helps you and your team to understand the purpose of this workflow.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                            />
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? "Creating..." : "Create workflow"}
                                {isPending && <Loader2Icon className="animate-spin" />}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkflowDialog