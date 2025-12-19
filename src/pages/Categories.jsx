import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      setCategories(["Tech", "Business", "Health"]);
    }
  }, []);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addCategory = () => {
    if (!newCategory.trim()) return;
    if (categories.includes(newCategory.trim())) return;

    setCategories([...categories, newCategory.trim()]);
    setNewCategory("");
  };

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* Add Category */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded shadow mb-4 flex gap-4">
        <input
          className="border border-gray-300 dark:border-slate-600
                     bg-white dark:bg-slate-700
                     text-gray-900 dark:text-gray-100
                     p-2 flex-1 rounded
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={addCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Category List */}
      <div className="bg-white dark:bg-slate-800 rounded shadow">
        <ul>
          {categories.map((cat, index) => (
            <li
              key={index}
              className="border-b border-gray-200 dark:border-slate-700
                         p-3 flex justify-between"
            >
              <span>{cat}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Active
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
