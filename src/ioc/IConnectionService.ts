import { Subject } from "rxjs";
import { UpdateBlockGeoPayload, UpdateBlockParentPayload, UpdateBlockVisiblePayload } from "./IProjectService";
import { ElementData, RawBlockShape, RawLineShape, Shape } from "./Shape";

export enum ConnectionAction {
  AddBlocks = 'addBlocks',
  UpdateBlocks = 'updateBlocks',

  UpdateBlockGeo = 'updateBlockGeo',
  UpdateBlockVisible = 'updateBlockVisible',
  UpdateBlockParent = 'updateBlockParent',

  DeleteBlocks = 'deleteBlocks',


  AddLines = 'addLines',
  UpdateLines = 'updateLines',
  DeleteLines = 'deleteLines',
  Composition = 'composition',
}

export type ConnectionActionType = typeof ConnectionAction

type ConnectionActionAddBlocks = {
  type: ConnectionAction.AddBlocks;
  shapes: RawBlockShape[];
}

export type ConnectionActionUpdateBlockGeo = {
  type: ConnectionAction.UpdateBlockGeo;
} & UpdateBlockGeoPayload

export type ConnectionActionUpdateBlockVisible = {
  type: ConnectionAction.UpdateBlockVisible;
} & UpdateBlockVisiblePayload

export type ConnectionActionUpdateBlockParent = {
  type: ConnectionAction.UpdateBlockParent;
} & UpdateBlockParentPayload

export type SingleUpdateBlockAction = ConnectionActionUpdateBlockGeo | ConnectionActionUpdateBlockVisible | ConnectionActionUpdateBlockParent;

type ConnectionActionUpdateBlocks = {
  type: ConnectionAction.UpdateBlocks;
  actions: SingleUpdateBlockAction[]
}



type ConnectionActionDeleteBlocks = {
  type: ConnectionAction.DeleteBlocks;
  ids: string[];
}

type ConnectionActionAddLines = {
  type: ConnectionAction.AddLines;
  shapes: RawLineShape[];
}

type ConnectionActionUpdateLines = {
  type: ConnectionAction.UpdateLines;
  shapes: RawLineShape[];
}

type ConnectionActionDeleteLines = {
  type: ConnectionAction.DeleteLines;
  ids: string[];
}

export type SingleConnectionAction = ConnectionActionAddBlocks | ConnectionActionUpdateBlocks | ConnectionActionDeleteBlocks | ConnectionActionAddLines | ConnectionActionUpdateLines | ConnectionActionDeleteLines;

type ConnectionActionComposition = {
  type: ConnectionAction.Composition;
  actions: SingleConnectionAction[];
}

export type ConnectionMessageType = ConnectionActionComposition | SingleConnectionAction;

export type ConnectionDataType = {
  shapes: Shape[];
  datas: ElementData[];
}

export interface IConnectionService {
  sendMessage(message: ConnectionMessageType): void;

  $messageSubject: Subject<ConnectionDataType>;
}