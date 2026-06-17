# Implementation Plan: Panel de Administración con Supabase

## Overview

Implementación incremental del panel de administración integrado con Supabase para el portafolio de Luis Porto. Se sigue un enfoque de capas: primero la infraestructura (Supabase, DB, Auth), luego la lógica de negocio (validación, acciones), después la UI del admin, y finalmente la migración del portafolio público para consumir datos desde Supabase.

## Tasks

- [ ] 1. Configurar Supabase y estructura base
  - [ ] 1.1 Instalar dependencias de Supabase y Zod
    - Ejecutar `npm install @supabase/supabase-js @supabase/ssr zod`
    - Crear archivo `.env.local` con variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
    - Agregar `.env.local` al `.gitignore` si no existe
    - _Requisitos: 1.1, 1.2, 1.3_

  - [ ] 1.2 Crear clientes de Supabase (browser, server, middleware)
    - Crear `lib/supabase/client.ts` con `createBrowserClient` usando `@supabase/ssr`
    - Crear `lib/supabase/server.ts` con `createServerClient` que use cookies
    - Crear `lib/supabase/middleware.ts` con `createMiddlewareClient` para el middleware de Next.js
    - Configurar el Server Client para usar `SUPABASE_SERVICE_ROLE_KEY` cuando se requiera bypass de RLS
    - _Requisitos: 1.1, 1.2, 1.3_

  - [ ] 1.3 Actualizar tipos TypeScript para modelos de base de datos
    - Actualizar `lib/types.ts` con las interfaces `DbProject`, `DbService`, `DbTechnology`, `DbExperience`, `DbSiteConfig`
    - Agregar tipos `ProjectFormData`, `ServiceFormData`, `TechnologyFormData`, `ExperienceFormData`, `SiteConfigFormData`
    - Agregar tipos `ActionResult<T>`, `ImageUploadResult`, `ImageFolder`, `ImageMetadata`
    - _Requisitos: 1.1, 3.2, 4.2, 5.2, 6.2, 7.1, 8.2_

- [ ] 2. Esquema de base de datos y migraciones SQL
  - [ ] 2.1 Crear migración SQL para tablas principales
    - Crear archivo `supabase/migrations/001_create_tables.sql`
    - Definir tablas: `projects`, `services`, `technologies`, `experience`, `site_config`
    - Incluir campos `id` (UUID), `created_at`, `updated_at`, `display_order` en todas las tablas
    - Crear función `update_updated_at()` y triggers para cada tabla
    - _Requisitos: 1.1, 3.1, 4.1, 5.1, 6.1, 7.1_

  - [ ] 2.2 Crear migración SQL para políticas RLS y Storage
    - Crear archivo `supabase/migrations/002_rls_and_storage.sql`
    - Habilitar RLS en todas las tablas
    - Crear políticas de lectura pública (SELECT) para todas las tablas
    - Crear políticas de escritura (INSERT, UPDATE, DELETE) solo para usuarios autenticados
    - Crear bucket `portfolio-images` con acceso público de lectura
    - Crear políticas de Storage para escritura/eliminación solo autenticados
    - _Requisitos: 12.1, 12.2, 12.3, 12.4_

  - [ ] 2.3 Crear script de seed con datos iniciales de configuración
    - Crear archivo `supabase/seed.sql` con valores iniciales para `site_config`
    - Insertar claves: `site.name`, `site.title`, `site.description`, `site.url`, `site.ogImage`, `site.email`, `site.whatsappUrl`, `social.github`, `social.linkedin`, `social.whatsapp`
    - _Requisitos: 7.1, 10.1_

- [ ] 3. Autenticación y protección de rutas
  - [ ] 3.1 Crear middleware de autenticación de Next.js
    - Crear `middleware.ts` en la raíz del proyecto
    - Implementar verificación de sesión para rutas `/admin/*` (excepto `/admin/login`)
    - Redirigir usuarios no autenticados a `/admin/login`
    - Permitir paso a usuarios autenticados
    - Refrescar sesión en cada request usando `@supabase/ssr`
    - _Requisitos: 2.2, 2.6, 9.1, 9.2, 9.3_

  - [ ] 3.2 Crear página de login (`app/(admin)/admin/login/page.tsx`)
    - Implementar formulario con campos email y contraseña
    - Usar `signInWithPassword` de Supabase Auth
    - Mostrar mensaje genérico en credenciales inválidas (sin revelar si el email existe)
    - Redirigir a `/admin` tras login exitoso
    - Aplicar tema oscuro consistente con el portafolio
    - _Requisitos: 2.1, 2.3, 2.4, 13.1_

  - [ ] 3.3 Implementar lógica de cierre de sesión
    - Crear Server Action `logout` que destruya la sesión y redirija a `/admin/login`
    - Integrar botón de logout en el layout del admin
    - _Requisitos: 2.5_

- [ ] 4. Checkpoint - Verificar autenticación funcional
  - Ensure all tests pass, ask the user if questions arise.
  - Verificar que el middleware protege rutas correctamente
  - Verificar login/logout funcional

- [ ] 5. Capa de validación con Zod
  - [ ] 5.1 Crear schemas de validación para todas las entidades
    - Crear `lib/validations/projects.ts` con `projectSchema`
    - Crear `lib/validations/services.ts` con `serviceSchema`
    - Crear `lib/validations/technologies.ts` con `technologySchema`
    - Crear `lib/validations/experience.ts` con `experienceSchema`
    - Crear `lib/validations/settings.ts` con `siteConfigSchema`
    - Crear `lib/validations/images.ts` con `imageUploadSchema`
    - Todos los schemas deben incluir mensajes de error en español
    - _Requisitos: 3.8, 4.6, 5.5, 6.5, 7.3, 7.4, 8.1, 8.5_

  - [ ] 5.2 Crear función de sanitización de texto
    - Crear `lib/utils/sanitize.ts` con función `sanitizeText()`
    - Eliminar etiquetas HTML peligrosas (`<script>`, `<iframe>`, `<img onerror=...>`)
    - Escapar atributos de eventos JavaScript
    - Preservar texto plano legible
    - _Requisitos: 12.5_

  - [ ]* 5.3 Escribir property test: datos CRUD válidos pasan validación
    - **Property 1: Datos CRUD válidos pasan validación**
    - **Valida: Requisitos 3.3, 3.5, 4.2, 4.3, 5.2, 5.3, 6.2, 6.3, 7.2**
    - Archivo: `__tests__/properties/crud-validation-valid.test.ts`
    - Generar datos aleatorios válidos con fast-check y verificar que cada schema acepta

  - [ ]* 5.4 Escribir property test: campos requeridos faltantes son rechazados
    - **Property 2: Campos requeridos faltantes son rechazados**
    - **Valida: Requisitos 3.8, 4.6, 5.5, 6.5**
    - Archivo: `__tests__/properties/crud-validation-required.test.ts`
    - Generar datos con campos faltantes/vacíos y verificar rechazo

  - [ ]* 5.5 Escribir property test: formatos inválidos de email y URL son rechazados
    - **Property 3: Formatos inválidos de email y URL son rechazados**
    - **Valida: Requisitos 7.3, 7.4**
    - Archivo: `__tests__/properties/format-validation.test.ts`
    - Generar strings que no cumplan formato email/URL y verificar rechazo

  - [ ]* 5.6 Escribir property test: validación de archivos de imagen
    - **Property 4: Validación de archivos de imagen**
    - **Valida: Requisitos 8.1, 8.5, 12.6**
    - Archivo: `__tests__/properties/image-validation.test.ts`
    - Generar archivos con tamaños y MIME types variados, verificar aceptación/rechazo

  - [ ]* 5.7 Escribir property test: sanitización de texto elimina contenido peligroso
    - **Property 5: Sanitización de texto elimina contenido peligroso**
    - **Valida: Requisitos 12.5**
    - Archivo: `__tests__/properties/text-sanitization.test.ts`
    - Generar strings con etiquetas HTML maliciosas y verificar eliminación

- [ ] 6. Server Actions para operaciones CRUD
  - [ ] 6.1 Implementar Server Actions de proyectos
    - Crear `lib/actions/projects.ts` con acciones: `createProject`, `updateProject`, `deleteProject`
    - Validar con Zod, sanitizar texto, verificar autenticación
    - En eliminación: borrar imagen asociada del Storage si existe
    - Invocar `revalidatePath('/')` tras cada mutación exitosa
    - _Requisitos: 3.3, 3.5, 3.7, 11.4, 12.5_

  - [ ] 6.2 Implementar Server Actions de servicios
    - Crear `lib/actions/services.ts` con acciones: `createService`, `updateService`, `deleteService`
    - Validar con Zod, sanitizar texto, verificar autenticación
    - Invocar `revalidatePath('/')` tras cada mutación exitosa
    - _Requisitos: 4.2, 4.3, 4.4, 11.4_

  - [ ] 6.3 Implementar Server Actions de tecnologías
    - Crear `lib/actions/technologies.ts` con acciones: `createTechnology`, `updateTechnology`, `deleteTechnology`
    - Validar con Zod, sanitizar texto, verificar autenticación
    - Invocar `revalidatePath('/')` tras cada mutación exitosa
    - _Requisitos: 5.2, 5.3, 5.4, 11.4_

  - [ ] 6.4 Implementar Server Actions de experiencia
    - Crear `lib/actions/experience.ts` con acciones: `createExperience`, `updateExperience`, `deleteExperience`
    - Validar con Zod, sanitizar texto, verificar autenticación
    - Invocar `revalidatePath('/')` tras cada mutación exitosa
    - _Requisitos: 6.2, 6.3, 6.4, 11.4_

  - [ ] 6.5 Implementar Server Actions de configuración del sitio
    - Crear `lib/actions/settings.ts` con acción: `updateSiteConfig`
    - Validar con Zod (email, URLs), sanitizar texto
    - Actualizar múltiples claves key-value en `site_config`
    - Invocar `revalidatePath('/')` tras mutación exitosa
    - _Requisitos: 7.2, 7.3, 7.4, 11.4_

  - [ ] 6.6 Implementar Server Actions de imágenes
    - Crear `lib/actions/images.ts` con acciones: `uploadImage`, `deleteImage`, `listImages`
    - Validar tipo MIME y tamaño en servidor antes de subir
    - Eliminar imagen anterior al reemplazar
    - Retornar URL pública del Storage
    - _Requisitos: 8.1, 8.2, 8.3, 8.5, 8.6, 12.6_

  - [ ]* 6.7 Escribir property test: mutaciones exitosas invocan revalidación
    - **Property 6: Mutaciones exitosas invocan revalidación**
    - **Valida: Requisitos 11.4**
    - Archivo: `__tests__/properties/revalidation-on-mutation.test.ts`
    - Mockear Supabase y `revalidatePath`, verificar que cada acción exitosa invoca revalidación

- [ ] 7. Checkpoint - Verificar Server Actions y validación
  - Ensure all tests pass, ask the user if questions arise.
  - Ejecutar `npm run build` para verificar que no hay errores de compilación

- [ ] 8. Layout y componentes compartidos del panel admin
  - [ ] 8.1 Crear layout del admin con sidebar
    - Crear `app/(admin)/admin/layout.tsx` con diseño de dos columnas
    - Implementar barra lateral con navegación a: Dashboard, Proyectos, Servicios, Tecnologías, Experiencia, Configuración, Imágenes
    - Usar íconos de Lucide React para cada item de navegación
    - Incluir botón de cerrar sesión
    - Aplicar tema oscuro con colores del portafolio
    - _Requisitos: 13.1, 13.2, 13.3_

  - [ ] 8.2 Implementar sidebar responsive con menú hamburguesa
    - Colapsar sidebar en dispositivos móviles (< 768px) a menú hamburguesa
    - Adaptar diseño para tabletas (768px - 1023px)
    - Mantener sidebar visible en escritorio (≥ 1024px)
    - Usar tamaño mínimo de 44x44px para elementos interactivos táctiles
    - _Requisitos: 14.1, 14.2, 14.4_

  - [ ] 8.3 Crear componentes compartidos (DataTable, FormModal, ConfirmDialog, ImageUploader)
    - Crear componente `DataTable` genérico para listar entidades con acciones editar/eliminar
    - Crear componente `FormModal` para formularios en modal
    - Crear componente `ConfirmDialog` para confirmar eliminaciones
    - Crear componente `ImageUploader` con preview, validación de tipo/tamaño y progreso
    - Mantener funcionalidad completa en todos los tamaños de pantalla
    - _Requisitos: 3.6, 8.4, 14.3_

- [ ] 9. Páginas del panel de administración
  - [ ] 9.1 Crear página de dashboard (`app/(admin)/admin/page.tsx`)
    - Mostrar resumen: cantidad de proyectos, servicios, tecnologías, entradas de experiencia
    - Consultar datos usando el Server Client de Supabase
    - Aplicar tema oscuro consistente
    - _Requisitos: 9.1, 13.1_

  - [ ] 9.2 Crear página CRUD de proyectos (`app/(admin)/admin/projects/page.tsx`)
    - Listar todos los proyectos en DataTable con columnas: nombre, tecnologías, orden
    - Formulario de creación/edición con campos: nombre, descripción, características (lista dinámica), tecnologías (lista dinámica), imagen
    - Validación client-side con Zod antes de enviar
    - Confirmación antes de eliminar
    - Integrar ImageUploader para la imagen del proyecto
    - _Requisitos: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

  - [ ] 9.3 Crear página CRUD de servicios (`app/(admin)/admin/services/page.tsx`)
    - Listar servicios en DataTable con columnas: título, ícono, orden
    - Formulario con campos: título, descripción, selector de ícono (Lucide React)
    - Implementar selector visual de íconos disponibles de Lucide
    - Validación client-side con Zod
    - _Requisitos: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ] 9.4 Crear página CRUD de tecnologías (`app/(admin)/admin/technologies/page.tsx`)
    - Listar tecnologías en DataTable con columnas: nombre, ícono, orden
    - Formulario con campos: nombre, ícono
    - Validación client-side con Zod
    - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 9.5 Crear página CRUD de experiencia (`app/(admin)/admin/experience/page.tsx`)
    - Listar experiencia ordenada por período descendente
    - Formulario con campos: período, título, empresa, descripción
    - Validación client-side con Zod
    - _Requisitos: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ] 9.6 Crear página de configuración del sitio (`app/(admin)/admin/settings/page.tsx`)
    - Formulario precargado con configuración actual (consulta a `site_config`)
    - Campos: nombre, título, descripción, URL, ogImage, email, whatsappUrl, redes sociales
    - Validación de formatos email y URL con mensajes descriptivos
    - _Requisitos: 7.1, 7.2, 7.3, 7.4_

  - [ ] 9.7 Crear página de gestión de imágenes (`app/(admin)/admin/images/page.tsx`)
    - Mostrar galería de imágenes por carpeta (profile, og, projects)
    - Permitir subir nuevas imágenes con preview
    - Permitir eliminar imágenes existentes con confirmación
    - Mostrar metadatos: nombre, tamaño, tipo
    - _Requisitos: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ] 10. Checkpoint - Verificar panel admin completo
  - Ensure all tests pass, ask the user if questions arise.
  - Ejecutar `npm run build` para verificar compilación sin errores

- [ ] 11. Migración del portafolio público a Supabase
  - [ ] 11.1 Crear funciones de consulta pública para cada entidad
    - Crear `lib/queries/projects.ts` con `getProjects()` ordenados por `display_order`
    - Crear `lib/queries/services.ts` con `getServices()` ordenados por `display_order`
    - Crear `lib/queries/technologies.ts` con `getTechnologies()` ordenadas por `display_order`
    - Crear `lib/queries/experience.ts` con `getExperience()` ordenada por `display_order`
    - Crear `lib/queries/settings.ts` con `getSiteConfig()` que reconstruya el objeto de configuración
    - Manejar errores con `console.error` y re-throw para que `error.tsx` capture
    - _Requisitos: 10.1, 10.3_

  - [ ] 11.2 Reestructurar app con route groups (public) y (admin)
    - Mover `app/layout.tsx` y `app/page.tsx` a `app/(public)/`
    - Crear `app/(public)/layout.tsx` con el layout público actual
    - Crear `app/(public)/error.tsx` para errores genéricos sin detalles técnicos
    - Mantener `app/layout.tsx` raíz mínimo (solo html/body)
    - _Requisitos: 9.4, 10.3_

  - [ ] 11.3 Actualizar componentes de secciones para consumir datos de Supabase
    - Modificar `components/sections/Projects.tsx` para recibir datos como props desde Server Component
    - Modificar `components/sections/Services.tsx` de la misma forma
    - Modificar `components/sections/Technologies.tsx` de la misma forma
    - Modificar `components/sections/Experience.tsx` de la misma forma
    - Actualizar `app/(public)/page.tsx` para llamar a las funciones de consulta y pasar datos
    - _Requisitos: 10.1, 10.2_

  - [ ] 11.4 Configurar ISR y revalidación bajo demanda
    - Agregar `export const revalidate = 60` en `app/(public)/page.tsx`
    - Verificar que las Server Actions ya invocan `revalidatePath('/')` para revalidación inmediata
    - Confirmar que el portafolio público refleja cambios tras edición en el admin
    - _Requisitos: 11.1, 11.2, 11.3, 11.4_

- [ ] 12. Checkpoint final - Verificar integración completa
  - Ensure all tests pass, ask the user if questions arise.
  - Ejecutar `npm run build` para verificar que el proyecto compila sin errores
  - Verificar que no se usan los archivos estáticos `data/*.ts` como fuente primaria

## Notes

- Las tareas marcadas con `*` son opcionales (tests de propiedades) y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental del progreso
- Los property tests validan propiedades universales de correctitud
- Los archivos de migración SQL están pensados para ejecutarse en la consola de Supabase o via CLI de Supabase
- Se usa `@supabase/ssr` para el manejo correcto de cookies en Next.js App Router
- La estructura de route groups `(admin)` y `(public)` permite layouts independientes sin afectar las URLs

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "5.1", "5.2"] },
    { "id": 3, "tasks": ["3.1", "3.2", "5.3", "5.4", "5.5", "5.6", "5.7"] },
    { "id": 4, "tasks": ["3.3", "6.1", "6.2", "6.3", "6.4", "6.5", "6.6"] },
    { "id": 5, "tasks": ["6.7", "8.1"] },
    { "id": 6, "tasks": ["8.2", "8.3"] },
    { "id": 7, "tasks": ["9.1", "9.2", "9.3", "9.4", "9.5", "9.6", "9.7"] },
    { "id": 8, "tasks": ["11.1", "11.2"] },
    { "id": 9, "tasks": ["11.3"] },
    { "id": 10, "tasks": ["11.4"] }
  ]
}
```
