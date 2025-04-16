# Prisma Multi-Environment Workflow

Este proyecto utiliza Prisma para manejar migraciones de base de datos a través de múltiples entornos (local, QA, producción).

## Estructura de Entornos y Ramas

- **Local (Docker)**: Entorno de desarrollo local usando PostgreSQL en Docker
  - Rama: `dev`
- **QA**: Entorno de pruebas
  - Rama: `qa`
- **Producción**: Entorno de producción
  - Rama: `main`

## Archivos de Configuración

- `.env`: Variables de entorno para desarrollo local
- `.env.qa`: Variables de entorno para QA
- `.env.prod`: Variables de entorno para producción

## Workflow de Migraciones y Git

### 1. Desarrollo Local (Docker) - Rama `dev`

```bash
# Asegurarse de estar en la rama dev
git checkout dev

# Iniciar la base de datos local
pnpm docker:up

# Crear una nueva migración
pnpm migrate <nombre_migracion>

# Generar el cliente de Prisma
pnpm generate

# Visualizar la base de datos
pnpm studio

# Commit de los cambios
git add .
git commit -m "feat: add migration <nombre_migracion>"
git push origin dev
```

Las migraciones se crean y prueban primero en el entorno local usando Docker.

### 2. Despliegue a QA - Rama `qa`

```bash
# Desde la rama dev, mergear a qa
git checkout qa
git merge dev

# Aplicar migraciones en QA
pnpm migrate:qa

# Visualizar base de datos QA
pnpm studio

# Si todo está correcto, commit y push
git push origin qa
```

### 3. Despliegue a Producción - Rama `main`

```bash
# Desde la rama qa, mergear a main
git checkout main
git merge qa

# Aplicar migraciones en producción
pnpm migrate:prod

# Si todo está correcto, commit y push
git push origin main
```

## Flujo de Trabajo Completo

1. **Desarrollo (rama `dev`)**
   - Crear nueva migración en local
   - Probar cambios
   - Commit de cambios
   - Push a `dev`

2. **QA (rama `qa`)**
   - Mergear `dev` → `qa`
   - Verificar cambios
   - Aplicar migración en QA
   - Probar exhaustivamente
   - Push a `qa`

3. **Producción (rama `main`)**
   - Mergear `qa` → `main`
   - Verificar cambios
   - Aplicar migración en producción
   - Push a `main`

## Comandos Disponibles

```bash
# Docker
pnpm docker:up        # Inicia contenedores Docker
pnpm docker:down      # Detiene contenedores Docker

# Desarrollo
pnpm dev             # Inicia el servidor de desarrollo con Turbopack
pnpm migrate         # Crea nueva migración en local (requiere nombre)
pnpm studio          # Abre Prisma Studio
pnpm generate        # Genera el cliente de Prisma

# QA
pnpm migrate:qa      # Aplica migraciones en QA usando .env.qa

# Producción
pnpm migrate:prod    # Aplica migraciones en producción usando .env.prod

# Otros
pnpm build          # Construye la aplicación
pnpm start          # Inicia la aplicación en producción
pnpm lint           # Ejecuta el linter
```

## Mejores Prácticas

1. **Siempre crear y probar migraciones localmente primero**
   - Trabajar en rama `dev`
   - Usar el entorno Docker local para desarrollo
   - Verificar que las migraciones funcionan como se espera
   - Generar el cliente de Prisma después de cada migración con `pnpm generate`

2. **Probar exhaustivamente en QA**
   - Asegurar que `dev` está mergeado en `qa`
   - Aplicar migraciones en QA
   - Verificar que los datos existentes no se vean afectados
   - Probar la funcionalidad relacionada
   - NO crear nuevas migraciones en `qa`

3. **Despliegue a producción**
   - Asegurar que `qa` está mergeado en `main`
   - Programar ventanas de mantenimiento para migraciones importantes
   - Tener un plan de rollback
   - Hacer backup de la base de datos antes de migrar
   - NO crear nuevas migraciones en `main`

4. **Monitoreo**
   - Verificar logs después de cada migración
   - Confirmar que la aplicación funciona correctamente
   - Monitorear el rendimiento de la base de datos

## Resolución de Problemas

Si una migración falla:

1. **En desarrollo local (rama `dev`):**
   - Revisar los logs de error
   - Modificar la migración según sea necesario
   - Usar `prisma migrate reset` si es necesario
   - Regenerar el cliente de Prisma con `pnpm generate`
   - Hacer nuevo commit con los cambios

2. **En QA (rama `qa`):**
   - Revisar los logs de error
   - Verificar que la migración funcionó en local
   - Considerar diferencias en los datos entre entornos
   - Si es necesario, volver a `dev` para correcciones

3. **En producción (rama `main`):**
   - NO usar `migrate reset`
   - Implementar el plan de rollback si es necesario
   - Si es necesario, volver a `qa` para correcciones 