import { GUID } from './../../ioc/Shape';
import type { Shape } from "@/ioc/Shape";
import mx from "@/mxgraph";
import { mxGraph } from "mxgraph";

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
}