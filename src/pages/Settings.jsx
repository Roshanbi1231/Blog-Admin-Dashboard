import { useEffect, useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);

  // Load settings
  useEffect(() => {
    const dark = localStorage.getItem("darkMode") === "true";
    const notify = localStorage.getItem("notifications") === "true";

    setDarkMode(dark);
    setNotifications(notify);

    if (dark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const value = !darkMode;
    setDarkMode(value);
    localStorage.setItem("darkMode", value);

    if (value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleNotifications = () => {
    const value = !notifications;
    setNotifications(value);
    localStorage.setItem("notifications", value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Settings
      </h1>

      <div className="bg-white dark:bg-slate-800 p-4 rounded shadow space-y-4">
        <div className="flex justify-between items-center">
          <span className="dark:text-white">Enable Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="dark:text-white">Enable Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
