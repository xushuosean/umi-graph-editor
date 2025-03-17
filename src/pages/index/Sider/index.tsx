import { IProjectService } from "@/ioc/interfaces";
import { myContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/types";
import mx from "@/mxgraph";
import { mxGraph } from "mxgraph";
import { FC, useEffect } from "react";

type SiderProps = {
  graph: mxGraph | null
}

const Sider: FC<SiderProps> = ({
  graph
}) => {
  const projectService = myContainer.get<IProjectService>(TYPES.ProjectService);

  const projectService1 = myContainer.get<IProjectService>(TYPES.ProjectService);
  console.log(projectService === projectService1, 'sdfjihjk')

  const menus = [
    {
      name: 'rect',
      width: 200,
      height: 100,
    },
    {
      name: 'circle',
      width: 200,
      height: 100,
    }
  ]

  const makeDraggable = (dom: HTMLElement, graph: mxGraph | null, item) => {
    if (!graph) return;
   
    mx.mxUtils.makeDraggable(dom, graph, (sender, evt, dropTarget, x, y) => {
      const block = {
        block: true,
        value: item.name,
        x,
        y,
        width: item.width,
        height: item.height,
        dataId: item.name,
      }
      projectService.addBlocks([block])
    })
  }

  useEffect(() => {
    
  }, [])
  return <div>
    {
      menus.map(item => {
        return <div className="siderItem" onMouseOver={(e) => {
          const { target } = e;
          if ((target as HTMLElement).dataset.makeDraggable) return;

          makeDraggable(target as HTMLElement, graph, item);

          (target as HTMLElement).dataset.makeDraggable = "true";
        }} key={item.name}>{item.name}</div>
      })
    }
  </div>
}

export {
  Sider
};

