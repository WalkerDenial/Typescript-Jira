import { useHttp } from "utils/http";
import { Project } from "screens/project-list/list";
import { useAsync } from "utils/use-async";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
