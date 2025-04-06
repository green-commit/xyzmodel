"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AppNodeData } from '@/types/appNode';
import { TaskParamType } from '@/types/task';
import { SelectValue } from '@radix-ui/react-select';
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form';

type NodeEditPanelProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    taskInputs: Array<{
        name: string;
        type: TaskParamType;
        required: boolean;
        helperText: string;
        isOtherOutput: boolean;
    }>;
    nodeData: AppNodeData;
    onSave: (updatedData: any) => void;
}

function NodeEditPanel({
    open,
    onOpenChange,
    taskInputs,
    nodeData,
    onSave
}: NodeEditPanelProps) {
    const form = useForm({
        defaultValues: useMemo(() => {
            const values: Record<string, any> = {};
            taskInputs.forEach((input) => {
                values[input.name] = nodeData[input.name] || null;
            })
            return values;
        }, [nodeData, taskInputs])
    });

    const handleSubmit = (data: any) => {
        onSave(data);
        onOpenChange(false);
    };

    const renderFormField = (input: any) => {
        switch (input.type) {
            case TaskParamType.CREDENTIAL:
                return (
                    <FormField
                        key={input.name}
                        control={form.control}
                        name={input.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='uppercase'>{input.name}</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select credential" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="1">Credential 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                );
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit node</SheetTitle>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-4">
                        {taskInputs.map(input => {
                            if (!input.isOtherOutput)
                                return renderFormField(input)
                        })}
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default NodeEditPanel;