"use client";
import { useEffect, useState } from "react";
import { Avatar, Button, Form, Input, message } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { StyledAddConContainer, StyledForm } from "./styled";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const mutation = gql`
  mutation insert_contact($objects: [contact_insert_input!]!) {
    insert_contact(objects: $objects) {
      returning {
        first_name
        last_name
      }
    }
  }
`;

export default function FormContact() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [addContact, { loading }] = useMutation(mutation, {
    onCompleted: () => {
      message.success(
        `Successfuly add ${values.first_name} ${values.last_name} to new Contact!`
      );
      router.push("/");
    },
  });
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
    <StyledForm
      form={form}
      name="dynamic_form_item"
      onFinish={(values: any) => {
        addContact({
          variables: {
            objects: {
              first_name: values.first_name,
              last_name: values.last_name,
              phones: {
                data: values.phones,
              },
            },
          },
        });
      }}
    >
      <StyledAddConContainer>
        <Button
          type="link"
          onClick={() => router.back()}
          style={{ padding: 0, fontSize: "17px", fontWeight: "600" }}
        >
          Cancel
        </Button>
        <h1 style={{ fontSize: "20px" }}>Add Contact</h1>
        <Button
          type="link"
          htmlType="submit"
          disabled={!submittable}
          style={{ padding: 0, fontSize: "17px", fontWeight: "600" }}
          loading={loading}
        >
          Save
        </Button>
      </StyledAddConContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          style={{
            backgroundColor: "#f56a00",
            verticalAlign: "middle",
            marginRight: "10px",
            fontSize: "70px",
          }}
          size={150}
        >
          {values && values?.first_name?.[0]?.toUpperCase()}
        </Avatar>
      </div>
      <Form.Item
        name="first_name"
        label="First Name"
        rules={[{ required: true, message: "Please input first name." }]}
      >
        <Input placeholder="Input first name" />
      </Form.Item>
      <Form.Item
        name="last_name"
        label="Last Name"
        rules={[{ required: true, message: "Please input last name." }]}
      >
        <Input placeholder="Input last name" />
      </Form.Item>
      <Form.List name="phones" initialValue={[""]}>
        {(fields, { add, remove }) => (
          <div>
            {fields.map((field, index) => (
              <div key={field.key} style={{ display: "flex" }}>
                {index >= 1 ? (
                  <CloseCircleFilled
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    style={{
                      color: "red",
                      marginRight: "5px",
                      marginBottom: "24px",
                      fontSize: "18px",
                    }}
                  />
                ) : null}
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Phones" : ""}
                  required
                  name={[field.name, "number"]}
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
                  style={{ width: "100%" }}
                >
                  <Input
                    type="number"
                    placeholder={
                      index >= 1
                        ? `Input phone number ${index + 1}`
                        : "Input phone number"
                    }
                  />
                </Form.Item>
              </div>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Phone Number
            </Button>
          </div>
        )}
      </Form.List>
    </StyledForm>
  );
}
