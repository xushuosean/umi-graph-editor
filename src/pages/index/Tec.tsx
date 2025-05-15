import { mxCell, mxGraph } from "mxgraph"
import { FC, useEffect } from "react"

export const Tec: FC<{ cell?: mxCell, graph?: mxGraph }> = ({
  cell, graph
}) => {
  useEffect(() => {
    console.log(cell, graph)
  }, [])
  return <div>here is Tec component</div>
}