import { waitFor } from '@/lib/helper/waitFor';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import Editor from '@/app/workflow/_components/Editor';

async function page({ params } : { params: { workflowId: string } }) {
    const { userId, redirectToSignIn } = await auth();
    const { workflowId } = await params;

    await waitFor(1000);

    if (!userId) {
        return redirectToSignIn();
    };

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        },
    });

    if (!workflow) {
        return <div>Workflow not found</div>
    }

    return (
        <Editor workflow={workflow} />
    )
}

export default page