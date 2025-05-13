import { Subject } from "rxjs";
import { v4 } from "uuid";
import { ConnectionAction, ConnectionDataType, ConnectionMessageType, IConnectionService, SingleUpdateBlockAction } from "../IConnectionService";
import { BlockShape, ElementData, GUID, RawBlockShape, Shape } from "../Shape";

function isEmpty(value: any) {
  return value === null || value === undefined || value === '';
}

class ShapeAndDataDO {
  constructor() {
  }

  addShapes(shapes: Shape[]) {
    shapes.forEach(shape => {
      this.addShape(shape);
    })
  }

  addShape(shape: Shape) {
    this.shapes.set(shape.id, shape);
  }

  updateShape(shape: Shape) {
    this.shapes.set(shape.id, shape);
  }
  deleteShape(shapeId: GUID) {
    this.shapes.delete(shapeId);
  }

  addDatas(datas: ElementData[]) {
    datas.forEach(data => {
      this.addData(data);
    })
  }

  addData(data: ElementData) {
    this.datas.set(data.id, data);
  }

  updateData(data: ElementData) {
    this.datas.set(data.id, data);
  }

  deleleData(dataId: GUID) {
    this.datas.delete(dataId);
  }

  hasShape(id: GUID) {
    return this.shapes.has(id);
  }

  getShape(id: GUID) {
    return this.shapes.get(id);
  }

  setShape(id: GUID, shape: Shape) {
    this.shapes.set(id, shape);
  }

  shapes = new Map<GUID, Shape>();
  datas = new Map<GUID, ElementData>();
}

function addBlocks(blocks: RawBlockShape[], sd: ShapeAndDataDO) {
  const shapes: BlockShape[] = blocks.map(block => {
    const dataId = v4();
    const shape = {
      id: block.id,
      parentId: block.parentId,
      isDelete: false,
      block: true,
      graphicType: block.graphicType,
      styles: {
        x: block.x,
        y: block.y,
        width: block.width,
        height: block.height,
        visible: true,
      },
      dataId,
    }
    
    sd.addShape(shape);
    return shape;
  })
  
  const datas = shapes.map(shape => {
    const data = {
      id: shape.dataId,
      value: 'shape data Value',
      shapeId: shape.id,
      block: !!shape.block,
      line: !!shape.line,
    }

    sd.addData(data);
    return data;
  })

  return {
    shapes,
    datas,
  }
}

function updateBlocks(actions: SingleUpdateBlockAction[], sd: ShapeAndDataDO) {
  const shapes: BlockShape[] = [];
  const datas: ElementData[] = [];

  actions.forEach(action => {
    if (action.type === ConnectionAction.UpdateBlockGeo) {
      if (!action.id) return;
      if (!sd.hasShape(action.id)) return;
      const shape: BlockShape = sd.getShape(action.id)!;

      shape.styles = {
        ...shape.styles,
        x: isEmpty(action.x) ? shape.styles?.x ?? 0 : action.x!,
        y: isEmpty(action.y) ? shape.styles?.y ?? 0 : action.y!,
        width: isEmpty(action.width) ? shape.styles?.width ?? 0 : action.width!,
        height: isEmpty(action.height) ? shape.styles?.height ?? 0 : action.height!,
      }

      sd.setShape(action.id, shape);
      shapes.push(shape)
    }

    if (action.type === ConnectionAction.UpdateBlockVisible) {
      if (!action.id) return;
      if (!sd.hasShape(action.id)) return;
      const shape: BlockShape = sd.getShape(action.id)!;

      shape.styles = {
        ...shape.styles!,
        visible: action.visible,
      }

      sd.setShape(action.id, shape);
      shapes.push(shape);
    }

    if (action.type === ConnectionAction.UpdateBlockParent) {
      if (!action.id) return;
      if (!sd.hasShape(action.id)) return;

      const shape: BlockShape = sd.getShape(action.id)!;
      shape.parentId = action.parentId;

      sd.setShape(action.id, shape);
      shapes.push(shape);
    }
  })

  /** TODO: update block data here */

  return {
    shapes,
    datas,
  }
}

function deleteBlocks(blockIds: GUID[], sd: ShapeAndDataDO) {
  const shapes: BlockShape[] = [];
  const datas: ElementData[] = [];

  blockIds.forEach(blockId => {
    if (!sd.hasShape(blockId)) return;
    const shape: BlockShape = sd.getShape(blockId)!;
    shape.isDelete = true;
    sd.setShape(shape.id, shape);
    shapes.push(shape);
  })

  /** TODO: delete block data here */

  return {
    shapes,
    datas,
  }
}
class ConnectionStaticService implements IConnectionService {
  $messageSubject: Subject<ConnectionDataType> = new Subject();

  sd: ShapeAndDataDO;
  constructor() {
    this.sd = new ShapeAndDataDO();
  }

  sendMessage(message: ConnectionMessageType) {
    const datas = this.mapRawShapeToShape(message);
    this.onMessage(datas);
  }

  mapRawShapeToShape(message: ConnectionMessageType) {
    if (message.type === ConnectionAction.AddBlocks) {
      return addBlocks(message.shapes, this.sd);
    }

    if (message.type === ConnectionAction.UpdateBlocks) {
      return updateBlocks(message.actions, this.sd);
    }

    if (message.type === ConnectionAction.DeleteBlocks) {
      return deleteBlocks(message.ids, this.sd);
    }

    if (message.type === ConnectionAction.Composition) {
      const compositionShapes: Shape[] = [];
      const compositionDatas: ElementData[] = [];
      message.actions.forEach(action => {
        const { shapes, datas } = this.mapRawShapeToShape(action);

        compositionShapes.push(...shapes);
        compositionDatas.push(...datas);
      })
      return {
        shapes: compositionShapes,
        datas: compositionDatas,
      }
    }

    return {
      shapes: [],
      datas: [],
    }
  }

  onMessage(datas: ConnectionDataType) {
    this.$messageSubject.next(datas);
  }
}

export {
  ConnectionStaticService
};
