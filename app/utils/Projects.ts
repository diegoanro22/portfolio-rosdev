// /utils/projects.ts

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  repoLink: string;
  demoLink?: string;
  imgUrl: string;
}

export const proyectos: Project[] = [
  {
    id: 1,
    title: "EasyStore",
    description: `Soy el desarrollador frontend de EasyStore, una plataforma que empodera a emprendedores y pequeñas empresas 
    para construir y hacer crecer su presencia en línea sin complicaciones. EasyStore ofrece herramientas intuitivas, 
    diseños adaptativos e infraestructura confiable para que cualquier usuario 
    pueda tener una tienda en línea completa. Nuestro equipo de ingenieros trabaja con pasión para transformar problemas 
    complejos en soluciones simples y accesibles. Creemos que la clave para un gran negocio es la simplicidad y, por ello, 
    EasyStore está diseñado para hacer que el comercio electrónico sea fácil de usar. Mi rol abarca desde la arquitectura de
    componentes React hasta la optimización de la experiencia de usuario con CSS y Tailwind, asegurando que cada página cargue 
    rápido y sea agradable de navegar.`,
    technologies: ["Next.js", "Tailwind CSS","Prisma", "PostgreSQL", "TypeScript", "MongoDB"],
    repoLink: "https://github.com/GerardoFdez7/easystore-services",
    demoLink: "https://easystoredev.vercel.app/es",
    imgUrl: "/easystore.png",
  },
  {
    id: 2,
    title: "E-Commerce de guitarras",
    description:
      "Tienda en línea de guitarras construida con React y Next.js, sin consumir ninguna API externa. Incluye carrito de compras gestionado con useContext, diseño responsivo con Tailwind CSS y flujo de compra completo integrado directamente en el frontend.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Next.js",
      "ESLint",
      "Husky",
      "Prettier",
    ],
    repoLink: "https://github.com/diegoanro22/guitar-ecommerce",
    demoLink: "https://guitar-ecommerce-delta.vercel.app/",
    imgUrl: "/ecommerce-guitar.png",
  },
  {
    id: 3,
    title: "Mordecai en CSS",
    description:
      "Recreación en CSS puro de Mordecai (de la serie Regular Show). Este proyecto demuestra cómo usar únicamente HTML y CSS para dibujar personajes detallados sin imágenes externas ni bibliotecas gráficas.",
    technologies: ["HTML", "CSS"],
    repoLink: "https://github.com/diegoanro22/Lab4_CSS",
    demoLink: "https://www.awita.site/usuarios/ros23258/lab4/",
    imgUrl: "/mordecai.png",
  },
];
