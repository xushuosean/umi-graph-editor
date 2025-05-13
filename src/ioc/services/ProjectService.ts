import { inject, injectable } from "inversify";
import { Subject } from "rxjs";
import { ConnectionAction, ConnectionActionUpdateBlockGeo, ConnectionActionUpdateBlockParent, ConnectionActionUpdateBlockVisible, ConnectionDataType, IConnectionService, SingleUpdateBlockAction } from "../IConnectionService";
import { IMessageService } from "../IMessageService";
import { IProjectService, UpdateBlockGeoPayload, UpdateBlockParentPayload, UpdateBlockVisiblePayload } from "../IProjectService";
import { BlockData, BlockShape, ElementData, GUID, LineData, LineShape, RawBlockShape, RawLineShape } from "../Shape";
import { TYPES } from "../types";
import { DiagramService } from "./DiagramService";

@injectable()
export class ProjectService implements IProjectService {
  connectionService: IConnectionService;
  messageService: IMessageService;

  $blockShapesAddSubject: Subject<BlockShape[]> = new Subject();
  $blockShapesUpdateSubject: Subject<BlockShape[]> = new Subject();
  $blockShapesDeleteSubject: Subject<BlockShape[]> = new Subject();

  $lineShapesSubject: Subject<LineShape[]> = new Subject();
  $lineShapesUpdateSubject: Subject<LineShape[]> = new Subject();
  $lineShapesDeleteSubject: Subject<LineShape[]> = new Subject();

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
          if (item.line) {
            this.lineDatas.set(item.id, item);
          }
          if (item.block) {
            this.blockDatas.set(item.id, item);
          }
        })
      }
      /** data end */

      /** update block */
      const updatedBlocks = message.shapes
        .filter(item => item.block)
        .filter(item => !item.isDelete)
        .filter(item => this.blockShapes.has(item.id));

      if (updatedBlocks && updatedBlocks.length > 0) {
        this.blocksUpdated(updatedBlocks)
      }

      /** update line */

      const updateLines = message.shapes
        .filter(item => item.line)
        .filter(item => !item.isDelete)
        .filter(item => this.lineShapes.has(item.id)) as LineShape[];

      if (updateLines && updateLines.length > 0) {
        this.linesUpdated(updateLines)
      }

      /** add block */
      const addedBlocks = message.shapes
        .filter(item => item.block)
        .filter(item => !item.isDelete)
        .filter(item => !this.blockShapes.has(item.id));

      if (addedBlocks && addedBlocks.length > 0) {
        this.blocksAdded(addedBlocks)
      }

      /** add line */
      const addedLines = message.shapes
        .filter(item => item.line)
        .filter(item => !item.isDelete)
        .filter(item => !this.lineShapes.has(item.id)) as LineShape[];

      if (addedLines && addedLines.length > 0) {
        this.linesAdded(addedLines)
      }

      /** delete blocks */
      const deletedBlocks = message.shapes
        .filter(item => item.isDelete);

      if (deletedBlocks && deletedBlocks.length > 0) {
        this.blocksDeleted(deletedBlocks)
      }

      /** delete lines */
      const deletedLines = message.shapes
        .filter(item => item.isDelete) as LineShape[];

      if (deletedLines && deletedLines.length > 0) {
        this.linesDeleted(deletedLines)
      }
    });
  }

  createDiagram() {
    this.currentDiagramService = new DiagramService();
  }


  /** action function add block */
  addBlocks(blocks: RawBlockShape[]): void {
    this.connectionService.sendMessage({
      type: ConnectionAction.AddBlocks,
      shapes: blocks
    })
  }

  /** action function add line */
  addLines(lines: RawLineShape[]): void {
    this.connectionService.sendMessage({
      type: ConnectionAction.AddLines,
      shapes: lines
    })
  }

  updateBlocksGeo(blocksGeo: UpdateBlockGeoPayload[]): void {
    const actions = blocksGeo.map(blockGeo => {
      return {
        type: ConnectionAction.UpdateBlockGeo,
        ...blockGeo
      } as ConnectionActionUpdateBlockGeo
    })
    this.updateBlocks(actions);
  }

  updateBlocksVisible(blocksVisible: UpdateBlockVisiblePayload[]): void {
    const actions = blocksVisible.map(blockVisible => {
      return {
        type: ConnectionAction.UpdateBlockVisible,
        ...blockVisible,
      } as ConnectionActionUpdateBlockVisible
    })
    this.updateBlocks(actions);
  }

  updateBlockParent(blocksParent: UpdateBlockParentPayload[]): void {
    const actions = blocksParent.map(blockParent => {
      return {
        type: ConnectionAction.UpdateBlockParent,
        ...blockParent,
      } as ConnectionActionUpdateBlockParent
    })
    this.updateBlocks(actions);
  }

  /** action functio update block */
  updateBlocks(actions: SingleUpdateBlockAction[]): void {
    this.connectionService.sendMessage({
      type: ConnectionAction.UpdateBlocks,
      actions: actions
    })
  }

  /** action function update line */
  updateLines(lines: RawLineShape[]): void {
    this.connectionService.sendMessage({
      type: ConnectionAction.UpdateLines,
      shapes: lines
    })
  }

  /** action function delete block */
  deleteBlocks(blockIds: GUID[]): void {
    this.connectionService.sendMessage({
      type: ConnectionAction.DeleteBlocks,
      ids: blockIds
    })
  }

  /** action function delete line */
  deleteLines(lineIds: GUID[]): void {
    this.connectionService.sendMessage({
      type: ConnectionAction.DeleteLines,
      ids: lineIds,
    })
  }

  /** call back */
  blocksAdded(blocks: BlockShape[]) {
    blocks.forEach(block => {
      block.GetElementData = () => {
        return this.blockDatas.get(block.dataId) ?? {} as unknown as ElementData;
      }
      this.blockShapes.set(block.id, block);
    })

    this.$blockShapesAddSubject.next(blocks);
  }

  linesAdded(lines: LineShape[]) {
    lines.forEach(line => {
      line.GetElementData = () => {
        return this.lineDatas.get(line.dataId) ?? {} as unknown as ElementData;
      }
      this.lineShapes.set(line.id, line);
    })

    this.$lineShapesSubject.next(lines);
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

  linesUpdated(lines: LineShape[]) {
    lines.forEach(line => {
      line.GetElementData = () => {
        return this.lineDatas.get(line.dataId) ?? {} as unknown as ElementData;
      }
      this.lineShapes.set(line.id, line);
    })

    this.$lineShapesUpdateSubject.next(lines);
  }

  blocksDeleted(blocks: BlockShape[]) {
    blocks.forEach(block => {
      this.blockShapes.delete(block.id);
    })

    this.$blockShapesDeleteSubject.next(blocks)
  }

  linesDeleted(lines: LineShape[]) {
    lines.forEach(line => {
      this.lineShapes.delete(line.id);
    })

    this.$lineShapesDeleteSubject.next(lines);
  }


  blockShapes: Map<string, BlockShape> = new Map();
  blockDatas: Map<string, BlockData> = new Map();
  lineShapes: Map<string, LineShape> = new Map();
  lineDatas: Map<string, LineData> = new Map();
}