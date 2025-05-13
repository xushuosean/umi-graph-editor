import type { Shape } from "@/ioc/Shape";
import mx from "@/mxgraph";
import { mxCell, mxGraph } from "mxgraph";
import { constraintsKey, nestingKey } from "../shapes/decoration";

function isShape(value: any): value is Shape {
  return value && typeof value.id === 'string'
}

export const rewritePrototypeGraph = (graph?: mxGraph) => {
  const internalGraph = graph ? graph : mx.mxGraph.prototype;

  internalGraph.convertValueToString = function (cell) {
    const value = this.model.getValue(cell);

    if (value != null) {
      if (mx.mxUtils.isNode(value, '')) {
        return value.nodeName;
      }
      else if (typeof (value.toString) == 'function') {
        if (isShape(value) && value.GetElementData) {
          return value.GetElementData().value;
        }
        return value;
      }
    }

    return '';
  };

  mx.mxGraph.prototype.getAllConnectionConstraints = function (terminal, source) {
    const value = Reflect.getMetadata(constraintsKey, terminal.shape, 'getConstraints')
    return value ? value : []
  }

  const oldGetDropTarget = mx.mxDragSource.prototype.getDropTarget;
  mx.mxDragSource.prototype.getDropTarget = function (graph, x, y, evt) {
    const target = oldGetDropTarget.apply(this, [graph, x, y, evt])
    if (!target) return target;

    const shape = graph.view.getState(target).shape;
    const nestingChild = Reflect.getMetadata(nestingKey, shape, 'getNestingChild');
    const graphicType = this.dragElement.dataset.graphicType;
    if (graphicType && nestingChild) {
      const style = graph.getStylesheet().getCellStyle(graphicType);
      if (nestingChild.some((f: any) => f.name === style.shape)) {
        return target;
      }
      return null as unknown as mxCell;
    }
    return target;
  }

  const oldGraphGetDropTarget = mx.mxGraph.prototype.getDropTarget;
  mx.mxGraph.prototype.getDropTarget = function (cells: mxCell[], evt: Event, cell: mxCell, clone?: boolean) {
    let target = oldGraphGetDropTarget.apply(this, [cells, evt, cell, clone]);

    if (!target) {
      if (!cell) return null as unknown as mxCell;
      if (cells.some(c => c.id === cell?.id)) return null as unknown as mxCell;
      const shape = this.view.getState(cell).shape;
      const nestingChild = Reflect.getMetadata(nestingKey, shape, 'getNestingChild');

      // console.log(shape, nestingChild)

      if (cells.every(cell => {
        return this.view.getState(cell).shape instanceof nestingChild[0]
      })) {
        return cell;
      }
      return null as unknown as mxCell;
    }

    return target;
  }

  mx.mxConnectionHandler.prototype.insertEdge = function (parent, id, value, source, target, style) {
    if (this.factoryMethod == null) {
      // return this.graph.insertEdge(parent, id, value, source, target, style);
      return this.createEdge(value, source, target, style)
    }
    else {
      let edge = this.createEdge(value, source, target, style);
      edge = this.graph.addEdge(edge, parent, source, target);

      return edge;
    }
  };
}