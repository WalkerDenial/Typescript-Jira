import styled from "@emotion/styled";
import { Button, Drawer, Input, Spin, Form } from "antd";
import { ErrorBox } from "components/lib";
import { UserSlect } from "components/user-select";
import { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectsQueryKey } from "./util";

export const ProjectModal = () => {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();
  const title = editingProject ? "编辑项目" : "创建项目";
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(
    useProjectsQueryKey()
  );
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  useEffect(() => {
    editingProject ? form.setFieldsValue(editingProject) : form.resetFields();
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UserSlect defaultOptionName={"负责人"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
