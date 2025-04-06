import { memo, useState } from "react";
import { NodeProps, useReactFlow } from "@xyflow/react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeEditPanel from "./NodeEditPanel";
import { NodeInput, NodeInputs } from "./NodeInputs";
import { NodeOutput, NodeOutputs } from "./NodeOutputs";

const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as AppNodeData;
    const task = TaskRegistry[nodeData.type];
    const [showEditPanel, setShowEditPanel] = useState(false);
    const { setNodes } = useReactFlow();

    const handleSaveNodeData = (updatedData: any) => {
        setNodes(nodes =>
            nodes.map(node => {
                if (node.id === props.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ...updatedData
                        }
                    };
                }
                return node;
            })
        );
    };

    return (
        <>
            <NodeCard
                nodeId={props.id}
                isSelected={!!props.selected}
                onEdit={() => setShowEditPanel(true)}
            >
                <NodeHeader taskType={nodeData.task} />
                <NodeInputs>
                    {task.inputs.map((input, index) => {
                        if (input.isOtherOutput)
                            return <NodeInput key={index} input={input} />
                    })}
                </NodeInputs>
                <NodeOutputs>
                    {task.outputs.map((output, index) => {
                        return <NodeOutput key={index} output={output} />
                    })}
                </NodeOutputs>
            </NodeCard>
            <NodeEditPanel
                open={showEditPanel}
                onOpenChange={setShowEditPanel}
                taskInputs={task.inputs}
                nodeData={nodeData}
                onSave={handleSaveNodeData}
            />
        </>

    )
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";