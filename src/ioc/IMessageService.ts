import { ConnectionDataType } from "./IConnectionService";

export interface IMessageService {
  onMessage(message: ConnectionDataType): void;
}