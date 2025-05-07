import { GraphicType } from "@/graphic/shapes";

export type GUID = string;

type BlockShapeStyles = {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

type LineShapeStyles = {

}

export type ElementData = {
  id: GUID;
  value: any;
  shapeId: GUID;
}

export type Shape = {
  id: GUID;
  parentId?: GUID;
  dataId: GUID;
  block?: boolean;
  isDelete?: boolean;
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
  id: GUID;
  parentId?: GUID;
  isDelete?: boolean;
  block?: boolean;
  line?: boolean;
  graphicType?: GraphicType;
  styles?: BlockShapeStyles | LineShapeStyles;
}

export type RawBlockShape = RawShape & {
  styles?: BlockShapeStyles;
};

export type RawLineShape = RawShape & {
  from: RawShape,
  to: RawShape,
  styles?: LineShapeStyles;
};