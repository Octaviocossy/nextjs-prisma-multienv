# Configuración Multi-Env Next.js con Prisma

App Next.js con Prisma, que incluye soporte para múltiples entornos (desarrollo, QA y producción) e integración con Docker.

## 🚀 Características

- Next.js 15 con App Router
- Prisma ORM con PostgreSQL
- Configuración multi-env
- Soporte para Docker
- TypeScript
- TailwindCSS
- ESLint & Prettier
- Turbopack

## 📋 Prerrequisitos

- Node.js (Última versión LTS)
- pnpm
- Docker y Docker Compose
- PostgreSQL (si se ejecuta localmente sin Docker)

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd nextjs-prisma-multienv
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus credenciales de base de datos y otra configuración.

## 🔧 Desarrollo

Iniciar el servidor de desarrollo:
```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

### Gestión de Base de Datos

Iniciar contenedores Docker:
```bash
pnpm docker:up
```

Ejecutar migraciones de base de datos:
```bash
# Desarrollo
pnpm migrate

# QA
pnpm migrate:qa

# Producción
pnpm migrate:prod
```

Acceder a Prisma Studio:
```bash
# Desarrollo
pnpm studio

# QA
pnpm studio:qa

# Producción
pnpm studio:prod
```

## 🏗️ Estructura del Proyecto

```
├── src/
│   └── app/              # Directorio de la aplicación Next.js
├── prisma/
│   ├── migrations/       # Migraciones de base de datos
│   └── schema.prisma     # Esquema de base de datos
├── public/              # Activos estáticos
├── docs/               # Documentación
└── docker-compose.yaml # Configuración de Docker
```

## 🔐 Configuración de Entornos

El proyecto soporta múltiples entornos:

- `.env` - Entorno de desarrollo
- `.env.qa` - Entorno de QA
- `.env.prod` - Entorno de producción

Cada archivo de entorno debe contener:
```
DATABASE_URL=
DIRECT_URL=
```

## 🧪 Esquema de Base de Datos

El proyecto incluye un modelo básico de Usuario con autenticación basada en roles:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

## 📝 Scripts Disponibles

- `pnpm dev` - Iniciar servidor de desarrollo
- `pnpm build` - Construir para producción
- `pnpm start` - Iniciar servidor de producción
- `pnpm lint` - Ejecutar ESLint
- `pnpm migrate` - Ejecutar migraciones de base de datos
- `pnpm studio` - Abrir Prisma Studio
- `pnpm docker:up` - Iniciar contenedores Docker
- `pnpm docker:down` - Detener contenedores Docker

## 🤝 Contribución

1. Crear una rama para la característica
2. Realizar los cambios
3. Subir los cambios a la rama
4. Crear un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT.
