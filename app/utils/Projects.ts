// utils/projects.ts

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  repoLink: string;
  demoLink?: string;
}

export const proyectos: Project[] = [
  {
    title: "Proyecto 1: Lab de DB",
    description:
      "Implementación de CRUD en PostgreSQL con Next.js y Prisma. Incluye vistas y triggers.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    repoLink: "https://github.com/usuario/lab-db",
    demoLink: "https://lab-db.vercel.app",
  },
  {
    title: "Proyecto 2: E-Commerce Guitarras",
    description:
      "Tienda en línea de guitarras con React, API REST y carrito de compras en localStorage.",
    technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    repoLink: "https://github.com/usuario/ecommerce-guitarras",
    demoLink: "https://ecommerce-guitarras.netlify.app",
  },
  {
    title: "Proyecto 3: Blog de Música",
    description:
      "CMS sencillo de blog usando Next.js + MDX. Publica entradas con reseñas de álbumes y posts musicales.",
    technologies: ["Next.js", "MDX", "Tailwind CSS"],
    repoLink: "https://github.com/usuario/blog-musica",
    demoLink: "https://blog-musica.vercel.app",
  },
];
