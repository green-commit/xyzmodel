"use client";

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { DeleteWorkflow } from '@/actions/workflows/deleteSingle';
import { toast } from 'sonner';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
    workflowId: string;
}

function DeleteWorkflowDialog({ open, setOpen, workflowName, workflowId }: Props) {
    const [confirmText, setConfirmText] = React.useState("");
    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success("Workflow deleted successfully", { id: workflowId });
            setConfirmText("");
        },
        onError: () => {
            toast.error("Failed to delete workflow", { id: workflowId });
        }
    })
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete workflow</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this workflow? This action cannot be undone.
                        If you are sure, enter <b>{workflowName}</b> to confirm:
                    </AlertDialogDescription>
                    <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => setConfirmText("")}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={confirmText !== workflowName || deleteMutation.isPending}
                        className="bg-destructive text-white hover:bg-destructive/90"
                        onClick={() => {
                            toast.loading("Deleting workflow...", { id: workflowId });
                            deleteMutation.mutate(workflowId);
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkflowDialog