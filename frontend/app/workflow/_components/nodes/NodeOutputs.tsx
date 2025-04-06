"use client"

import { TaskParam } from '@/types/task'
import { Handle, Position } from '@xyflow/react'
import React from 'react'

export function NodeOutputs({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col divide-y gap-2 py-2">
            {children}
        </div>
    )
}

export function NodeOutput({ output }: { output : TaskParam }) {
    return (
        <div className="flex justify-end relative p-3 bg-secondary w-full uppercase">
            {output.name}
            <Handle
                id={output.name}
                type="source"
                position={Position.Right}
                className="!w-2 !h-2"
            />
        </div>
    )
}

