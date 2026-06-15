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
  },
  blog: {
    create: "/blog/create",
    read: "/blog/getAll",
    specificBlog: "/blog/get/",
  },
  cloudinary: {
    upload: "/cloudinary/upload",
  },
  services: {
    getAll: "/service/getAll",
    create: "/service/create",
  },
  skills: {
    get: "/sq/getAll",
    create: "/sq/create",
  },
};
