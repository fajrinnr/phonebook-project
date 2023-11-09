"use client";
import { Select, Input, Space, Form } from "antd";
import { useState } from "react";
import { StyledContainer } from "./styled";
import { SearchOutlined } from "@ant-design/icons";

type CategoryType = "name" | "phone";
interface ContactFilter {
  onSearch: ({ value, category }: { value: string; category: string }) => void;
}

export default function ContactFilter(props: ContactFilter) {
  const [form] = Form.useForm();
  const [category, setCategory] = useState<CategoryType>("name");
  const options = [
    { value: "name", label: "Name" },
    { value: "phone", label: "Phone" },
  ];
  return (
    <Form form={form}>
      <StyledContainer>
        <Form.Item name="category" initialValue="name" style={{ width: "8em" }}>
          <Select
            options={options}
            onChange={(value: CategoryType) => {
              setCategory(value);
              form.resetFields(["input"]);
            }}
            className="select"
          />
        </Form.Item>
        <Form.Item name="input" style={{ width: "100%" }}>
          <Input.Search
            className="input"
            placeholder={
              category === "name" ? "Search by name" : "Search by phone"
            }
            onSearch={(value) => props.onSearch({ value, category })}
          />
        </Form.Item>
      </StyledContainer>
    </Form>
  );
}
