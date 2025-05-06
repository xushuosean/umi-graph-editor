import { Subject } from "rxjs";
import { ElementData, RawShape, Shape } from "./Shape";

export type ConnectionMessageType = RawShape[]

export type ConnectionDataType = {
  shapes: Shape[];
  datas: ElementData[];
}

export interface IConnectionService {
  sendMessage(message: ConnectionMessageType): void;

  $messageSubject: Subject<ConnectionDataType>;
}