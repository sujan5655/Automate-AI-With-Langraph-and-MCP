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
  Bot,
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
function Home() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    setLogoutLoading(true);
    await logout();
    dispatch(setUserData(null));
    setLogoutLoading(false);
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
                    Create New Agent
                    <Plus />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="flex justify-between gap-4"
                    to={"/integrations"}
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
      </div>
    </div>
  );
}

export default Home;
