import { Subject } from "rxjs";
import { ConnectionDataType, ConnectionMessageType, IConnectionService } from "../IConnectionService";

class ConnectionStaticService implements IConnectionService {
  $messageSubject: Subject<ConnectionDataType> = new Subject();
  constructor() {
  }

  sendMessage(message: ConnectionMessageType) {
    console.log('message', message)
    this.onMessage(message)
  }

  onMessage(message: ConnectionDataType) {
    this.$messageSubject.next(message);
  }
}

export {
  ConnectionStaticService
};
