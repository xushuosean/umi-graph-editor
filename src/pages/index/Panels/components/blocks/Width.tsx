import { useBlockShapes } from "@/pages/index/ShapeContext";
import { useMemo } from "react";

const BlockWidth = () => {
  const blockShapes = useBlockShapes();

  const shape = useMemo(() => {
    return blockShapes?.[0]
  }, [blockShapes])


  const width = useMemo(() => {
    return shape?.styles?.width ?? 0
  }, [shape])

  return <div>{width}</div>
}

export default BlockWidth;