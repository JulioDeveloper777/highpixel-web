"use client";

import { adminRepository } from "@/repositories/admin-repository";
import { useEffect, useState } from "react";

export default function AdminSuggestionsPage() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      const res = await adminRepository.listSuggestions();
      setList(res || []);
    })();
  }, []);

  const handleCreate = async () => {
    if (!name) return;
    const created = await adminRepository.createSuggestion({ name, username });
    setList((prev) => [created, ...prev]);
    setName("");
    setUsername("");
  };

  const handleDelete = async (id: string) => {
    await adminRepository.deleteSuggestion(id);
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Admin — Timeline Suggestions</h1>

      <div className="mb-6 flex gap-2">
        <input
          className="rounded p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="rounded p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
              <div className="font-bold">
                {item.name}{" "}
                {item.username && (
                  <span className="text-sm text-muted-foreground">
                    @{item.username}
                  </span>
                )}
              </div>
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
