import mx from '@/mxgraph';
import { mxGraph, StyleMap } from 'mxgraph';
import { mxRectShape } from './mxRectShape';

export const registerShape = () => {
  mx.mxCellRenderer.registerShape(mxRectShape.shapeName, mxRectShape);
}

export const registerStyle = (graph: mxGraph, graphicType: GraphicType) => {
  const style = getStyleByGraphicType(graphicType, graph);
  graph.stylesheet.putCellStyle(graphicType, style);
}

export const registerStyles = (graph: mxGraph) => {
  Object.values(GraphicType).forEach((graphicType) => {
    registerStyle(graph, graphicType);
  })
}

export enum GraphicType {
  Circle = 'cs_circle',
  Rect = 'cs_rect'
}

export const getStyleByGraphicType = (graphicType: GraphicType, graph: mxGraph) => {
  const styles: StyleMap = [];

  switch (graphicType) {
    case GraphicType.Circle:
      styles[mx.mxConstants.STYLE_SHAPE] = mx.mxConstants.SHAPE_ELLIPSE;
      styles[mx.mxConstants.STYLE_FONTSIZE] = 20;
      return styles;
    case GraphicType.Rect:
      styles[mx.mxConstants.STYLE_SHAPE] = mxRectShape.shapeName;
      styles[mx.mxConstants.STYLE_FONTSIZE] = 12;
      return styles;
    default:
      return styles;
  }

}