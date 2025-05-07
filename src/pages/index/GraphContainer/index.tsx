import { rewritePrototypeGraph } from "@/graphic/diagramRewrite";
import { registerShape, registerStyles } from "@/graphic/shapes";
import { useProjectService } from "@/hooks/useProjectService";
import { BlockShape, RawBlockShape, Shape } from "@/ioc/Shape";
import mx from "@/mxgraph";
import { Dropdown } from "antd";
import { mxCell, mxEventObject, mxGraph, mxGraphSelectionModel } from "mxgraph";
import { useCallback, useEffect, useRef, useState } from "react";
import { Panels } from "../Panels";
import { ShapeProvider, useMenus } from "../ShapeContext";
import { Sider } from "../Sider";
import styles from "./index.less";

const GraphContainer = () => {
  const projectService = useProjectService();
  const containerRef = useRef<HTMLDivElement>(null);

  const [graph, setGraph] = useState<mxGraph | null>(null);

  const createGraph = useCallback(() => {
    if (!containerRef.current) return null;

    const graph = new mx.mxGraph(containerRef.current);

    return graph;
  }, []);

  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    projectService.createDiagram();

    const graph = createGraph();

    setGraph(graph);
    if (!graph) return;
    new mx.mxRubberband(graph!);

    graph.setPanning(true);
    graph.setDropEnabled(true);
    graph.setConstrainChildren(false);

    // 设置画布扩展方向
    graph.maximumGraphBounds = new mx.mxRectangle(0, 0, Infinity, Infinity);

    rewritePrototypeGraph();
    registerShape();
    registerStyles(graph);

    graph.addListener(
      mx.mxEvent.CELLS_RESIZED,
      (sender, evt: mxEventObject) => {
        const cells = evt.getProperty("cells");
        const bounds = evt.getProperty("bounds");

        const blocks: RawBlockShape[] = cells.map(
          (cell: mxCell, index: number) => {
            const blockShape = cell.getValue() as BlockShape;

            return {
              ...blockShape,
              styles: {
                ...blockShape.styles,
                x: bounds[index].x,
                y: bounds[index].y,
                width: bounds[index].width,
                height: bounds[index].height,
              },
            };
          }
        );
        projectService.updateBlocks(blocks);
      }
    );

    graph.addListener(
      mx.mxEvent.CELLS_MOVED,
      (sender: mxGraph, evt: mxEventObject) => {
        const cells = evt.getProperty("cells");

        const blocks: RawBlockShape[] = cells.map(
          (cell: mxCell, index: number) => {
            const blockShape = cell.getValue() as BlockShape;

            return {
              ...blockShape,
              styles: {
                ...blockShape.styles,
                x: cell.geometry.x,
                y: cell.geometry.y,
                width: cell.geometry.width,
                height: cell.geometry.height,
              },
            };
          }
        );
        projectService.updateBlocks(blocks);
      }
    );

    graph
      .getSelectionModel()
      .addListener(
        mx.mxEvent.CHANGE,
        (selectionModel: mxGraphSelectionModel) => {
          const cells = graph.getSelectionCells();

          setShapes(cells.map((cell) => cell.value as Shape));
        }
      );

    /** subscribe start */

    const addSub = projectService.$blockShapesSubject
      .subscribe((blocks) => {
        const model = graph?.getModel();
        model?.beginUpdate();

        try {
          blocks.forEach((block) => {
            let parent = graph?.getDefaultParent();
            if (block.parentId) {
              parent = model?.getCell(block.parentId);
            }

            const { x = 0, y = 0, width = 10, height = 10 } = block?.styles ?? {};

            graph?.insertVertex(
              parent,
              block.id,
              block,
              x,
              y,
              width,
              height,
              block.graphicType
            );
          });
        } finally {
          model?.endUpdate();
        }
      });

    const updateSub = projectService.$blockShapesUpdateSubject
      .subscribe(
        (blocks) => {
          const model = graph?.getModel();
          model?.beginUpdate();
          try {
            blocks.forEach((block) => {
              const cell = graph.model.getCell(block.id);
              graph.getModel().setValue(cell, block);

              const geo = new mx.mxGeometry(block.styles?.x, block.styles?.y, block.styles?.width, block.styles?.height)
              graph.getModel().setGeometry(cell, geo);
              
              graph.getModel().setVisible(cell, block.styles?.visible ?? true);
            });

            const cells = blocks.map((block) => {
              return graph.model.getCell(block.id);
            });

            setShapes(cells.map((item) => item.value as Shape));
          } finally {
            model?.endUpdate();
          }
        }
      );

    const deleleSub = projectService.$blockShapesDeleteSubject.subscribe(blocks => {
      const model = graph?.getModel();
      model?.beginUpdate();
      try {
        const cells = blocks.map((block) => {
          return graph.model.getCell(block.id);
        });

        graph.removeCells(cells)
      } finally {
        model?.endUpdate();
      }
    })

    /** subscribe end */

    return () => {
      addSub?.unsubscribe();
      updateSub?.unsubscribe();
      deleleSub?.unsubscribe()
    };
  }, []);

  const menus = useMenus(shapes);

  return (
    <div className={styles.graphContainer}>
      <Sider graph={graph} className={styles.sider} />
      <Dropdown trigger={["contextMenu"]} menu={{items: menus}}>
        <div className={styles.container} ref={containerRef}></div>
      </Dropdown>
      <div className={styles.panels}>
        <ShapeProvider value={shapes}>
          <Panels />
        </ShapeProvider>
      </div>
    </div>
  );
};

export { GraphContainer };
