import mx from '@/mxgraph';
import { StyleMap } from 'mxgraph';
import { BindShape, RegisterStyle } from '../shapes/decoration';
import { mxRectShape } from '../shapes/mxRectShape';

@RegisterStyle('block')
export class DefaultRectStyle {
  @BindShape(mxRectShape)
  static get styles(): StyleMap {
    return {
      [mx.mxConstants.STYLE_FONTSIZE]: 18,
      [mx.mxConstants.STYLE_FONTCOLOR]: 'red'
    }
  }
}