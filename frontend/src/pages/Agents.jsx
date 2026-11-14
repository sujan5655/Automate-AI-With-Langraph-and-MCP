import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllAgents } from "@/features/agent";

import { ArrowLeft, Bot, Plus, Search, Trash, Workflow } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";
const darkPanel =
  "border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl";

const whiteBtn =
  "rounded-xl border-0 bg-white text-zinc-900 hover:bg-zinc-200 hover:text-zinc-900";
function Agents() {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchAgents = async () => {
    setLoading(true);
    try {
      const data = await getAllAgents();
      setAgents(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAgents();
  }, []);

  const filteredAgents = agents.filter((agent) => {
    const query = search.toLowerCase();
    return (
      agent?.name.toLowerCase()?.toLowerCase()?.includes(query) ||
      agent?.instructions?.toLowerCase()?.includes(query) ||
      agent?.knowledgeBase?.toLowerCase()?.includes(query)
    );
  });

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#2b2f3a_0%,#191b21_55%,#121317_100%)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]"
      />

      <div className="relative z-10">
        <header className="z-30 flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-white text-zinc-900">
              <Workflow size={17} />
            </span>

            <span className="text-sm font-medium tracking-tight">
              Automate AI
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            <span>Back to Chat</span>
          </Link>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-violet-300/80">
              <Bot size={15} />
              Agent workspace
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              My Agents
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Manage your AI agents and choose one to get started.
            </p>

            <Button className={`h-10 items-center gap-2 ${whiteBtn}`}>
              <Link to="/agents/new" className="inline-flex items-center gap-2">
                <Plus size={17} className="shrink-0" />
                <span>Create Agent</span>
              </Link>
            </Button>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-md">
                  <Search
                    size={17}
                    className="absolute z-20 left-3 top-1/2 -translate-y-1/2 text-zinc-200"
                  />

                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search agents..."
                    className="h-10 rounded-xl border-white/10 bg-white/4 pl-9 text-white backdrop-blur-xl placeholder:text-zinc-500 focus-visible:border-white/25 focus-visible:ring-white/10"
                  />
                </div>
                <p className="text-white">{agents?.length} Agents</p>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-zinc-500">
              <RefreshCw size={22} className="animate-spin text-zinc-300" />
              <p className="text-sm">Loading your agents...</p>
            </div>
          ) : filteredAgents.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAgents.map((agent) => {
                const agentId = agent?._id;

                return (
                  <div
                    key={agentId}
                    className={`group flex min-h-56 flex-col rounded-2xl p-5 transition hover:border-white25 hover:bg-white ${darkPanel}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Bot />
                      </div>
                      <button>
                        <Trash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Agents;
