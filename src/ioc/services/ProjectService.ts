import { inject, injectable } from "inversify";
import { Subject } from "rxjs";
import { ConnectionDataType, IConnectionService } from "../IConnectionService";
import { IMessageService } from "../IMessageService";
import { IProjectService } from "../interfaces";
import { BlockShape, LineShape, RawBlockShape, RawLineShape } from "../Shape";
import { TYPES } from "../types";
import { DiagramService } from "./DiagramService";

@injectable()
export class ProjectService implements IProjectService {
  connectionService: IConnectionService;
  messageService: IMessageService;

  $blockShapesSubject: Subject<BlockShape[]> = new Subject();
  $blockShapesUpdateSubject: Subject<BlockShape[]> = new Subject();

  currentDiagramService: DiagramService | null = null;

  constructor(
    @inject(TYPES.ConnectionService) connectionService: any,
    @inject(TYPES.MessageService) messageService: any
  ) {
    this.connectionService = connectionService;
    this.messageService = messageService;

    this.initListner();
  }

  initListner() {
    this.connectionService.$messageSubject.subscribe((message: ConnectionDataType) => {

      const updateBlocks = message
        .filter(item => item.block)
        .filter(item => this.blockShapes.has(item.id));

      console.log(message, 'upda', updateBlocks)

      if (updateBlocks && updateBlocks.length > 0) {
        this.blocksUpdated(updateBlocks)
      }

      const addBlocks = message
        .filter(item => item.block)
        .filter(item => !this.blockShapes.has(item.id));

      // const addLines = message
      //   .filter(item => item.line)
      //   .filter(item => !this.lineShapes.has(item.id));

      if (addBlocks && addBlocks.length > 0) {
        this.blocksAdded(addBlocks)
      }


    });
  }

  createDiagram() {
    this.currentDiagramService = new DiagramService();
  }


  /** action function */
  addBlocks(blocks: RawBlockShape[]): void {
    this.connectionService.sendMessage(blocks)
  }

  /** action function */
  addLines(lines: RawLineShape[]): void {
    this.connectionService.sendMessage(lines)
  }

  updateBlocks(blocks: RawBlockShape[]): void {
    this.connectionService.sendMessage(blocks)
  }

  updateLines(lines: RawLineShape[]): void {
    this.connectionService.sendMessage(lines)
  }


  /** call back */
  blocksAdded(blocks: BlockShape[]) {
    blocks.forEach(block => {
      this.blockShapes.set(block.id, block);
    })

    this.$blockShapesSubject.next(blocks);
  }

  lineAdded(line: LineShape) {

  }

  linesAdded(lines: LineShape[]) {
    lines.forEach(line => {
      this.lineAdded(line)
    })
  }

  blocksUpdated(blocks: BlockShape[]) {
    blocks.forEach(block => {
      this.blockShapes.set(block.id, block);
    })

    this.$blockShapesUpdateSubject.next(blocks);
  }

  linesUpdated(lines: LineShape[]) { }

  blocksDeleted(blocks: BlockShape[]) {

  }

  linesDeleted(lines: LineShape[]) { }


  blockShapes: Map<string, BlockShape> = new Map();
  lineShapes: Map<string, BlockShape> = new Map();
}