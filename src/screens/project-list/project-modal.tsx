import { Button, Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalOPen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOPen}
      width={"100%"}
    >
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
