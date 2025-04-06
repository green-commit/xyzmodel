"use client"

import { Workflow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from './FlowEditor';
import EditorTopbar from './topbar/topbar';
import TaskMenu from './TaskMenu';

function Editor({ workflow } : { workflow : Workflow }) {
    return (
        <ReactFlowProvider>
            <EditorTopbar title="Workflow editor" subTitle={`Name: ${workflow.name}`} workflowId={workflow.id} />
            <div className="flex flex-col h-full w-full overflow-hidden">
                <section className="flex h-full overflow-auto">
                    <TaskMenu />
                    <FlowEditor workflow={workflow} />
                </section>
            </div>
        </ReactFlowProvider>
    )
}

export default Editor;