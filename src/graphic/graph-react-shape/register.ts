import mx from '@/mxgraph';
import { mxCell, mxGraph } from "mxgraph";

export type ReactShapeConfig = {
  shape: string
  component: React.ComponentType<{ cell?: mxCell; graph?: mxGraph }>
}

export const shapeMaps: Record<
  string,
  {
    component: React.ComponentType<{ cell?: mxCell; graph?: mxGraph }>
  }
> = {}

export function register(config: ReactShapeConfig) {
  const { shape, component } = config;
  if (!shape) {
    throw new Error('should specify shape in config')
  }

  shapeMaps[shape] = {
    component,
  }
}