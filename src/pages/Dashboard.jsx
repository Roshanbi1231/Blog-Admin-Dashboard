const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Welcome to Blog Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          Total Blogs: 12
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          Published: 8
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          Drafts: 4
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
