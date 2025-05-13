import { useProjectService } from "@/hooks/useProjectService";
import { IProjectService } from "@/ioc/IProjectService";
import { BlockShape, LineShape, Shape } from "@/ioc/Shape";
import { MenuProps } from "antd";
import { createContext, useContext, useEffect, useState } from "react";

const ShapeContext = createContext<Shape[]>([]);

export const ShapeProvider = ShapeContext.Provider;

export const useShapes = () => {
  const shapes = useContext(ShapeContext);
  return shapes;
}

export const useBlockShapes = () => {
  const shapes = useShapes();

  return shapes.filter(shape => shape.block) as BlockShape[];
}

export const useLineShapes = () => {
  const shapes = useShapes();

  return shapes.filter(shape => shape.line) as LineShape[];
}

const getMenus = (shapes: Shape[], projectService: IProjectService): MenuProps['items'] => {
  if (shapes.length === 0) {
    return [
      {
        label: '导出',
        key: 'exportImage',
        onClick: () => {
          console.log('导出');
        }
      },
    ]
  }

  if (shapes.every(shape => shape.block)) {
    return [
      {
        label: '删除',
        key: 'deleteBlock',
        onClick: () => {
          // const blocks: RawBlockShape[] = cells.map(cell => {
          //   const block = cell.value;
          //   return {
          //     ...block,
          //     isDelete: true
          //   }
          // })

          projectService.deleteBlocks(shapes.map(item => item.id))
        }
      },
    ]
  }

  if (shapes.every(shape => shape.line)) {
    return [
      {
        label: '删除',
        key: 'deleteLine',
        onClick: () => {
          console.log('删除');
        }
      },
    ]
  }

  return [];
}

export const useMenus = (shapes: Shape[]): MenuProps['items'] => {
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);
  const projectService = useProjectService();

  useEffect(() => {
    const items = getMenus(shapes, projectService);
    setMenuItems(items);
  }, [shapes])

  return menuItems;
}