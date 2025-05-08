import mx from '@/mxgraph';
import { mxAbstractCanvas2D, mxRectangle } from "mxgraph";
import { RegisterShape } from './decoration';

@RegisterShape()
export class mxCircleShape extends mx.mxEllipse {
  constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth?: number) {
    super(bounds, fill, stroke, strokewidth);
  }

  paint(c: mxAbstractCanvas2D): void {
    super.paint(c)
  }
}