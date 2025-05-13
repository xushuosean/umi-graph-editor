import { Subject } from "rxjs";
import { ConnectionDataType, ConnectionMessageType, IConnectionService } from "../IConnectionService";

class ConnectionService implements IConnectionService {
  $messageSubject: Subject<ConnectionDataType> = new Subject();
  constructor() {
  }

  sendMessage(message: ConnectionMessageType) {

  }

  onMessage(datas: ConnectionDataType) {
    this.$messageSubject.next(datas);
  }
}

export {
  ConnectionService
};
