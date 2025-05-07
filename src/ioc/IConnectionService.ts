import { Subject } from "rxjs";
import { ElementData, RawShape, Shape } from "./Shape";

export enum ConnectionAction {
  Add = 'add',
  Update = 'update',
  Delete = 'delete'
}

export type ConnectionActionType = typeof ConnectionAction

type ConnectionActionAdd = {
  type: ConnectionAction.Add;
  shapes: RawShape[];
}

type ConnectionActionUpdate = {
  type: ConnectionAction.Update;
  shapes: RawShape[];
}

type ConnectionActionDelete = {
  type: ConnectionAction.Delete;
  ids: string[];
}

export type ConnectionMessageType = ConnectionActionAdd | ConnectionActionUpdate | ConnectionActionDelete;

export type ConnectionDataType = {
  shapes: Shape[];
  datas: ElementData[];
}

export interface IConnectionService {
  sendMessage(message: ConnectionMessageType): void;

  $messageSubject: Subject<ConnectionDataType>;
}