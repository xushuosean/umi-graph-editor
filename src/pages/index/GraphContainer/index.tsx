import { useProjectService } from "@/hooks/useProjectService";
import mx from '@/mxgraph';
import { mxGraph } from "mxgraph";
import { useCallback, useEffect, useRef, useState } from "react";
import { Sider } from "../Sider";
import styles from './index.less';

const GraphContainer = () => {
  const projectService = useProjectService();
  const containerRef = useRef<HTMLDivElement>(null);

  const [graph, setGraph] = useState<mxGraph | null>(null);

  const createGraph = useCallback(() => {
    if (!containerRef.current) return null;

    const graph =  new mx.mxGraph(containerRef.current);

    return graph;
  }, [])


  useEffect(() => {
    projectService.createDiagram()

    const graph = createGraph();

    setGraph(graph);
    if (!graph) return;
    console.log(graph)
    new mx.mxRubberband(graph!);

    graph.setPanning(true);

    graph.getModel().beginUpdate();
      try {
        var v1 = graph.insertVertex(graph?.getDefaultParent(), null, 'Hello,', 20, 20, 80, 30);
        var v2 = graph.insertVertex(graph?.getDefaultParent(), null, 'World!', 200, 150, 80, 30);
        var e1 = graph.insertEdge(graph?.getDefaultParent(), null, '', v1, v2);
      } finally {
        graph.getModel().endUpdate();
      }

    projectService.$blockShapeSubject.subscribe((block) => {
      const model = graph?.getModel();
      model?.beginUpdate();

      try {
        graph?.insertVertex(graph?.getDefaultParent(), null, block.x,  block.x, block.y, block.width, block.height);
      } finally {
        model?.endUpdate();
      }
    })

    return () => {
      projectService?.$blockShapeSubject?.unsubscribe();
    }
  }, [])

  return <div>
    <Sider graph={graph} />
    <div className={styles.container} ref={containerRef}></div>
  </div>;
};

export {
  GraphContainer
};
