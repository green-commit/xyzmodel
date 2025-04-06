import { LucideProps } from "lucide-react";
import React from "react";
import { TaskParamType, TaskType } from "./task";

export enum WorkflowStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
}

export type WorkflowTask = {
    label: string;
    icon: React.FC<LucideProps>;
    type: TaskType;
    isEntryPoint: boolean;
    isOtherOutput: boolean;
    inputs: TaskParam[];
    outputs: TaskParam[];
}