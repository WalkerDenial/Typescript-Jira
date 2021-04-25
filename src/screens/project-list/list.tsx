import { Table } from "antd";
import dayjs from "dayjs";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps {
  users: User[];
  list: Project[];
}

export const List = ({ users, list }: ListProps) => {
  return (
    <Table pagination={false} columns={[{
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      align: "center"
    },
    {
      title: '部门',
      dataIndex: 'organization',
      align: "center"
    },
    {
      title: '负责人',
      align: "center",
      render(project) {
        return <span>
          {users.find((user) => user.id === project.personId)?.name || '未知'}
        </span>
      }
    },
    {
      title: '创建时间',
      align: "center",
      render(project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      }
    }]} dataSource={list} />
  );
};
