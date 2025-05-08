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
  line?: boolean;
  block?: boolean;
}

export type Shape = {
  id: GUID;
  parentId?: GUID;
  dataId: GUID;
  block?: boolean;
  isDelete?: boolean;
  line?: boolean;
  graphicType?: string;
  GetElementData?: () => ElementData;
};

export type BlockData = ElementData & {}
export type BlockShape = Shape & {
  styles?: BlockShapeStyles;
};

export type LineData = ElementData & {};
export type LineShape = Shape & {
  fromId: GUID,
  toId: GUID,
  styles?: LineShapeStyles;
};


export type RawShape = {
  id: GUID;
  parentId?: GUID;
  isDelete?: boolean;
  block?: boolean;
  line?: boolean;
  graphicType?: string;
  styles?: BlockShapeStyles | LineShapeStyles;
}

export type RawBlockShape = RawShape & {
  styles?: BlockShapeStyles;
};

export type RawLineShape = RawShape & {
  fromId: GUID,
  toId: GUID,
  styles?: LineShapeStyles;
};