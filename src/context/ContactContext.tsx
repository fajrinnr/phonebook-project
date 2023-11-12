"use client";

import { useState, createContext } from "react";

interface ContactProviderProps {
  children: React.ReactNode;
}

interface DataContactProps {
  general: {
    first_name: string;
    last_name: string;
    phones: {
      number?: string;
      id?: number;
    }[];
  }[];
  favorites: {
    first_name: string;
    last_name: string;
    phones: {
      number?: string;
      id?: number;
    }[];
  }[];
}

const defaultValueContext: DataContactProps = { favorites: [], general: [] };

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
