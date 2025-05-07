import { useProjectService } from "@/hooks/useProjectService";
import { useBlockShapes } from "@/pages/index/ShapeContext";
import { Button } from "antd";
import { useMemo } from "react";

const BlockHeight = () => {
  const blockShapes = useBlockShapes();

  const shape = useMemo(() => {
    return blockShapes?.[0]
  }, [blockShapes])


  const height = useMemo(() => {
    return shape?.styles?.height ?? 0
  }, [shape])

  const projectService = useProjectService();

  const handleAdd = () => {
    projectService.updateBlocks([
      {
        ...shape,
        styles: {
          ...shape.styles!,
          height: height + 10
        }
      }
    ])
  }

  return <div>{height}
    <Button onClick={handleAdd}>+1</Button>
  </div>
}

export default BlockHeight;