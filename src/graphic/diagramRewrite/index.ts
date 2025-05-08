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

  mx.mxGraph.prototype.getAllConnectionConstraints = function(terminal, source) {
    const value = Reflect.getMetadata(constraintsKey, terminal.shape, 'getConstraints')
    return value ? value : []
  }
}