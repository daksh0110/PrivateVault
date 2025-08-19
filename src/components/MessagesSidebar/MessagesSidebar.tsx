import { useMemo, useState } from "react";

type Message = {
  id: string;
  title: string;
  snippet: string;
  time: string;
  unread?: boolean;
  pinned?: boolean;
  label?: "Work" | "Personal" | "Ideas" | "Important";
};

const DUMMY_MESSAGES: Message[] = [
  {
    id: "1",
    title: "API Keys for Vite project",
    snippet: "Remember to rotate the keys and add `.env` to .gitignore…",
    time: "Today",
    unread: true,
    pinned: true,
    label: "Work",
  },
  {
    id: "2",
    title: "Tailwind OKLCH color",
    snippet: "Use `oklch(70.4% 0.191 22.216)` as brand primary…",
    time: "Today",
    label: "Ideas",
  },
  {
    id: "3",
    title: "Router layout idea",
    snippet: "Wrap routes with <MainLayout> and nest Outlet…",
    time: "Yesterday",
    unread: true,
    label: "Important",
  },
  {
    id: "4",
    title: "Bookmarks sync plan",
    snippet: "GitHub repo + pull on second machine…",
    time: "Aug 14",
    label: "Work",
  },
  {
    id: "5",
    title: "UI polish",
    snippet: "Add hover states, focus ring, and empty states…",
    time: "Aug 11",
    label: "Personal",
  },
  {
    id: "6",
    title: "Message grouping",
    snippet: "Pinned on top, unread indicator, search/filter…",
    time: "Aug 09",
  },
];

const labelClasses: Record<NonNullable<Message["label"]>, string> = {
  Work: "bg-blue-50 text-blue-700 ring-blue-200",
  Personal: "bg-purple-50 text-purple-700 ring-purple-200",
  Ideas: "bg-amber-50 text-amber-700 ring-amber-200",
  Important: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function MessagesSidebar({
  onSelect,
}: {
  onSelect?: (msg: Message) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    DUMMY_MESSAGES[0]?.id ?? null
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = DUMMY_MESSAGES.filter(
      (m) =>
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.snippet.toLowerCase().includes(q)
    );
    return filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      if (a.unread && !b.unread) return -1;
      if (!a.unread && b.unread) return 1;
      return 0;
    });
  }, [query]);

  const handleSelect = (m: Message) => {
    setSelectedId(m.id);
    onSelect?.(m);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <div className="mt-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages…"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {list.length !== 0 ? (
          <div className="text-center text-sm text-gray-500 ">
            No Item Found
          </div>
        ) : (
          list.map((m) => {
            const active = m.id === selectedId;
            return (
              <button
                key={m.id}
                onClick={() => handleSelect(m)}
                className={[
                  "w-full text-left rounded-lg p-2 transition",
                  active
                    ? "bg-gray-100 ring-1 ring-gray-200"
                    : "hover:bg-gray-50",
                ].join(" ")}
              >
                <div className="flex items-start gap-2">
                  <div className="pt-2">
                    {m.unread ? (
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                    ) : (
                      <span className="inline-block h-2 w-2 rounded-full bg-transparent border border-gray-300"></span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium text-sm text-gray-900">
                        {m.title}
                      </span>
                      {m.pinned && (
                        <span className="text-[10px] uppercase tracking-wide rounded-md bg-gray-100 px-1.5 py-0.5 text-gray-700 ring-1 ring-gray-200">
                          Pinned
                        </span>
                      )}
                      {m.label && (
                        <span
                          className={[
                            "text-[10px] rounded-md px-1.5 py-0.5 ring-1",
                            labelClasses[m.label],
                          ].join(" ")}
                        >
                          {m.label}
                        </span>
                      )}
                      <span className="ml-auto shrink-0 text-xs text-gray-500">
                        {m.time}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-gray-600 line-clamp-2">
                      {m.snippet}
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="p-3 border-grey-800 text-xs text-gray-500">
        0 message{list.length === 1 ? "" : "s"}
      </div>
    </div>
  );
}
