import { shapeMaps } from './register';
import mx from '@/mxgraph';
import { mxRectangle, mxSvgCanvas2D } from 'mxgraph';
import { RegisterShape } from '../shapes/decoration';
import { createRoot } from 'react-dom/client';
import { createElement } from 'react';

@RegisterShape()
export class ReactShape extends mx.mxRectangleShape {
  constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth?: number) {
    super(bounds, fill, stroke, strokewidth);
  }

  override paintForeground(c: mxSvgCanvas2D, x: number, y: number, w: number, h: number): void {
    super.paintForeground(c, x, y, w, h);

    console.log('hsdf');

    this.addContainer(c.root, c, x, y, w, h)
  }

  addContainer(root: Element, c: mxSvgCanvas2D, x: number, y: number, w: number, h: number) {
    const group = c.createElement('g');
    const fo = c.createElement('foreignObject');

    // Workarounds for print clipping and static position in Safari
    fo.setAttribute('style', 'overflow: visible; text-align: left;');
    fo.setAttribute('pointer-events', 'none');

    const div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');

    fo.appendChild(div);
    fo.setAttribute('width', `${w}px`)
    fo.setAttribute('height', `${h}px`)
    fo.setAttribute('x', `${x}px`)
    fo.setAttribute('y', `${y}px`)
    group.appendChild(fo);

    root.appendChild(group);

    this.renderComponent(div);
  }

  renderComponent(container: HTMLElement) {
    const reactShape = mx.mxUtils.getValue(this.style, 'reactShape', 'defaultReactComponent');

    const Component = shapeMaps[reactShape].component;

    if (Component) {
      const root = createRoot(container);
      root.render(createElement(Component, { cell: this.state?.cell, graph: this.state?.view.graph }))
    }
  }

}