"use client";

import { adminRepository } from "@/repositories/admin-repository";
import { useEffect, useState } from "react";

export default function AdminTrendingPage() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    (async () => {
      const res = await adminRepository.listTrending();
      setList(res || []);
    })();
  }, []);

  const handleCreate = async () => {
    if (!name) return;
    const created = await adminRepository.createTrending({ name, subtitle });
    setList((prev) => [created, ...prev]);
    setName("");
    setSubtitle("");
  };

  const handleDelete = async (id: string) => {
    await adminRepository.deleteTrending(id);
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Admin — Trending Channels</h1>

      <div className="mb-6 flex gap-2">
        <input
          className="rounded p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="rounded p-2"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <button
          className="rounded bg-primary px-3 py-2 text-white"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>

      <div className="space-y-3">
        {list.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded border p-3"
          >
            <div>
              <div className="font-bold">{item.name}</div>
              <div className="text-sm text-muted-foreground">
                {item.subtitle}
              </div>
            </div>
            <div>
              <button
                className="mr-2 rounded bg-red-600 px-3 py-1 text-white"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
