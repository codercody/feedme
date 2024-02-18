"use client";

import Link from "next/link";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiHome } from "react-icons/hi2";

import "@farcaster/auth-kit/styles.css";
import { SignInButton } from "@farcaster/auth-kit";

export default function () {
  return (
    <Sidebar
      aria-label="Sidebar with logo branding example"
      className="sm:fixed w-full sm:w-64 h-auto sm:h-full"
    >
      <div className="mb-4 text-2xl font-bold mx-2">feedme</div>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} href="/" icon={HiHome}>
            Home
          </Sidebar.Item>
          <Sidebar.Item as={Link} href="/analytics" icon={HiChartPie}>
            Analytics
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <div className="mt-4 w-full flex sm:absolute sm:bottom-4 sm:left-0">
        <div className="sm:mx-auto">
          <SignInButton />
        </div>
      </div>
    </Sidebar>
  );
}
