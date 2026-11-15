import { NavLink, Outlet, useNavigate } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import logo from "../assets/logo.png";
import { logout } from "../api/authApi";
import { clearToken } from "../auth/tokenStorage";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/courses", label: "Courses" }
];

export default function MainLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      // Clears the Google sign-in cookie, which JavaScript can't remove itself
      await logout();
    } catch {
      // Log out locally even if the server can't be reached
    }
    clearToken();
    queryClient.clear();
    navigate("/login", { replace: true });
  };

  return (
     <div className="min-h-screen bg-slate-100">
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-8 py-5">
          <NavLink to="/" className="flex items-center gap-3 text-2xl font-bold text-slate-800">
            EasyLearning
            <img src={logo} alt="" className="h-10 w-auto" />
          </NavLink>

          <nav className="flex items-center gap-4">
            <ul className="flex gap-2">
              {navLinks.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end
                    className={({ isActive }: NavLinkRenderProps) =>
                      `rounded-lg px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>
        <main className="max-w-7xl mx-auto p-8">
                <Outlet />
            </main>
    </div>
  );
}