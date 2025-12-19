import { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";

const ITEMS_PER_PAGE = 5;
const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB

const Blogs = () => {
  const { setIsDirty } = useOutletContext();
  const [blogs, setBlogs] = useState([]);
  const isFirstLoad = useRef(true);

  // form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);


  // hide soft-deleted blogs
  const visibleBlogs = blogs.filter((blog) => !blog.deleted);

  // search + filter
  const filteredBlogs = visibleBlogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? blog.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  // pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  // save to localStorage
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  // reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory]);

  // auto purge (7 days)
  useEffect(() => {
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

    const purgedBlogs = blogs.filter((blog) => {
      if (!blog.deleted) return true;
      return Date.now() - blog.deletedAt < SEVEN_DAYS;
    });

    if (purgedBlogs.length !== blogs.length) {
      setBlogs(purgedBlogs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // edit blog
  const editBlog = (blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setDescription(blog.description);
    setCategory(blog.category);
    setAuthor(blog.author);
    setPublishDate(blog.publishDate);
    setImagePreview(blog.image);
    setError("");
  };

  // image validation + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) {
        setImage(null);
        setImagePreview(null);
        return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Only JPG or PNG images are allowed");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image size must be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setImagePreview(reader.result);
      setIsDirty(true);
    };
    reader.readAsDataURL(file);
  };

  // add blog
  const addBlog = () => {
    if (
      !title ||
      !description ||
      !category ||
      !author ||
      !publishDate ||
      !imagePreview
    ) {
      setError("All fields are required");
      return;
    }

    const newBlog = {
      id: Date.now(),
      title,
      description,
      category,
      author,
      publishDate,
      image: imagePreview,
      status: "Draft",
      createdAt: Date.now(),
      deleted: false,
      deletedAt: null,
    };

    setBlogs([newBlog, ...blogs]);

    resetForm();
    setIsDirty(false);
  };

  // update blog
  const updateBlog = () => {
    if (
      !title ||
      !description ||
      !category ||
      !author ||
      !publishDate ||
      !imagePreview
    ) {
      setError("All fields are required");
      return;
    }

    setBlogs(
      blogs.map((blog) =>
        blog.id === editingBlogId
          ? {
              ...blog,
              title,
              description,
              category,
              author,
              publishDate,
              image: imagePreview,
            }
          : blog
      )
    );

    resetForm();
    setIsDirty(false);
  };

  const resetForm = () => {
    setEditingBlogId(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setAuthor("");
    setPublishDate("");
    setImage(null);
    setImagePreview(null);
    setError("");
    setIsDirty(false);
  };

  const deleteBlog = (id) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id
          ? { ...blog, deleted: true, deletedAt: Date.now() }
          : blog
      )
    );
  };

  const togglePublish = (id) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              status: blog.status === "Published" ? "Draft" : "Published",
            }
          : blog
      )
    );
  };

  // pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex,startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>

      {/* Add / Edit Blog Form */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => {setTitle(e.target.value); setIsDirty(true);}}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Blog Description"
          value={description}
          onChange={(e) => {setDescription(e.target.value); setIsDirty(true);}}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="border p-2 flex-1"
            placeholder="Category"
            value={category}
            onChange={(e) => {setCategory(e.target.value); setIsDirty(true);}}
          />

          <input
            className="border p-2 flex-1"
            placeholder="Author"
            value={author}
            onChange={(e) => {setAuthor(e.target.value); setIsDirty(true);}}
          />

          <input
            type="date"
            className="border p-2"
            value={publishDate}
            onChange={(e) => {setPublishDate(e.target.value); setIsDirty(true);}}
          />
        </div>

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleImageChange}
          />

          <button
            onClick={editingBlogId ? updateBlog : addBlog}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingBlogId ? "Update Blog" : "Add Blog"}
          </button>
        </div>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="h-24 rounded border"
          />
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>


      {/* Search & Filter */}
        <div className="bg-white p-4 rounded shadow mb-4 flex flex-col md:flex-row gap-4">
        <input
            type="text"
            placeholder="Search by title..."
            className="border p-2 flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
            className="border p-2 w-48"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
        >
            <option value="">All Categories</option>
            {[...new Set(blogs.map((b) => b.category))].map((cat) => (
            <option key={cat} value={cat}>
                {cat}
            </option>
            ))}
        </select>
        </div>

      {/* Blog Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Category</th>
              <th className="p-3">Publish Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.map((blog) => (
              <tr key={blog.id} className="border-t">
                <td className="p-3">
                  <img
                    src={blog.image}
                    alt="blog"
                    className="h-12 w-12 rounded object-cover"
                  />
                </td>
                <td className="p-3">{blog.title}</td>
                <td className="p-3">{blog.author}</td>
                <td className="p-3">{blog.category}</td>
                <td className="p-3">{blog.publishDate}</td>
                <td className="p-3">{blog.status}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-purple-600"
                    >
                    View
                  </button>
                  <button
                    onClick={() => editBlog(blog)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => togglePublish(blog.id)}
                    className="text-green-600"
                  >
                    {blog.status === "Published" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {currentBlogs.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    {/* Pagination */}
    {totalPages > 1 && (
    <div className="flex justify-center items-center gap-2 mt-4">
        <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
        >
        Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded ${
            page === p ? "bg-blue-600 text-white" : ""
            }`}
        >
            {p}
        </button>
        ))}

        <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
        >
        Next
        </button>
    </div>
    )}
    {/* View Blog Modal */}

    {selectedBlog && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {selectedBlog.title}
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-2">
            {selectedBlog.description}
        </p>

        <p><strong>Author:</strong> {selectedBlog.author}</p>
        <p><strong>Category:</strong> {selectedBlog.category}</p>
        <p><strong>Publish Date:</strong> {selectedBlog.publishDate}</p>
        <p><strong>Status:</strong> {selectedBlog.status}</p>

        <img
            src={selectedBlog.image}
            alt="blog"
            className="h-32 mt-3 rounded"
        />

        <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setSelectedBlog(null)}
        >
            Close
        </button>
        </div>
    </div>
    )}

    
    </div>
  );
};

export default Blogs;
