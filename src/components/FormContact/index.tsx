"use client";
import { useEffect, useState } from "react";
import { Avatar, Button, Form, Input, message } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { StyledAddConContainer, StyledForm } from "./styled";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

interface FormContactProps {
  typeForm: "add" | "update";
  dataContact?: {
    first_name: string;
    last_name: string;
    phones: {
      number: string;
      id?: number;
    }[];
  };
  contactId?: string;
}

interface FormValues {
  first_name: string;
  last_name: string;
  phones: {
    number: string;
  }[];
}

const ADD_CONTACT_MUTATION = gql`
  mutation insert_contact($objects: [contact_insert_input!]!) {
    insert_contact(objects: $objects) {
      returning {
        first_name
        last_name
      }
    }
  }
`;

const UPDATE_CONTACT_MUTATION = gql`
  mutation update_contact($_set: contact_set_input, $where: contact_bool_exp!) {
    update_contact(_set: $_set, where: $where) {
      returning {
        id
      }
    }
  }
`;

export default function FormContact(props: FormContactProps) {
  const { typeForm, dataContact, contactId } = props;
  const [form] = Form.useForm();
  const router = useRouter();
  const [addContact, { loading: loadingAdd }] = useMutation(
    ADD_CONTACT_MUTATION,
    {
      onCompleted: () => {
        message.success(
          `Successfuly add ${values.first_name} ${values.last_name} to new Contact!`
        );
        router.push("/");
      },
    }
  );
  const [updateContact, { loading: loadingUpdate }] = useMutation(
    UPDATE_CONTACT_MUTATION,
    {
      onCompleted: () => {
        message.success(
          `Successfuly add ${values.first_name} ${values.last_name} to new Contact!`
        );
        router.push("/");
      },
    }
  );
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);

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

  const typeFormValue = {
    add: {
      titlePage: "Add Contact",
      buttonSubmit: "Save",
      defValAvatar: values && values?.first_name?.[0]?.toUpperCase(),
      defValFName: null,
      defValLName: null,
      defValPhones: [""],
      disablePhoneNumber: false,
      loadingSubmit: loadingAdd,
      submitAction: (values: FormValues) =>
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
        }),
    },
    update: {
      titlePage: "Edit Contact",
      buttonSubmit: "Update",
      defValAvatar: dataContact?.first_name?.[0],
      defValFName: dataContact?.first_name,
      defValLName: dataContact?.last_name,
      defValPhones: dataContact?.phones.map((data) => data),
      disablePhoneNumber: true,
      loadingSubmit: loadingUpdate,
      submitAction: (values: FormValues) =>
        updateContact({
          variables: {
            _set: {
              first_name: values.first_name,
              last_name: values.last_name,
            },
            where: {
              id: { _eq: Number(contactId) },
            },
          },
        }),
    },
  };

  return (
    <StyledForm
      form={form}
      layout="vertical"
      onFinish={(values: any) => {
        typeFormValue[typeForm].submitAction(values);
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
        <h1 style={{ fontSize: "20px" }}>
          {typeFormValue[typeForm].titlePage}
        </h1>
        <Button
          type="link"
          htmlType="submit"
          disabled={!submittable}
          style={{ padding: 0, fontSize: "17px", fontWeight: "600" }}
          loading={typeFormValue[typeForm].loadingSubmit}
        >
          {typeFormValue[typeForm].buttonSubmit}
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
          {typeFormValue[typeForm].defValAvatar}
        </Avatar>
      </div>
      <Form.Item
        name="first_name"
        label="First Name"
        rules={[{ required: true, message: "Please input first name." }]}
        initialValue={typeFormValue[typeForm].defValFName}
      >
        <Input placeholder="Input first name" size="large" />
      </Form.Item>
      <Form.Item
        name="last_name"
        label="Last Name"
        rules={[{ required: true, message: "Please input last name." }]}
        initialValue={typeFormValue[typeForm].defValLName}
      >
        <Input placeholder="Input last name" size="large" />
      </Form.Item>
      <Form.List
        name="phones"
        initialValue={typeFormValue[typeForm].defValPhones}
      >
        {(fields, { add, remove }) => (
          <div style={{ width: "100%" }}>
            {fields.map((field, index) => (
              <div key={field.key} style={{ display: "flex", width: "100%" }}>
                {index >= 1 && !typeFormValue[typeForm].disablePhoneNumber ? (
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
                    placeholder={
                      index >= 1
                        ? `Input phone number ${index + 1}`
                        : "Input phone number"
                    }
                    size="large"
                    disabled={typeFormValue[typeForm].disablePhoneNumber}
                  />
                </Form.Item>
              </div>
            ))}

            {!typeFormValue[typeForm].disablePhoneNumber && (
              <Button
                type="primary"
                onClick={() => add()}
                block
                size="large"
                style={{ backgroundColor: "#007BFE !important" }}
              >
                + Add Phone Number
              </Button>
            )}
          </div>
        )}
      </Form.List>
    </StyledForm>
  );
}
