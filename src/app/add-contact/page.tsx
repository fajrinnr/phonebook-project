"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormContact from "@/components/FormContact";
import Navbar from "@/components/Navbar/addContact";
import { FormInstance } from "antd";

export default function AddContact() {
  return <FormContact />;
}
