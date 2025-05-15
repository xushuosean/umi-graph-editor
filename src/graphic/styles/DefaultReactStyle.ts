import mx from '@/mxgraph';
import { StyleMap } from 'mxgraph';
import { BindShape, RegisterStyle } from '../shapes/decoration';
import { ReactShape } from '@/graphic/graph-react-shape/ReactShape';

@RegisterStyle('block')
export class DefaultReactStyle {
  @BindShape(ReactShape)
  static get styles(): StyleMap {
    return {
      [mx.mxConstants.STYLE_FONTSIZE]: 18,
      [mx.mxConstants.STYLE_FONTCOLOR]: 'red',
      ['reactShape']: 'tec'
    }
  }
}