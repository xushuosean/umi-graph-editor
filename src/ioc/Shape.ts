import { GraphicType } from "@/graphic/shapes";

type BlockShapeStyles = {
  x: number;
  y: number;
  width: number;
  height: number;
}

type LineShapeStyles = {
  
}

export type ElementData = {
  id: string;
}

export type Shape = {
  id: string;
  parentId?: string;
  dataId: string;
  block?: boolean;
  line?: boolean;
  graphicType?: GraphicType;
  GetElementData?: () => ElementData;
};

export type BlockData = ElementData & {}
export type BlockShape = Shape & {
  styles?: BlockShapeStyles;
};

export type LineData = ElementData & {};
export type LineShape = Shape & {
  from: Shape,
  to: Shape,
  styles?: LineShapeStyles;
};


export type RawShape = {
  id: string;
  parentId?: string;
  block?: boolean;
  line?: boolean;
  graphicType?: GraphicType;
}

export type RawBlockShape = RawShape & {
  styles?: BlockShapeStyles;
};

export type RawLineShape = RawShape & {
  from: RawShape,
  to: RawShape,
  styles?: LineShapeStyles;
};