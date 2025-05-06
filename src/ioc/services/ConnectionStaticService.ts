import { Subject } from "rxjs";
import { v4 } from "uuid";
import { ConnectionDataType, ConnectionMessageType, IConnectionService } from "../IConnectionService";

class ConnectionStaticService implements IConnectionService {
  $messageSubject: Subject<ConnectionDataType> = new Subject();
  constructor() {
  }

  sendMessage(message: ConnectionMessageType) {
    console.log('message', message)
    this.onMessage(message)
  }

  mapRawShapeToShape(shapes: ConnectionMessageType) {
    const newShapes = shapes.map(shape => {
      const dataId = v4();
      return {
        ...shape,
        dataId,
      }
    })

    const newDatas = newShapes.map(shape => {
      return {
        id: shape.dataId,
        value: 'shape data Value',
        shapeId: shape.id,
      }
    })

    return {
      shapes: newShapes,
      datas: newDatas,
    }
  }

  onMessage(message: ConnectionMessageType) {
    this.$messageSubject.next(this.mapRawShapeToShape(message));
  }
}

export {
  ConnectionStaticService
};
