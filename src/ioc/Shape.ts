export type GUID = string;

type BlockShapeStyles = {
  x: number;
  y: number;
  width: number;
  height: number;
  visible?: boolean;
}

type LineShapeStyles = {

}

export type ElementData = {
  id: GUID;
  value: any;
  line?: boolean;
  block?: boolean;
  isDelete?: boolean;
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

/** Raw type */

export type RawBlockShapeStyles = {
  [x: string]: any;
}

export type RawLineShapeStyles = {
  [x: string]: any;
}

export type RawShape = {
  id: GUID;
  parentId?: GUID;
  isDelete?: boolean;
  block?: boolean;
  line?: boolean;
  graphicType?: string;
  styles?: RawBlockShapeStyles | RawLineShapeStyles;
}

export type RawBlockShape = RawShape & {
  x: number;
  y: number;
  width: number;
  height: number;
  styles?: RawBlockShapeStyles;
};

export type RawLineShape = RawShape & {
  fromId: GUID,
  toId: GUID,
  styles?: RawLineShapeStyles;
};