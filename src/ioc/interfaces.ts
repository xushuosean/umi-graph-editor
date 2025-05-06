import { Subject } from "rxjs";
import { DiagramService } from "./services/DiagramService";
import { BlockShape, LineShape, RawBlockShape, RawLineShape } from "./Shape";

export interface IProjectService {
  addBlocks(blocks: RawBlockShape[]): void;
  addLines(lines: RawLineShape[]): void;

  updateBlocks(blocks: RawBlockShape[]): void;
  updateLines(lines: RawLineShape[]): void;

  deleteBlocks(blocks: RawBlockShape[]): void;
  deleteLines(lines: RawLineShape[]): void;

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





