import { Drawer } from "antd";

export const ProjectModal = (props: { projectModalOPen: boolean }) => {
  return <Drawer visible={props.projectModalOPen} width={"100%"}></Drawer>;
};
