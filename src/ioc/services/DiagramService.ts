import { Subject } from "rxjs";
import { BlockShape, LineShape } from "../Shape";

class DiagramService {
  constructor() {};

  addBlock(block: BlockShape): void {
    this.$diagramBlockAdded.next(block);
  }

  addLine(line: LineShape): void {
    this.$diagramLineAdded.next(line);
  }

  $diagramBlockAdded: Subject<BlockShape> = new Subject();
  $diagramLineAdded: Subject<LineShape> = new Subject();
}

export {
  DiagramService
};
