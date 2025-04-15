import { GraphicType } from "@/graphic/shapes";

export type ElementData = {
  id: string;
}

export type Shape = {
  id: string;
  x: number;
  y: number;
  parentId?: string;
  dataId: string;
  block?: boolean;
  line?: boolean;
  graphicType?: GraphicType;
  GetElementData?: () => ElementData;
};

export type BlockData = ElementData & {}
export type BlockShape = Shape & {
  width: number;
  height: number;
};

export type LineData = ElementData & {};
export type LineShape = Shape & {
  
};


export type RawShape = {
  x: number;
  y: number;
  parentId?: string;
  block?: boolean;
  line?: boolean;
  graphicType?: GraphicType;
}

export type RawBlockShape = RawShape & {
  width: number;
  height: number;
};

export type RawLineShape = Shape & {
  from: RawShape,
  to: RawShape,
};