"use server"

import prisma from "@/lib/prisma";
import { CreateWorkflowSchema, CreateWorkflowSchemaType } from "@/schemas/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: CreateWorkflowSchemaType) {
    const { success, data } = CreateWorkflowSchema.safeParse(form);
    if (!success) {
        throw new Error("invalid form data")
    }

    const { userId } = await auth();
    if (!userId) {
        throw new Error("unauthorized")
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: JSON.stringify({}),
            ...data
        }
    });

    if (!result) {
        throw new Error("failed to create workflow")
    }

    redirect(`/workflow/editor/${result.id}`);
}