import { Button, List } from "antd";
import { Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectInUrl } from "screens/kanban/util";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { CreateEpic } from "./create-epic";
import { useEpicSearchParams, useEpicsQueryKey } from "./util";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
          创建任务组
        </Button>
      </Row>
      <List
        dataSource={epics}
        itemLayout={"vertical"}
        style={{ overflow: "scroll" }}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button
                    type={"link"}
                    onClick={() => deleteEpic({ id: epic.id })}
                  >
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={async () => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};
