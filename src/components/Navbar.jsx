const Navbar = () => {
  return (
    <header
      className="
        h-16 
        flex items-center justify-between px-6 
        bg-white dark:bg-slate-800 
        shadow dark:shadow-none
        border-b border-gray-200 dark:border-slate-700
      "
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Admin
        </span>

        <div
          className="
            h-8 w-8 rounded-full 
            bg-slate-300 dark:bg-slate-600 
            text-gray-900 dark:text-gray-100
            flex items-center justify-center
          "
        >
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;
