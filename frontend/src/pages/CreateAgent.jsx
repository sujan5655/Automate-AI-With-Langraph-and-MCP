import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bot, Workflow, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createAgent } from "@/features/agent";

const availableTools = [
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform mathematical calculations",
  },
  {
    id: "web.search",
    name: "Web Search",
    description: "Search for information on the web",
  },
  {
    id: "gmail.read",
    name: "Read Emails",
    description: "Read and summarize email",
  },
  {
    id: "gmail.send",
    name: "Send Email",
    description: "Draft and send emails",
  },
];

function CreateAgent() {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [tools, setTools] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toggleTool = (tool) => {
    setTools((prevTools) =>
      prevTools.includes(tool)
        ? prevTools.filter((t) => t !== tool)
        : [...prevTools, tool],
    );
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log("name", name);
      console.log("instructions", instructions);
      console.log("knowledge base", knowledgeBase);
      console.log("tools", tools);
      const data = await createAgent({
        name,
        instructions,
        knowledgeBase,
        tools,
      });

      console.log("Agent Data:", data);
      setLoading(false);
      navigate("/agents");
    } catch (error) {
      setError(error.response?.data?.message || "Unable to create agent");
      setLoading(false);
      console.log(error);
    }
  };

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

        <main className="mx-auto max-w-3xl px-4 py-12">
          <div className="mb-8">
            <div className="mb-4 grid size-12 place-items-center rounded-xl border border-white/10 bg-white/5">
              <Bot size={24} />
            </div>

            <h1 className="text-2xl font-semibold">Create an agent</h1>

            <p className="mt-2 text-sm text-zinc-400">
              Configure your AI agent and define what it can do
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div>
                <label
                  htmlFor="agent-name"
                  className="mb-2 block text-xs font-medium text-zinc-300"
                >
                  Agent Name
                </label>

                <Input
                  id="agent-name"
                  placeholder="e.g. Research Assistant"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  maxLength={100}
                  required
                  className="h-11"
                />
              </div>

              <div>
                <label
                  htmlFor="instructions"
                  className="mb-2 block text-xs font-medium text-zinc-300"
                >
                  Instructions
                </label>

                <Textarea
                  id="instructions"
                  placeholder="Explain how your agent should behave..."
                  onChange={(e) => setInstructions(e.target.value)}
                  value={instructions}
                  required
                  className="min-h-28 resize-y leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="knowledgeBase"
                  className="mb-2 block text-xs font-medium text-zinc-300"
                >
                  Knowledge Base
                </label>

                <Textarea
                  id="knowledgeBase"
                  onChange={(e) => setKnowledgeBase(e.target.value)}
                  value={knowledgeBase}
                  placeholder="Add information your agent should know..."
                  className="min-h-28 resize-y leading-6"
                />
              </div>
            </section>

            <section>
              <div className="mb-3">
                <h2 className="text-sm font-medium text-zinc-300">Tools</h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Select the capabilities available to your agent
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                {availableTools.map((t) => {
                  const selected = tools.includes(t.id);

                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleTool(t.id);
                      }}
                      aria-pressed={selected}
                      className={`flex w-full items-center justify-between border-b border-white/10 p-4 text-left last:border-b-0 transition-colors ${
                        selected ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                    >
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          {t.name}
                        </h3>

                        <p className="mt-1 text-xs text-zinc-500">
                          {t.description}
                        </p>
                      </div>

                      <span
                        className={`grid size-5 place-items-center rounded-md border ${
                          selected
                            ? "border-white bg-white text-zinc-900"
                            : "border-white/20"
                        }`}
                      >
                        {selected && <Check size={14} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
              >
                <Bot size={17} />
                Create Agent
              </button> */}
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-500/20  px-4 py-3 text-xs text-red-300"
              >
                {error}
              </p>
            )}
            <div>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-xl text-xs text-zinc-400 hover:bg-white/10 hover:text-white"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="h-10 rounded-xl bg-white px-5 text-xs font-medium text-zinc-900 hover:bg-zinc-200"
                >
                  {loading ? "Creating..." : "Create Agent"}
                </Button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default CreateAgent;
