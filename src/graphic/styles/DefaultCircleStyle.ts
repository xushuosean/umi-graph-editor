import mx from '@/mxgraph';
import { StyleMap } from 'mxgraph';
import { BindShape, RegisterStyle } from '../shapes/decoration';
import { mxCircleShape } from '../shapes/mxCircleShape';

@RegisterStyle('block')
export class DefaultCircleStyle {
  @BindShape(mxCircleShape)
  static get styles(): StyleMap {
    return {
      [mx.mxConstants.STYLE_FONTSIZE]: 14,
      [mx.mxConstants.STYLE_FONTCOLOR]: 'blue'
    }
  }
}