**Sitio de Reclutamiento** es una plataforma web integral diseñada para gestionar procesos de selección, postulaciones y administración de usuarios dentro de empresas. Permite crear puestos, invitar empleados, registrar usuarios y administrar roles desde interfaces web modernas.

---

## Tecnologías utilizadas

- **JavaScript (Node.js)**: Backend y lógica de negocio.
- **Express.js**: Framework para la API y manejo de rutas.
- **HTML / CSS / JS**: Estructura, estilos e interactividad del frontend.
- **Bases de datos**: Manejo de información de usuarios, empleos y postulaciones.
- **Arquitectura modular**: Separación de API, modelos, rutas, templates y archivos públicos.

---

## Características principales

- Registro de usuarios y empresas.
- Creación y gestión de puestos de trabajo.
- Aplicación a puestos mediante formularios.
- Administración de empleados y candidatos.
- Panel de administración con vistas diferenciadas para:
  - Administrador
  - Gestión (Management)
  - Reclutador
  - Usuario final
- Servicios para cambiar contraseñas, gestionar imágenes y mantener seguridad.
- Funcionalidad completa para manejar postulaciones y procesos de selección.

---

## Estructura del proyecto


recruitment-platform/
│
├── api/
│ ├── models/ # Modelos de datos (Aplicar, CrearPuesto, Usuarios, Empleados)
│ └── routes/ # Rutas para la API
│
├── public/
│ ├── css/ # Estilos
│ ├── js/ # Scripts y controladores
│ └── services/ # Funciones para servidor, contraseñas, imágenes, etc.
│
├── templates/
│ ├── admin/ # Panel de administrador
│ ├── management/ # Panel de gestión
│ ├── recruiter/ # Panel de reclutador
│ └── user/ # Panel de usuario final
│
├── package.json # Dependencias y scripts del proyecto
└── index.js # Punto de entrada de la aplicación


---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/recruitment-platform.git

Instalar dependencias:

npm install

Configurar variables de entorno (base de datos, credenciales, etc.).

Ejecutar el servidor:

npm start

Acceder a la plataforma en http://localhost:3000 (por defecto).


Autor: Jefferson Gómez
