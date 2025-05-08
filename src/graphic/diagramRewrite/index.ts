import type { Shape } from "@/ioc/Shape";
import mx from "@/mxgraph";
import { mxGraph } from "mxgraph";
import { constraintsKey } from "../shapes/decoration";

function isShape(value: any): value is Shape {
  return value && typeof value.id === 'string'
}

export const rewritePrototypeGraph = (graph?: mxGraph) => {
  const internalGraph = graph ? graph : mx.mxGraph.prototype;

  internalGraph.convertValueToString = function (cell) {
    var value = this.model.getValue(cell);

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

  mx.mxConnectionHandler.prototype.insertEdge = function (parent, id, value, source, target, style) {
    if (this.factoryMethod == null) {
      // return this.graph.insertEdge(parent, id, value, source, target, style);
      return this.createEdge(value, source, target, style)
    }
    else {
      var edge = this.createEdge(value, source, target, style);
      edge = this.graph.addEdge(edge, parent, source, target);

      return edge;
    }
  };
}