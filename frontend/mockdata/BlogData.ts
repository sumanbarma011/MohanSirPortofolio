export const BlogData = [
  {
    id: "blog_01j7x8a9b2c3d4e5f6g7h8j9k0",
    authorId: "user_01f8x9a2b3c4d5e6f7g8h9j0k1",
    slug: "mastering-modern-calculators-in-2026",
    title: "Mastering Modern Calculators: Beyond Basic Arithmetic",
    description:
      "Discover how modern calculators are evolving into advanced computing units capable of complex data analysis.",
    content:
      "<p>For decades, the humble calculator has been a staple of classrooms and offices. However, as we move through 2026, these devices are undergoing a massive transformation...</p>",
    images: [
      "https://images.unsplash.com/photo-1648201637025-1c77b9be3013?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FsY3VsYXRvcnxlbnwwfHwwfHx8MA%3D%3D",
    ],
    createdAt: "2026-03-15T08:30:00.000Z",
    updatedAt: "2026-03-15T12:45:12.000Z",
  },
  {
    id: "blog_02k8y9b0c3d4e5f6g7h8j9k0la",
    authorId: "user_01f8x9a2b3c4d5e6f7g8h9j0k1", // Same author as above
    slug: "designing-intuitive-financial-uis",
    title: "Designing Intuitive User Interfaces for Financial Tools",
    description:
      "A deep dive into UX best practices for financial apps, focusing on clarity, data density, and user trust.",
    content:
      "<p>When it comes to managing money, users demand absolute clarity. Designing a user interface for financial applications presents unique challenges...</p>",
    images: [
      "https://images.unsplash.com/photo-1648201637025-1c77b9be3013?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FsY3VsYXRvcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60",
    ],
    createdAt: "2026-04-01T14:20:00.000Z",
    updatedAt: "2026-04-02T09:15:30.000Z",
  },
  {
    id: "blog_03m9z0c1d4e5f6g7h8j9k0lab1",
    authorId: "user_02g9y0b3c4d5e6f7g8h9j0k1l2", // Different author
    slug: "why-physical-hardware-still-matters",
    title: "Why Physical Hardware Still Matters in a Digital World",
    description:
      "Exploring the tactile satisfaction and reliability of physical hardware devices over purely digital software alternatives.",
    content:
      "<p>In an increasingly cloud-based world, physical hardware remains irreplaceable. From mechanical feedback to offline reliability, let's explore why physical keys still dominate...</p>",
    images: [
      "https://images.unsplash.com/photo-1648201637025-1c77b9be3013?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FsY3VsYXRvcnxlbnwwfHwwfHx8MA%3D%3D",
    ],
    createdAt: "2026-05-20T10:00:00.000Z",
    updatedAt: "2026-05-20T10:00:00.000Z",
  },
];

export type BlogType = (typeof BlogData)[number];
