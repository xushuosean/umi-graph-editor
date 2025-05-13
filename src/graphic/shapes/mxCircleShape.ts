import mx from '@/mxgraph';
import { mxAbstractCanvas2D, mxRectangle } from "mxgraph";
import { AllowNestingChild, RegisterConstraints, RegisterShape } from './decoration';

@RegisterShape()
export class mxCircleShape extends mx.mxEllipse {
  constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth?: number) {
    super(bounds, fill, stroke, strokewidth);
  }

  paint(c: mxAbstractCanvas2D): void {
    super.paint(c)
  }

  @RegisterConstraints()
  getConstraints() {
    return [
      new mx.mxConnectionConstraint(new mx.mxPoint(0.5, 0), true), // 顶部中点
      new mx.mxConnectionConstraint(new mx.mxPoint(0, 0.5), true), // 左侧中点
      new mx.mxConnectionConstraint(new mx.mxPoint(1, 0.5), true), // 右侧中点
      new mx.mxConnectionConstraint(new mx.mxPoint(0.5, 1), true)  // 底部中点
    ]
  }

  @AllowNestingChild()
  getNestingChild() {
    return [mxCircleShape]
  }
}