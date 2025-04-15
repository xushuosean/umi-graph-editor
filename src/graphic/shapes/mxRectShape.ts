import mx from '@/mxgraph';
import { mxAbstractCanvas2D, mxRectangle } from "mxgraph";

export class mxRectShape extends mx.mxRectangleShape {
  static shapeName = 'rectShape'

  constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth?: number) {
    super(bounds, fill, stroke, strokewidth);
  }

  paint(c: mxAbstractCanvas2D): void {
    console.log('here is paint')
    super.paint(c)
  }
}