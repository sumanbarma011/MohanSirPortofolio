export const ApiPath = {
  contact: {
    create: "/contact/create",
    read: "/contact/getAll",
  },
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
    refresh: "/auth/refresh-token",
    update: "/auth/update",
    changePassword: "/auth/change-password",
  },
  blog: {
    create: "/blog/create",
    read: "/blog/getAll",
    specificBlog: "/blog/get/",
    delete: "/blog/delete/",
    update: "/blog/updateBlogs/",
  },
  cloudinary: {
    upload: "/cloudinary/upload",
  },
  services: {
    getAll: "/service/getAll",
    create: "/service/create",
    delete: "/service/delete/",
  },
  skills: {
    get: "/sq/getAll",
    create: "/sq/create",
    delete: "/sq/delete/",
  },
  company: {
    create: "/company/create",
    getAll: "/company/getAll",
    delete: "/company/delete/",
  },
};
