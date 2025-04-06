import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";

export function CreateFlowNode(
    nodeType: TaskType,
    position? : { x: number; y: number }
): AppNode {
    return {
        id: crypto.randomUUID(),
        type: "CustomNode",
        dragHandle: ".drag-handle",
        data: {
            task: nodeType,
            inputs: {}
        },
        position: position ?? { x: 0, y: 0 },
    }
}