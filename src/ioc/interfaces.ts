import { Subject } from "rxjs";
import { DiagramService } from "./services/DiagramService";
import { BlockShape, LineShape } from "./Shape";

export interface IProjectService {
  addBlocks(blocks: BlockShape[]): void;
  addLines(lines: LineShape[]): void;
  
  blocksAdded: (blocks: BlockShape[]) => void;
  linesAdded: (lines: LineShape[]) => void;

  blocksUpdated: (blocks: BlockShape[]) => void;
  linesUpdated: (lines: LineShape[]) => void;

  blocksDeleted: (blocks: BlockShape[]) => void;
  linesDeleted: (lines: LineShape[]) => void;

  currentDiagramService: DiagramService | null;
  createDiagram(): void;

  $blockShapeSubject: Subject<BlockShape>;
}





