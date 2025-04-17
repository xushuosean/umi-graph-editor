import { BlockShape, LineShape, Shape } from "@/ioc/Shape";
import { createContext, useContext } from "react";

const ShapeContext = createContext<Shape[]>([]);

export const ShapeProvider = ShapeContext.Provider;

export const useShapes = () => {
  const shapes = useContext(ShapeContext);
  return shapes;
}

export const useBlockShapes = () => {
  const shapes = useShapes();

  return shapes.filter(shape => shape.block) as BlockShape[];
}

export const useLineShapes = () => {
  const shapes = useShapes();

  return shapes.filter(shape => shape.line) as LineShape[];
}