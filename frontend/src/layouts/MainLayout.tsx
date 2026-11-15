import { NavLink,Outlet } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/courses", label: "Courses" }
];

export default function MainLayout() {
  return (
     <div className="min-h-screen bg-slate-100">
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-8 py-5">
          <NavLink to="/" className="text-2xl font-bold text-slate-800">
            EasyLearning
          </NavLink>

          <nav>
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
          </nav>
        </div>
      </header>
        <main className="max-w-7xl mx-auto p-8">
                <Outlet />
            </main>
    </div>
  );
}