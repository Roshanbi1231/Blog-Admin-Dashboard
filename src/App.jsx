import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

function App() {
  return (
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
  );
}

export default App;
