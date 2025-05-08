import { Shape } from "@/ioc/Shape";
import { PanelConfig } from "../components";

type PanelStyle = {
  [key: string]: React.JSX.Element;
}

type PanelCommon = {
  [key: string]: React.JSX.Element;
}

type PanelConfig = {
  style?: PanelStyle;
  common?: PanelCommon;
}

export const getPanelConfig = (shapes: Shape[]): PanelConfig => {
  if (shapes.length === 0) return {
    style: {}
  };

  if (shapes.length === 1) {
    if (shapes[0]?.block) {
      return {
        style: {
          width: PanelConfig.width,
          height: PanelConfig.height,
          visible: PanelConfig.visible
        }
      }
    }
    if (shapes[0]?.line) {
      return {
        style: {
          width: PanelConfig.width,
          height: PanelConfig.height
        }
      }
    }
  }

  if (shapes.length > 1) {
    if (shapes.filter(shape => shape.block).length > 1) {
      return {
        common: {
          align: PanelConfig.align
        }
      }
    }
  }

  return {}
}