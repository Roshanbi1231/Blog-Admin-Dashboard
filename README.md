#  Blog Admin Dashboard

A production-style **Blog Admin Dashboard** built with **React, Vite, and Tailwind CSS**.  
This application allows admins to manage blogs with full **CRUD functionality**, image upload & preview, pagination, search & filters, and unsaved-changes protection.

---

##  Features

###  Blog Management
- Add new blogs
- Edit existing blogs
- Soft delete blogs (auto-purged after 7 days)
- Publish / Unpublish blogs
- View blog details in a modal

###  Image Upload
- Supports **JPG / PNG** images
- File size validation (**max 1MB**)
- Image preview before saving

###  Search & Filter
- Search blogs by title
- Filter blogs by category
- Pagination resets automatically on filter/search change
![image alt](https://github.com/Roshanbi1231/Blog-Admin-Dashboard/blob/master/Screenshot%202025-12-19%20194917.png?raw=true)

###  Pagination
- Configurable items per page (default: 5)
- Previous / Next buttons
- Page number navigation
![image alt](https://raw.githubusercontent.com/Roshanbi1231/Blog-Admin-Dashboard/f9270bbfa28def67b50dedf7eb6a3f26f5c9322b/Screenshot%202025-12-19%20194703.png)

###  Persistence
- Blogs stored in **localStorage**
- Data persists across page refresh

###  Unsaved Changes Protection
- Warns user when navigating away with unsaved form changes
- Works on browser refresh and route change

###  UI
- Responsive layout
- Clean admin-style interface
- Tailwind CSS styling

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** React Hooks
- **Storage:** Browser localStorage

---

## Project Structure



