"use client"

import { TaskParam } from '@/types/task'
import { Handle, Position } from '@xyflow/react'
import React from 'react'

export function NodeInputs({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col divide-y gap-2">
            {children}
        </div>
    )
}

export function NodeInput({ input }: { input : TaskParam }) {
    return (
        <div className="flex justify-start relative p-3 bg-secondary w-full uppercase">
            {input.name}
            <Handle
                id={input.name}
                type="target"
                position={Position.Left}
                className="!w-2 !h-2"
            />
        </div>
    )
}

