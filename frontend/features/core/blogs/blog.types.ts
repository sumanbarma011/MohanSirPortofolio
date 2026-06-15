export type CloudinaryImage = {
  url: string;
  cloudinaryId: string;
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  images: CloudinaryImage[];
  Slug: string;
  createdAt: string;
  updatedAt: string;
};
