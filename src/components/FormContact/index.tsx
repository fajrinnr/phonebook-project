"use client";
import { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { StyledAddConContainer } from "./styled";

interface FormContactProps {
  onFinish: (value: {
    disabled: boolean;
    values: {
      first_name: string;
      last_name: string;
      phones: string[];
    };
    form: FormInstance<any>;
  }) => void;
}

export default function FormContact(props: FormContactProps) {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  return (
    <Form
      form={form}
      name="dynamic_form_item"
      onFinish={(values) => {
        props.onFinish({ disabled: submittable, values, form });
      }}
    >
      <StyledAddConContainer>
        <Button
          type="link"
          onClick={() => console.log("asd")}
          style={{ padding: 0, fontSize: "20px", fontWeight: "600" }}
        >
          Cancel
        </Button>
        <h1 style={{ fontSize: "28px" }}>Add Contact</h1>
        <Button
          type="link"
          htmlType="submit"
          disabled={!submittable}
          style={{ padding: 0, fontSize: "20px", fontWeight: "600" }}
        >
          Save
        </Button>
      </StyledAddConContainer>
      <Form.Item
        name="first_name"
        label="First Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="last_name"
        label="Last Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.List name="phones" initialValue={[""]}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? "Phones" : ""}
                required
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: `${
                        index >= 1
                          ? "Please input phone number or delete this field."
                          : "Please input phone number."
                      }`,
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Input phone number"
                    style={{ width: "90%" }}
                  />
                </Form.Item>
                {index >= 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "90%" }}
                icon={<PlusOutlined />}
              >
                Add phone number
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}
