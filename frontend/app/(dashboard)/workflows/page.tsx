import { GetWorkflowsForUser } from "@/actions/workflows/getAll"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, InboxIcon } from 'lucide-react';
import React, { Suspense } from 'react'
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
import WorkflowCard from "./_components/WorkflowCard";

function page() {
	return (
		<div className="flex flex-1 flex-col h-full">
			<div className="flex justify-between">
				<div className="flex flex-col">
					<h1 className="text-3xl font-bold">Workflows</h1>
					<p className="text-muted-foreground">Manage your workflow</p>
				</div>
				<CreateWorkflowDialog />
			</div>
			<div className="h-full py-6">
				<Suspense fallback={<UserWorkflowsSkeleton />}>
					<UserWorkflows />
				</Suspense>
			</div>
		</div>
	)
}

function UserWorkflowsSkeleton() {
	return (
		<div className="space-y-2">
			{[1, 2, 3, 4, 5].map((i) => (
				<Skeleton key={i} className="h-32 w-full" />
			))}
		</div>
	);
}

async function UserWorkflows() {
	try {
		const workflows = await GetWorkflowsForUser();
		if (workflows.length === 0) {
			return (
				<div
					className="flex flex-col gap-4 h-full items-center justify-center"
				>
					<div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
						<InboxIcon size={40} className="stroke-primary" />
					</div>
					<div className="flex flex-col gap-1 text-center">
						<div className="font-bold">No workflow created yet</div>
						<p className="text-sm text-muted-foreground">
							Click the button below to create your first workflow
						</p>
					</div>
					<CreateWorkflowDialog triggerText="Create your first workflow" />
				</div>
			);
		}
		return (
			<div
				className="grid grid-cols-1 gap-4"
			>
				{workflows.map((workflow) => (
					<WorkflowCard key={workflow.id} workflow={workflow} />
				))}
			</div>
		)
	} catch {
		return (
			<Alert variant={"destructive"}>
				<AlertCircle className="w-4- h-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Internal server error</AlertDescription>
			</Alert>
		)
	}
};

export default page