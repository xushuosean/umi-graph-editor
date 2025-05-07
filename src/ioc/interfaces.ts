import { Subject } from "rxjs";
import { DiagramService } from "./services/DiagramService";
import { BlockShape, GUID, LineShape, RawBlockShape, RawLineShape } from "./Shape";

export interface IProjectService {
  addBlocks(blocks: RawBlockShape[]): void;
  addLines(lines: RawLineShape[]): void;

  updateBlocks(blocks: RawBlockShape[]): void;
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

  $blockShapesSubject: Subject<BlockShape[]>;
  $blockShapesUpdateSubject: Subject<BlockShape[]>;
  $blockShapesDeleteSubject: Subject<BlockShape[]>;
}





