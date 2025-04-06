"use client";

import { TaskParam, TaskParamType } from '@/types/task';
import React from 'react'
import StringParam from './StringParam';

function NodeParamField({ param } : { param : TaskParam}) {
    switch (param.type) {
        default:
            case TaskParamType.STRING:
                return <StringParam param={param} />
            return (
                <div className="w-full">
                    <p className="text-xs text-muted-foreground">Not implemented</p>
                </div>
            )
    }
}

export default NodeParamField