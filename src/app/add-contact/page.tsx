"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormContact from "@/components/FormContact";
import Navbar from "@/components/Navbar/addContact";
import { FormInstance } from "antd";

export default function AddContact() {
  const router = useRouter();
  const [disabledSave, setDisabledSave] = useState(true);
  const [form, setForm] = useState<FormInstance<any>>();
  return (
    <FormContact
      onFinish={(res) => {
        console.log(res.disabled, res.values);
        setDisabledSave(res.disabled);
        setForm(res.form);
      }}
    />
  );
}
