import { TaskParamType, TaskType } from "@/types/task";
import { GlobeIcon, LucideProps } from "lucide-react";

export const TestTask = {
    type: TaskType.TEST,
    label: "Test Task",
    icon: (props: LucideProps) => (
        <GlobeIcon className="stroke-pink-400" {...props} />
    ),
    isEntryPoint: true,
    inputs: [
        {
            name: "String Input",
            type: TaskParamType.STRING,
            required: true,
            helperText: "Select a credential to use for this task",
            hideHandle: true
        }
    ],
    outputs: []
}