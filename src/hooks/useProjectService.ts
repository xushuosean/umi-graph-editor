import { IProjectService } from "@/ioc/IProjectService";
import { myContainer } from "@/ioc/inversify.config";
import { TYPES } from "@/ioc/types";

export function useProjectService() {
  const projectService = myContainer.get<IProjectService>(TYPES.ProjectService);
  return projectService;
}