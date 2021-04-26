import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { User } from "./search-panel";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table pagination={false} rowKey={"id"} columns={[{
      title: '名称',
      sorter: (a, b) => a.name.localeCompare(b.name),
      align: "center",
      render(value, project) {
        return <Link to={String(project.id)}>{project.name}</Link>
      }
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
    }]}
      {...props} />
  );
};
