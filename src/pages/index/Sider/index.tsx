import { GraphicType } from "@/graphic/shapes";
import { IProjectService } from "@/ioc/interfaces";
import { myContainer } from "@/ioc/inversify.config";
import { RawBlockShape } from "@/ioc/Shape";
import { TYPES } from "@/ioc/types";
import mx from "@/mxgraph";
import { FundOutlined, SunOutlined } from "@ant-design/icons";
import { mxCell, mxGraph } from "mxgraph";
import { FC } from "react";

type SiderProps = {
  graph: mxGraph | null;
  className?: string;
};

const Sider: FC<SiderProps> = ({ graph, className }) => {
  const projectService = myContainer.get<IProjectService>(TYPES.ProjectService);

  const menus = [
    {
      name: "矩形",
      width: 200,
      height: 100,
      icon: <FundOutlined />,
      graphicType: GraphicType.Rect
    },
    {
      name: "圆形",
      width: 200,
      height: 100,
      icon: <SunOutlined />,
      graphicType: GraphicType.Circle
    },
  ];

  const makeDraggable = (dom: HTMLElement, graph: mxGraph | null, item) => {
    if (!graph) return;

    mx.mxUtils.makeDraggable(
      dom,
      graph,
      (sender: mxGraph, evt: MouseEvent, dropTarget: mxCell, x: number, y: number) => {
        const block: RawBlockShape = {
          block: true,
          x,
          y,
          width: item.width,
          height: item.height,
          parentId: dropTarget?.id,
          graphicType: item.graphicType,
        };

        projectService.addBlocks([block]);
      }
    );
  };

  return (
    <div className={className}>
      {menus.map((item) => {
        return (
          <div
            className="siderItem"
            onMouseOver={(e) => {
              const { target } = e;
              if ((target as HTMLElement).dataset.makeDraggable || (target instanceof HTMLElement && target.className !== 'siderItem')) return;

              makeDraggable(target as HTMLElement, graph, item);

              (target as HTMLElement).dataset.makeDraggable = "true";
            }}
            key={item.name}
          >
            {item.name}
            {item.icon}
          </div>
        );
      })}
    </div>
  );
};

export { Sider };
