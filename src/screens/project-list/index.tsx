import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProject } from "../../utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";
import { Row } from "components/lib";

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProject(
    useDebounce(param, 200)
  );
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        refresh={retry}
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
