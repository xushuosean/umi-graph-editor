import { inject, injectable } from "inversify";
import { Subject } from "rxjs";
import { ConnectionDataType, IConnectionService } from "../IConnectionService";
import { IMessageService } from "../IMessageService";
import { IProjectService } from "../interfaces";
import { BlockShape, LineShape } from "../Shape";
import { TYPES } from "../types";
import { DiagramService } from "./DiagramService";

@injectable()
export class ProjectService implements IProjectService {
  connectionService: IConnectionService;
  messageService: IMessageService;

  $blockShapeSubject: Subject<BlockShape>;

  currentDiagramService: DiagramService | null = null;

  constructor(
    @inject(TYPES.ConnectionService) connectionService: any,
    @inject(TYPES.MessageService) messageService: any
  ) {
    this.connectionService = connectionService;
    this.messageService = messageService;

    this.initListner();

    this.$blockShapeSubject = new Subject();
  }

  initListner() {
    this.connectionService.$messageSubject.subscribe((message: ConnectionDataType) => {
      message.forEach(item => {
        if (item.block) {
          this.blocksAdded([item as BlockShape])
        }
        if (item.line) {
          this.linesAdded([item as LineShape])
        }
      })
    });
  }

  createDiagram() {
    this.currentDiagramService = new DiagramService();
  }


  /** action function */
  addBlocks(blocks: BlockShape[]): void {
    this.connectionService.sendMessage(blocks)
  }

  /** action function */
  addLines(lines: LineShape[]): void {
    this.connectionService.sendMessage(lines)
  }


  blockAdded(block: BlockShape) {
    console.log(block, 'jijojjkl;', this.$blockShapeSubject)
    this.$blockShapeSubject.next(block)
  }

  blocksAdded(blocks: BlockShape[]) {
    blocks.forEach(block => {
      this.blockAdded(block)
    })
  }

  lineAdded(line: LineShape) {

  }

  linesAdded(lines: LineShape[]) {
    lines.forEach(line => {
      this.lineAdded(line)
    })
  }

  blocksUpdated(blocks: BlockShape[]) {

  }

  linesUpdated(lines: LineShape[]) { }

  blocksDeleted(blocks: BlockShape[]) {

  }

  linesDeleted(lines: LineShape[]) { }
}