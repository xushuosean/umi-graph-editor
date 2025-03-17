import { ConnectionDataType } from "../IConnectionService";
import { IMessageService } from "../IMessageService";

class MessageService implements IMessageService {
  onMessage(message: ConnectionDataType) {
    message.forEach((item) => {
      if (item.block) {
      }
    })    
  };
}

export {
  MessageService
};
