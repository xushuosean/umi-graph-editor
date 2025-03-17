import { IProjectService } from "@/ioc/interfaces";
import { myContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/types";

export function useProjectService() {
  const projectService = myContainer.get<IProjectService>(TYPES.ProjectService);
  return projectService;
}