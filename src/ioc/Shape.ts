
export type ElementData = {
  id: string;
}

export type Shape = {
  x: number;
  y: number;
  parentId?: string;
  dataId: string;
  block?: boolean;
  line?: boolean;
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