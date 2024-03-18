"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiHome } from "react-icons/hi2";

import "@farcaster/auth-kit/styles.css";
import { SignInButton } from "@farcaster/auth-kit";

import { Label, Select } from "flowbite-react";

import { useAB } from "@/lib/contexts/ab";

export default function () {
  const pathname = usePathname();

  const { recommenders, a, setA, b, setB } = useAB();

  return (
    <Sidebar className="sm:fixed w-full sm:w-64 h-auto sm:h-full">
      <div className="mb-4 text-2xl font-bold mx-2">feedme</div>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            href="/"
            icon={HiHome}
            active={pathname === "/"}
          >
            Home
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            href="/analytics"
            icon={HiChartPie}
            active={pathname === "/analytics"}
          >
            Analytics
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <div className="w-md mt-2">
        <div className="block">
          <Label htmlFor="a" value="First recommender" />
        </div>
        <Select
          id="a"
          required
          onChange={(e) => setA(e.target.value)}
          value={a.id}
        >
          {recommenders.map((recommender, index) => (
            <option key={index} value={recommender.id}>
              {recommender.name}
            </option>
          ))}
        </Select>
        <div className="block mt-2">
          <Label htmlFor="b" value="Second recommender" />
        </div>
        <Select
          id="b"
          required
          onChange={(e) => setB(e.target.value)}
          value={b.id}
        >
          {recommenders.map((recommender, index) => (
            <option key={index} value={recommender.id}>
              {recommender.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="mt-4 w-full flex sm:absolute sm:bottom-4 sm:left-0">
        <div className="sm:mx-auto">
          <SignInButton />
        </div>
      </div>
    </Sidebar>
  );
}
