import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "utils";
import { useProjects } from "../../utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from "components/lib";
import { Profiler } from "components/profiler";

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const { open } = useProjectModal();
  return (
    <Profiler id={"项目列表"}>
      <ScreenContainer>
        <Row between={true}>
          <h1>项目列表</h1>
          <ButtonNoPadding onClick={open} type="link">
            创建项目
          </ButtonNoPadding>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        <ErrorBox error={error} />
        <List users={users || []} dataSource={list || []} loading={isLoading} />
      </ScreenContainer>
    </Profiler>
  );
};

ProjectListScreen.whyDidYouRender = false;
