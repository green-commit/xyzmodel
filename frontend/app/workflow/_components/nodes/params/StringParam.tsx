"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import React, { useId } from 'react'
import { ParamProps } from '@/types/task';

function StringParam({ param } : ParamProps ) {
    const id = useId();
    return (
        <div className='space-y-1 p-1 w-full'>
            <Label htmlFor={id} className='text-xs flex'>
                {param.name}
                {param.required && <p className='text-red-500'> *</p>}
            </Label>
            <Input id={id} />
        </div>
    )
}

export default StringParam;