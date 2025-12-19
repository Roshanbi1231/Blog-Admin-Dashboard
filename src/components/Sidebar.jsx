import { useNavigate } from "react-router-dom";

const Sidebar = ({ isDirty }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave this page?"
      );
      if (!confirmLeave) return;
    }
    navigate(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 dark:bg-slate-950 text-white">
      <div className="h-16 flex items-center justify-center border-b border-slate-700 dark:border-slate-800">
        <h1 className="text-xl font-bold">Blog Admin</h1>
      </div>

      <nav className="p-4 space-y-2">
        <button
          onClick={() => handleNavigation("/")}
          className="w-full text-left px-4 py-2 rounded hover:bg-slate-800 dark:hover:bg-slate-700"
        >
          Dashboard
        </button>

        <button
          onClick={() => handleNavigation("/blogs")}
          className="w-full text-left px-4 py-2 rounded hover:bg-slate-800 dark:hover:bg-slate-700"
        >
          Blogs
        </button>

        <button
          onClick={() => handleNavigation("/categories")}
          className="w-full text-left px-4 py-2 rounded hover:bg-slate-800 dark:hover:bg-slate-700"
        >
          Categories
        </button>

        <button
          onClick={() => handleNavigation("/users")}
          className="w-full text-left px-4 py-2 rounded hover:bg-slate-800 dark:hover:bg-slate-700"
        >
          Users
        </button>

        <button
          onClick={() => handleNavigation("/settings")}
          className="w-full text-left px-4 py-2 rounded hover:bg-slate-800 dark:hover:bg-slate-700"
        >
          Settings
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
