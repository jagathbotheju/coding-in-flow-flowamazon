"use client";
import ToastProvider from "./ToastProvider";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ToastProvider>
      <SessionProvider>{children}</SessionProvider>
    </ToastProvider>
  );
};

export default Providers;
