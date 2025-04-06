"use client"

import { UpdateWorkflow } from '@/actions/workflows/updateSingle'
import TooltipWrapper from '@/components/partials/TooltipWrapper'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon, ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

function EditorTopbar({ title, subTitle, workflowId } : { title: string, subTitle?: string, workflowId: string }) {
    const router = useRouter();
    const { toObject } = useReactFlow();

    const saveMutation = useMutation({
        mutationFn: UpdateWorkflow,
        onSuccess: () => {
            toast.success("Workflow saved successfully", { id: "save-workflow" });
        },
        onError: () => {
            toast.error("Failed to save the workflow. Please try again.", { id: "save-workflow" });
        }
    })

    const handleSave = () => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving workflow...", { id: "save-workflow" });
        saveMutation.mutate({
            id: workflowId,
            definition: workflowDefinition
        })
    }

    return (
        <header className='flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10'>
            <div className="flex gap-1 flex-1">
                <TooltipWrapper content="Back">
                    <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
                        <ChevronLeftIcon size={20} />
                    </Button>
                </TooltipWrapper>
                <div>
                    <p className='font-bold text-ellipsis truncate'>{title}</p>
                    {subTitle && <p className='text-muted-foreground text-xs truncate text-ellipsis'>{subTitle}</p>}
                </div>
            </div>
            <div className="flex gap-1 flex-1 justify-end">
                <Button 
                    variant={"outline"} 
                    className='flex items-center gap-2' 
                    onClick={handleSave}
                    disabled={saveMutation.isPending}
                >
                    <CheckIcon size={16} className='stroke-blue-400' />
                    Save
                </Button>
            </div>
        </header>
    )
}

export default EditorTopbar