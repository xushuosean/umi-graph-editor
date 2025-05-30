import { Subject } from "rxjs";
import { SingleUpdateBlockAction } from "./IConnectionService";
import { DiagramService } from "./services/DiagramService";
import { BlockShape, GUID, LineShape, RawBlockShape, RawLineShape } from "./Shape";

export type UpdateBlockGeoPayload = {
  id: GUID;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export type UpdateBlockVisiblePayload = {
  id: GUID;
  visible: boolean;
}

export type UpdateBlockParentPayload = {
  id: GUID;
  parentId: GUID;
}

export interface IProjectService {
  addBlocks(blocks: RawBlockShape[]): void;
  addLines(lines: RawLineShape[]): void;

  updateBlocks(actions: SingleUpdateBlockAction[]): void;
  updateBlocksGeo(blocksGeo: UpdateBlockGeoPayload[]): void;
  updateBlocksVisible(blocksVisible: UpdateBlockVisiblePayload[]): void;
  updateBlockParent(blocksParent: UpdateBlockParentPayload[]): void;
  updateLines(lines: RawLineShape[]): void;

  deleteBlocks(blockIds: GUID[]): void;
  deleteLines(lineIds: GUID[]): void;

  blocksAdded: (blocks: BlockShape[]) => void;
  linesAdded: (lines: LineShape[]) => void;

  blocksUpdated: (blocks: BlockShape[]) => void;
  linesUpdated: (lines: LineShape[]) => void;

  blocksDeleted: (blocks: BlockShape[]) => void;
  linesDeleted: (lines: LineShape[]) => void;

  currentDiagramService: DiagramService | null;
  createDiagram(): void;

  $blockShapesAddSubject: Subject<BlockShape[]>;
  $blockShapesUpdateSubject: Subject<BlockShape[]>;
  $blockShapesDeleteSubject: Subject<BlockShape[]>;

  $lineShapesSubject: Subject<LineShape[]>;
  $lineShapesUpdateSubject: Subject<LineShape[]>;
  $lineShapesDeleteSubject: Subject<LineShape[]>;
}





