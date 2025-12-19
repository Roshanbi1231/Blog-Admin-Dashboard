import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const [isDirty, setIsDirty] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">
      <Sidebar isDirty={isDirty}/>

      <div className="ml-64 flex-1">
        <Navbar />

        <main className="p-6 text-gray-900 dark:text-gray-100">
          <Outlet context={{ setIsDirty }}/>
        </main>
      </div>
    </div>
  );
};

export default Layout;
