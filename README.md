# EGO Challenge

Aplicación web desarrollada como challenge técnico para visualizar y explorar un catálogo de modelos de vehículos con filtros, ordenamiento y vista detallada.

## Tecnologías Utilizadas

- **React 19** 
- **TypeScript**
- **Vite**
- **React Router DOM** 
- **SASS** 
- **React Spinners** 
- **React Slick**


## Requisitos Previos antes de la instalación

- Node.js (v18 o superior)
- npm o yarn

## Como instalar y levantar el proyecto

1. **Clonar el repositorio**
```bash
git clone https://github.com/AntonellaZacagnino/ego-challenge/
cd EGO-Challenge
```

2. **Instalar dependencias**

Con npm:
```bash
npm install
```

Con yarn:
```bash
yarn install
```

3. **Levantar el proyecto**

Con npm:
```bash
npm run dev
```

Con yarn:
```bash
yarn dev
```

4. **El mismo va a estar corriendo en**
```bash
http://localhost:5173/
```

## Estructura del Proyecto

```
EGO-Challenge/
├── src/
│   ├── components/
│   │   ├── ListModels/     
│   │   ├── Loader/           
│   │   └── Navbar/           
│   ├── pages/
│   │   └── ModelDetails/     
│   ├── services/
│   │   ├── apiClient.ts      
│   │   ├── config.ts         
│   │   ├── models.ts         
│   │   └── detailsModels.ts  
│   ├── styles/
│   │   └── variables.scss    
│   ├── App.tsx               
│   └── main.tsx              
├── public/                   
└── package.json
```

## API

La aplicación consume una API REST con los siguientes endpoints:

- `GET /models/` - Lista todos los modelos
- `GET /models/:id` - Detalle de un modelo específico

---

## 👩Desarrollado por

**Antonella Zacagnino**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/antonella-zacagnino/)
[![GitHub](https://img.shields.io/badge/GitHub-Seguir-black?style=flat&logo=github)](https://github.com/AntonellaZacagnino)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visitar-green?style=flat&logo=google-chrome)](https://azacagnino.netlify.app/)

