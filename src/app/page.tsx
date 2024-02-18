"use client";

import { Select, Label, Tabs } from "flowbite-react";

function Header() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Feed</h1>
    </div>
  );
}

function Panel({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <div className="flex-1 p-4">
      <div className="mb-4 inline-flex">
        <div className="my-auto mr-2">
          <Label htmlFor={`${id}_recommender`} value="Recommender:" />
        </div>
        <div className="my-auto">
          <Select id={`${id}_recommender`} required>
            <option>A</option>
            <option>B</option>
          </Select>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex-1 px-2">
      <Header />
      <div className="sm:flex">
        <Panel id="left">
          <p>&hi&</p>
        </Panel>
        <Panel id="right">
          <p>&hi&</p>
        </Panel>
      </div>
    </div>
  );
}
