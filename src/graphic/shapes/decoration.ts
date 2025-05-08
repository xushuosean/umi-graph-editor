import mx from '@/mxgraph';

export function RegisterShape(name?: string) {
  return function(target: any) {
    mx.mxCellRenderer.registerShape(name ? name : target.name, target);
  }
}

export const styleSheet = mx.mxGraph.prototype.createStylesheet();

export function RegisterStyle(type: 'block' | 'edge') {
  return function(target: any) {
    const styleName = target.name as string;
    if (type === 'block') {
      const defaultStyle = styleSheet.getDefaultVertexStyle();
      const mergedStyle = { ...defaultStyle, ...target.styles };
      styleSheet.putCellStyle(styleName, mergedStyle);
      return;
    }
    if (type === 'edge') {
      const defaultStyle = styleSheet.getDefaultEdgeStyle();
      const mergedStyle = { ...defaultStyle, ...target.styles };
      styleSheet.putCellStyle(styleName, mergedStyle);
      return;
    }
  }
}

export function BindShape(shape: any) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 修改 getter 方法
    const originalGetter = descriptor.get!;
    
    descriptor.get = function() {
      const styles = originalGetter.call(this);
      return {
        ...styles,
        [mx.mxConstants.STYLE_SHAPE]: shape.name
      };
    };
  }
}