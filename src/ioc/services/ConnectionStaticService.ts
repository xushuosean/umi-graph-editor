import { Subject } from "rxjs";
import { v4 } from "uuid";
import { ConnectionAction, ConnectionDataType, ConnectionMessageType, IConnectionService } from "../IConnectionService";
import { ElementData, GUID, RawShape, Shape } from "../Shape";

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

  shapes = new Map<GUID, Shape>();
  datas = new Map<GUID, ElementData>();
}

function createShape(shape: RawShape) {
  const dataId = v4();
  return {
    ...shape,
    dataId,
  }
}

class ConnectionStaticService implements IConnectionService {
  $messageSubject: Subject<ConnectionDataType> = new Subject();

  sd: ShapeAndDataDO;
  constructor() {
    this.sd = new ShapeAndDataDO();
  }

  sendMessage(message: ConnectionMessageType) {
    this.onMessage(message)
  }

  mapRawShapeToShape(message: ConnectionMessageType) {
    if (message.type === ConnectionAction.Add) {
      const newShapes: Shape[] = message.shapes.map(shape => {
        return createShape(shape);
      })

      const newDatas: ElementData[] = newShapes.map(shape => {
        return {
          id: shape.dataId,
          value: 'shape data Value',
          shapeId: shape.id,
          block: !!shape.block,
          line: !!shape.line,
        }
      })

      this.sd.addShapes(newShapes);
      this.sd.addDatas(newDatas);

      return {
        shapes: newShapes,
        datas: newDatas,
      }
    }

    if (message.type === ConnectionAction.Update) {
      const newShapes: Shape[] = message.shapes.map(shape => {
        return createShape(shape);
      })

      const newDatas: ElementData[] = newShapes.map(shape => {
        return {
          id: shape.dataId,
          value: 'shape data Value',
          shapeId: shape.id,
        }
      })

      this.sd.addShapes(newShapes);
      this.sd.addDatas(newDatas);

      return {
        shapes: newShapes,
        datas: newDatas,
      }
    }

    if (message.type === ConnectionAction.Delete) {
      const shapes = message.ids.map(id => {
        const shape = this.sd.shapes.get(id);
        if (shape) {
          this.sd.deleteShape(shape.id);
          this.sd.deleleData(shape.dataId);
          return {
            ...shape,
            isDelete: true,
          }
        }
        return null
      }).filter(item => !!item)

      return {
        shapes,
        datas: []
      }
    }

    return {
      shapes: [],
      datas: [],
    }


  }

  onMessage(message: ConnectionMessageType) {
    this.$messageSubject.next(this.mapRawShapeToShape(message));
  }
}

export {
  ConnectionStaticService
};
