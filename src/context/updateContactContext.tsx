"use client";

import { useState, createContext } from "react";

interface ContactProviderProps {
  children: React.ReactNode;
}

interface DataContactProps {
  first_name: string;
  last_name: string;
  phones: {
    number?: string;
    id?: number;
  }[];
}

const defaultValueContext: DataContactProps = {
  first_name: "",
  last_name: "",
  phones: [{}],
};

export const ContactContext = createContext({
  dataContact: defaultValueContext,
  handleDataContact: (value: DataContactProps) => {
    value;
  },
});

export default function ContactProvider({ children }: ContactProviderProps) {
  let [dataContact, setDataContact] =
    useState<DataContactProps>(defaultValueContext);

  const handleDataContact = (value: DataContactProps) => {
    setDataContact(value);
  };

  return (
    <ContactContext.Provider value={{ dataContact, handleDataContact }}>
      {children}
    </ContactContext.Provider>
  );
}
