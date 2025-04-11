import { Subject } from "rxjs";
import { RawShape, Shape } from "./Shape";

export type ConnectionMessageType = RawShape[]

export type ConnectionDataType = Shape[]

export interface IConnectionService {
  sendMessage(message: ConnectionMessageType): void;

  $messageSubject: Subject<ConnectionDataType>;
}