"use client";
import { Form } from "antd";
import { useState } from "react";
import { StyledContainer, StyledInputSearch, StyledSelect } from "./styled";

type CategoryType = "name" | "phone";
interface ContactFilter {
  onSearch: ({
    value,
    category,
  }: {
    value: string;
    category: CategoryType;
  }) => void;
  defVal: {
    keyword: string | null;
    category: string | null;
  };
}

export default function ContactFilter(props: ContactFilter) {
  //#region HOOKS
  const [form] = Form.useForm();
  const [category, setCategory] = useState<CategoryType>("name");
  const options = [
    { value: "name", label: "Name" },
    { value: "phone", label: "Phone" },
  ];
  //#endregion HOOKS

  return (
    <Form form={form}>
      <StyledContainer>
        <Form.Item
          name="category"
          initialValue={props.defVal.category || "name"}
          style={{ width: "8em" }}
        >
          <StyledSelect
            options={options}
            onChange={(value: any) => {
              setCategory(value);
              form.setFieldValue("input", "");
            }}
            className="select"
          />
        </Form.Item>
        <Form.Item
          name="input"
          style={{ width: "100%" }}
          initialValue={props.defVal.keyword || ""}
        >
          <StyledInputSearch
            className="input"
            placeholder={
              category === "name" ? "Search by name" : "Search by phone"
            }
            onSearch={(value) =>
              props.onSearch({ value: value.trim(), category })
            }
            // allowClear
          />
        </Form.Item>
      </StyledContainer>
    </Form>
  );
}
