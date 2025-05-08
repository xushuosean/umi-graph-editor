import { mxGraph } from 'mxgraph';
import { styleSheet } from '../shapes/decoration';
export { DefaultRectStyle } from './DefaultRectStyle';

export function registerStyle(graph: mxGraph) {
  graph.setStylesheet(styleSheet);
  console.log(styleSheet)
}