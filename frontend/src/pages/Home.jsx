import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpIcon,
  Bot,
  Check,
  ChevronDown,
  ImagePlus,
  LogOut,
  Plus,
  Settings,
  Settings2,
  UserRound,
  Workflow,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "@/features/auth";
import { setUserData } from "@/redux/userSlice";
import { Textarea } from "@/components/ui/textarea";
import { setSelectedAgent } from "@/redux/agentSlice";
import { chat } from "@/features/chat";

function Home() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  // const [messages, setMessages] = useState([
  //   {
  //     role: "user",
  //     content: "Hello. I am sujan ",
  //   },
  //   {
  //     role: "assistant",
  //     content: "Hi. How can i help you ?",
  //   },
  // ]);

  const [messages, setMessages] = useState([]);

  const { userData } = useSelector((state) => state.user);
  const { agents, selectedAgent } = useSelector((state) => state.agent);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logout();
    dispatch(setUserData(null));
    setLogoutLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = message.trim();

    if (!userMessage) return;

    // Display user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");

    try {
      // Call API
      const res = await chat(userMessage);

      console.log("Chat response:", res);

      // Display AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res?.aiResponse || "No AI response received",
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#2b2f3a_0%,#191b21_55%,#121317_100%)] text-white">
      {/* Background overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Header */}
        <header className="z-30 flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-sm font-medium tracking-tight">
              Automate AI
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                <Workflow />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48 bg-[#252832] text-white">
                <DropdownMenuItem>
                  <Link className="flex justify-between gap-4" to={"/agents"}>
                    My Agents
                    <Bot />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="flex justify-between gap-4"
                    to={"/agents/new"}
                  >
                    Create New Agent Properly
                    <Plus />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="flex justify-between gap-4"
                    to={"/integration"}
                  >
                    Integration
                    <Settings2 />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2.5">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {userData ? (
                  <img
                    src={userData?.profilePicture}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 size-full object-cover"
                  />
                ) : (
                  <UserRound />
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48 bg-[#252832] text-white">
                <div className="flex items-center gap-3 px-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {userData?.name || "user"}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                      {userData?.email || "email"}
                    </p>
                  </div>
                </div>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  {logoutLoading ? (
                    "Logging out..."
                  ) : (
                    <>
                      <LogOut />
                      Logout
                    </>
                  )}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col ">
          <section className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto ">
              <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-5 px-4 py-8 sm:px-6">
                {messages?.length === 0 && (
                  <div className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
                    <div className="mb-7 grid size-14 place-items-center rounded-2xl bg-white text-zinc-900">
                      <Workflow size={26} />
                    </div>
                    <p className="text-base text-violet-300/80">
                      Hi,{userData?.name || "user"}
                    </p>

                    <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                      Can i help you with anything?
                    </h1>
                    <p className="mt-4 max-w-sm text-xs leading-5 text-zinc-500">
                      Ask questions, automate tasks or upload an image to
                      prepare an Instagram post.
                    </p>
                  </div>
                )}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "User" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="mr-3 mt-1 grid size-8 shrink-0 place-items-center rounded-lg bg-white text-zinc-900">
                        <Workflow size={15} />
                      </div>
                    )}

                    <div
                      className={`max-w-[90%]  px-4 py-3 text-sm leading-7 sm:max-w-[85%] ${
                        message.role === "user"
                          ? "rounded-2xl rounded-br-md bg-white text-zinc-900"
                          : `rounded-2xl rounded-bl-md  text-zinc-200`
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="z-20 w-full shrink-0 px-3 pb-3 pt-2 sm:pb-4">
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-full max-w-2xl flex-col rounded-2xl border border-white/10 bg-[#252832] p-3 transition-colors focus-within:border-white/25"
              >
                {/* Textarea */}
                <Textarea
                  placeholder="Ask me anything..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className="min-h-20 w-full resize-none border-0 bg-transparent px-2 py-1.5 text-sm text-white shadow-none placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                {/* Bottom toolbar */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  {/* Left side - Image upload */}
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      title="Attach Image"
                      className="size-9 shrink-0 rounded-lg text-zinc-300 hover:bg-white/10 hover:text-white"
                    >
                      <ImagePlus size={18} />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          varient="ghost"
                          className="h-8 max-w-48 gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-2.5 text-xs text-zinc-300 hover:bg-white/10"
                        >
                          <Bot />
                          <span>{selectedAgent || "Agent Not Selected"}</span>
                          <ChevronDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        side="top"
                        className={`mb-2 w-60 `}
                      >
                        {(!agents || agents.length === 0) && (
                          <DropdownMenuItem disabled>
                            No agent found
                          </DropdownMenuItem>
                        )}

                        {agents?.map((agent, index) => (
                          <DropdownMenuItem
                            key={index}
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(setSelectedAgent(agent.name));
                            }}
                            className="cursor-pointer gap-2 "
                          >
                            <Bot
                              size={15}
                              className="shrink-0 text-violet-300"
                            />
                            <span className="truncate">{agent?.name}</span>

                            {selectedAgent === agent?.name && (
                              <Check className="ml-auto text-xs text-violet-300" />
                            )}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem asChild>
                          <Link
                            to="/agents/new"
                            className="flex items-center gap-2"
                          >
                            <Plus size="15" />
                            Create New Agent
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      size="icon"
                      aria-label="Send Message"
                      className="size-8 shrink-0 disabled:bg-white/10 disabled:text-zinc-500"
                    >
                      <ArrowUpIcon size="16" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;
