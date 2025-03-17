import { Subject } from "rxjs";
import { Shape } from "./Shape";

export type ConnectionMessageType = Shape[]

export type ConnectionDataType = Shape[]

export interface IConnectionService {
  sendMessage(message: ConnectionMessageType): void;

  $messageSubject: Subject<ConnectionDataType>;
}