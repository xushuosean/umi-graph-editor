import { Container } from "inversify";
import { IConnectionService } from "./IConnectionService";
import { IMessageService } from "./IMessageService";
import { IProjectService } from "./interfaces";
import { ConnectionStaticService } from "./services/ConnectionStaticService";
import { MessageService } from "./services/MessageService";
import { ProjectService } from "./services/ProjectService";
import { TYPES } from "./types";

const myContainer = new Container();
myContainer.bind<IProjectService>(TYPES.ProjectService).to(ProjectService).inSingletonScope();
// myContainer.bind<IConnectionService>(TYPES.ConnectionService).to(ConnectionService);
myContainer.bind<IConnectionService>(TYPES.ConnectionService).to(ConnectionStaticService).inSingletonScope();
myContainer.bind<IMessageService>(TYPES.MessageService).to(MessageService).inSingletonScope();

export { myContainer };
