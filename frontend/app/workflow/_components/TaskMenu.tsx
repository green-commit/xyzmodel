"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { TaskType } from "@/types/task"

export default function TaskMenu() {
    return (
        <aside className="w-[320px] min-w-[320px] max-w-[320px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
            <Accordion type="multiple" className="w-full" defaultValue={["extraction"]}>
                <AccordionItem value="extraction">
                    <AccordionTrigger className="font-bold">
                        Data Extraction
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1">
                        <TaskMenuButton taskType={TaskType.DATA} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    )
};

function TaskMenuButton({ taskType }: { taskType: TaskType }) {
    const task = TaskRegistry[taskType];

    const onDragStart = (event: React.DragEvent, type: TaskType) => {
        event.dataTransfer.setData("application/reactflow", type);
        event.dataTransfer.effectAllowed = "move";
    }

    return (
        <Button
            variant={"secondary"}
            className="flex justify-between items-center gap-2 border w-full"
            draggable
            onDragStart={event => onDragStart(event, taskType)}
        >
            <div className="flex gap-2">
                <task.icon size={20} />
                {task.label}
            </div>

        </Button>
    )
}