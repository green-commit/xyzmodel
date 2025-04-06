"use client"

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'
import { useReactFlow } from '@xyflow/react'
import { Edit2Icon, Trash2Icon } from 'lucide-react';
import React from 'react'

function NodeCard({ children, nodeId, isSelected, onEdit }: { children: React.ReactNode, nodeId: string, isSelected: boolean, onEdit: () => void }) {
    const { setNodes } = useReactFlow();

    const handleDeleteNode = (e: React.MouseEvent) => {
        e.stopPropagation();
        setNodes(nodes => nodes.filter(node => node.id !== nodeId));
    }

    const handleEditNode = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit();
    }

    return (
        <div className="relative">
            {isSelected && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 -translate-y-8 flex gap-2 bg-background border border-border rounded-md p-1 shadow-md z-10">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={handleEditNode}
                    >
                        <Edit2Icon size={16} />
                    </Button>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={handleDeleteNode}
                    >
                        <Trash2Icon size={16} />
                    </Button>
                </div>
            )}
            <div className={cn("rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col", isSelected && "border-primary")}>
                {children}
            </div>
        </div>

    )
}

export default NodeCard