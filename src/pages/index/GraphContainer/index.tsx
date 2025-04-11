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
    new mx.mxRubberband(graph!);

    graph.setPanning(true);
    graph.setDropEnabled(true);

    // 设置画布扩展方向
    graph.maximumGraphBounds = new mx.mxRectangle(0, 0, Infinity, Infinity);

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
        let parent = graph?.getDefaultParent();
        console.log(block.parentId, 'adsf')
        if (block.parentId) {
          parent = model?.getCell(block.parentId);
        }
        graph?.insertVertex(parent, block.id, block,  block.x, block.y, block.width, block.height);
      } finally {
        model?.endUpdate();
      }
    })

    return () => {
      projectService?.$blockShapeSubject?.unsubscribe();
    }
  }, [])

  return <div className={styles.graphContainer}>
    <Sider graph={graph} className={styles.sider} />
    <div className={styles.container} ref={containerRef}></div>
  </div>;
};

export {
  GraphContainer
};
