import { inject, injectable } from "inversify";
import { filter, Subject } from "rxjs";
import { ConnectionDataType, IConnectionService } from "../IConnectionService";
import { IMessageService } from "../IMessageService";
import { IProjectService } from "../interfaces";
import { BlockData, BlockShape, ElementData, LineShape, RawBlockShape, RawLineShape } from "../Shape";
import { TYPES } from "../types";
import { DiagramService } from "./DiagramService";

@injectable()
export class ProjectService implements IProjectService {
  connectionService: IConnectionService;
  messageService: IMessageService;

  $blockShapesSubject: Subject<BlockShape[]> = new Subject();
  $blockShapesUpdateSubject: Subject<BlockShape[]> = new Subject();
  $blockShapesDeleteSubject: Subject<BlockShape[]> = new Subject();

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

      /** data start */
      if (message.datas && message.datas.length > 0) {
        message.datas.forEach(item => {
          this.blockDatas.set(item.id, item);
        })
      }
      /** data end */

      const updatedBlocks = message.shapes
        .filter(item => item.block)
        .filter(item => !item.isDelete)
        .filter(item => this.blockShapes.has(item.id));

      if (updatedBlocks && updatedBlocks.length > 0) {
        this.blocksUpdated(updatedBlocks)
      }

      const addedBlocks = message.shapes
        .filter(item => item.block)
        .filter(item => !item.isDelete)
        .filter(item => !this.blockShapes.has(item.id));

      if (addedBlocks && addedBlocks.length > 0) {
        this.blocksAdded(addedBlocks)
      }

      const deletedBlocks = message.shapes
        .filter(item => item.isDelete);

      if (deletedBlocks && deletedBlocks.length > 0) {
        this.blocksDeleted(deletedBlocks)
      }
    });
  }

  createDiagram() {
    this.currentDiagramService = new DiagramService();
  }


  /** action function add block */
  addBlocks(blocks: RawBlockShape[]): void {
    this.connectionService.sendMessage(blocks)
  }

  /** action function add line */
  addLines(lines: RawLineShape[]): void {
    this.connectionService.sendMessage(lines)
  }

  /** action functio update block */
  updateBlocks(blocks: RawBlockShape[]): void {
    this.connectionService.sendMessage(blocks)
  }

  /** action function update line */
  updateLines(lines: RawLineShape[]): void {
    this.connectionService.sendMessage(lines)
  }

  /** action function delete block */
  deleteBlocks(blocks: RawBlockShape[]): void {
    this.connectionService.sendMessage(blocks)
  }

  /** action function delete line */
  deleteLines(lines: RawLineShape[]): void {
    this.connectionService.sendMessage(lines)
  }

  /** call back */
  blocksAdded(blocks: BlockShape[]) {
    blocks.forEach(block => {
      block.GetElementData = () => {
        return this.blockDatas.get(block.dataId) ?? {} as unknown as ElementData;
      }
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
      block.GetElementData = () => {
        return this.blockDatas.get(block.dataId) ?? {} as unknown as ElementData;
      }
      this.blockShapes.set(block.id, block);
    })

    this.$blockShapesUpdateSubject.next(blocks);
  }

  linesUpdated(lines: LineShape[]) { }

  blocksDeleted(blocks: BlockShape[]) {
    blocks.forEach(block => {
      this.blockShapes.delete(block.id);
    })

    this.$blockShapesDeleteSubject.next(blocks)
  }

  linesDeleted(lines: LineShape[]) { }


  blockShapes: Map<string, BlockShape> = new Map();
  blockDatas: Map<string, BlockData> = new Map();
  lineShapes: Map<string, BlockShape> = new Map();
}