# Implementation Plan: Portfolio Luis Porto

## Overview

Implementación del portafolio web premium de Luis Porto usando Next.js 15 App Router, TypeScript, Tailwind CSS v4, Framer Motion, Shadcn/UI y Lucide React. El enfoque es modular: primero la infraestructura y datos, luego componentes compartidos, después las secciones, y finalmente composición de página con SEO y testing.

## Tasks

- [x] 1. Configuración del proyecto y estructura base
  - [x] 1.1 Instalar dependencias requeridas
    - Instalar framer-motion, lucide-react, class-variance-authority, clsx, tailwind-merge
    - Instalar dependencias de desarrollo: vitest, @testing-library/react, @testing-library/jest-dom, jsdom, fast-check
    - Actualizar package.json con scripts de test
    - _Requisitos: 14.3, 14.4_

  - [x] 1.2 Configurar tema Tailwind CSS v4 y estilos globales
    - Reemplazar contenido de `app/globals.css` con la configuración de tema `@theme inline` definida en el diseño (colores: background #0B0F19, foreground #FFFFFF, card #111827, primary #4F46E5, secondary #7C3AED, muted #9CA3AF, border rgba(255,255,255,0.1), font-sans Inter)
    - Configurar fuente Inter usando `next/font/google` en el layout
    - Establecer `lang="es"` en el documento HTML
    - _Requisitos: 10.1, 10.2, 13.5_

  - [x] 1.3 Crear estructura de carpetas del proyecto
    - Crear directorios: `components/sections/`, `components/ui/`, `components/animations/`, `data/`, `lib/`, `public/images/`
    - Crear archivo `lib/utils.ts` con la función `cn()` usando clsx y tailwind-merge
    - _Requisitos: 14.3_

- [x] 2. Capa de datos y tipos
  - [x] 2.1 Definir tipos TypeScript compartidos
    - Crear `lib/types.ts` con las interfaces: Project, Service, Technology, ExperienceEntry, NavLink, SiteConfig
    - Seguir exactamente las interfaces definidas en el documento de diseño
    - _Requisitos: 14.3_

  - [x] 2.2 Crear archivos de datos estáticos
    - Crear `data/site.ts` con la configuración global del sitio (SiteConfig)
    - Crear `data/navigation.ts` con los enlaces de navegación (NavLink[])
    - Crear `data/projects.ts` con los 3 proyectos definidos en requisitos
    - Crear `data/services.ts` con los 3 servicios definidos en requisitos
    - Crear `data/technologies.ts` con las 8 tecnologías (Next.js, React, TypeScript, PostgreSQL, Supabase, Tailwind CSS, Git, Vercel)
    - Crear `data/experience.ts` con la entrada de experiencia profesional
    - _Requisitos: 5.1, 4.1, 6.1, 7.1_

- [x] 3. Componentes de animación
  - [x] 3.1 Implementar componente FadeIn
    - Crear `components/animations/FadeIn.tsx` como Client Component
    - Usar Framer Motion `motion.div` con `whileInView` para activar al entrar en viewport (threshold 0.2)
    - Props: children, duration (default 0.6), delay (default 0), className
    - Respetar `prefers-reduced-motion`: si está activa, renderizar sin animación
    - _Requisitos: 11.1, 11.2, 11.4, 11.6_

  - [x] 3.2 Implementar componente SlideUp
    - Crear `components/animations/SlideUp.tsx` como Client Component
    - Usar Framer Motion con animación de translateY (offset default 20px a 0) y opacidad (0 a 1)
    - Props: children, duration (default 0.6), delay (default 0), offset (default 20), className
    - Activar `whileInView` con viewport threshold 0.2 y `once: true`
    - Respetar `prefers-reduced-motion`
    - _Requisitos: 11.1, 11.2, 11.4, 11.6_

  - [x] 3.3 Implementar componente StaggerContainer
    - Crear `components/animations/StaggerContainer.tsx` como Client Component
    - Usar Framer Motion variants con `staggerChildren` para animar hijos secuencialmente
    - Props: children, staggerDelay (default 0.1), className
    - Respetar `prefers-reduced-motion`
    - _Requisitos: 11.1, 4.4, 6.3, 11.6_

  - [x] 3.4 Implementar componente FloatingImage
    - Crear `components/animations/FloatingImage.tsx` como Client Component
    - Usar Framer Motion con animación `y` cíclica (repeat: Infinity, repeatType: "reverse")
    - Props: children, amplitude (default 10px), duration (default 3 segundos)
    - Respetar `prefers-reduced-motion`
    - _Requisitos: 11.3, 11.6, 2.5_

- [x] 4. Componentes UI reutilizables
  - [x] 4.1 Implementar componente Button
    - Crear `components/ui/Button.tsx` con variantes: primary (fondo #4F46E5), secondary, ghost
    - Tamaños: sm, md, lg con área mínima de toque 44x44px
    - Soporte para `href` (renderiza como enlace) y `onClick` (renderiza como botón)
    - Prop `external` para target="_blank" y rel="noopener noreferrer"
    - _Requisitos: 1.3, 8.2, 12.4, 15.5_

  - [x] 4.2 Implementar componente Badge
    - Crear `components/ui/Badge.tsx` con soporte para icono y texto
    - Estilo: fondo semi-transparente con borde sutil, texto claro
    - Props: children, icon, className
    - _Requisitos: 2.4, 5.2_

  - [x] 4.3 Implementar componente Card
    - Crear `components/ui/Card.tsx` con efecto glassmorphism (backdrop-blur, fondo #111827, borde 1px con gradiente)
    - Prop `hover` para activar efecto de elevación (translateY -4px) con transición 300ms
    - _Requisitos: 10.3, 5.3, 5.4_

  - [x] 4.4 Implementar componente SectionHeading
    - Crear `components/ui/SectionHeading.tsx` como Server Component
    - Props: title, subtitle (opcional), className
    - Tipografía grande y bold con color foreground
    - _Requisitos: 3.4, 4.1, 6.5_

- [~] 5. Checkpoint - Verificar estructura base
  - Asegurar que todas las dependencias estén instaladas, el build compile sin errores, y los componentes base estén correctamente tipados. Preguntar al usuario si surgen dudas.

- [x] 6. Secciones del portafolio - Parte 1 (Navegación y Hero)
  - [x] 6.1 Implementar componente Navbar
    - Crear `components/sections/Navbar.tsx` como Client Component
    - Posición sticky en top con z-index alto
    - Logo "LP" como enlace a inicio, enlaces de navegación en orden definido
    - Botón "Hablemos" con estilo primary
    - Efecto backdrop-blur al hacer scroll (detectar scroll > 0px con useState/useEffect)
    - Menú hamburguesa para viewport < 768px con aria-label y aria-expanded
    - Smooth scroll al hacer clic en enlaces
    - Cerrar menú móvil al seleccionar un enlace
    - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9_

  - [x] 6.2 Implementar componente Hero
    - Crear `components/sections/Hero.tsx` como Client Component
    - Layout de 2 columnas en desktop (≥1024px), 1 columna en móvil
    - Columna izquierda: nombre "Luis Porto", título, descripción, botones "Ver Proyectos" y "Contactar", badges de tecnologías
    - Columna derecha: fotografía con recorte circular, borde con resplandor, animación flotante (FloatingImage)
    - Tarjeta superpuesta con datos de presentación
    - Atributo alt descriptivo en la fotografía
    - _Requisitos: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

- [ ] 7. Secciones del portafolio - Parte 2 (Contenido principal)
  - [~] 7.1 Implementar componente AboutMe
    - Crear `components/sections/AboutMe.tsx` como Client Component
    - Título "Transformando ideas en soluciones digitales"
    - Texto descriptivo del perfil profesional (rol, especialización, tecnologías, enfoque)
    - Etiqueta/subtítulo "Sobre Mí"
    - Animación FadeIn al entrar en viewport
    - _Requisitos: 3.1, 3.2, 3.3, 3.4_

  - [~] 7.2 Implementar componente Services
    - Crear `components/sections/Services.tsx` como Client Component
    - Título "Mis Servicios" con SectionHeading
    - 3 tarjetas de servicio con Card (glassmorphism), icono de Lucide, título y descripción
    - Efecto hover de escala (1.02-1.05) en tarjetas
    - Animación StaggerContainer con SlideUp escalonado (100-200ms entre tarjetas)
    - _Requisitos: 4.1, 4.2, 4.3, 4.4_

  - [~] 7.3 Implementar componente Projects
    - Crear `components/sections/Projects.tsx` como Client Component
    - 3 tarjetas de proyecto con nombre, descripción (≤150 chars), funcionalidades como lista, tecnologías como badges
    - Fondo #111827 con borde de gradiente
    - Hover: translateY -4px, opacidad de borde al 100%, transición 300ms
    - Layout apilado en viewport < 768px
    - Animación de entrada con StaggerContainer
    - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [~] 7.4 Implementar componente Technologies
    - Crear `components/sections/Technologies.tsx` como Client Component
    - Grid con las 8 tecnologías: icono + nombre debajo
    - Título de sección visible
    - Efecto hover de escala consistente con otros componentes
    - Animación FadeIn escalonada (50-150ms entre elementos)
    - _Requisitos: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [~] 7.5 Implementar componente Experience
    - Crear `components/sections/Experience.tsx` como Client Component
    - Timeline vertical con línea color #4F46E5 e indicadores circulares
    - Entrada: período, título, empresa, descripción
    - Lista semántica con aria-label "Experiencia profesional"
    - Responsive: mantener vertical en móvil con width 100%
    - Animación FadeIn al entrar en viewport (≤600ms)
    - _Requisitos: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 8. Secciones del portafolio - Parte 3 (CTA y Footer)
  - [~] 8.1 Implementar componente CTAFinal
    - Crear `components/sections/CTAFinal.tsx` como Client Component
    - Título "¿Tienes un proyecto en mente?" y texto descriptivo
    - Fondo con gradiente lineal #4F46E5 a #7C3AED
    - Botón "Contactar por WhatsApp" con enlace wa.me (target="_blank", rel="noopener noreferrer")
    - Botón "Enviar correo" con enlace mailto:
    - _Requisitos: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [x] 8.2 Implementar componente Footer
    - Crear `components/sections/Footer.tsx` como Server Component
    - Texto "Luis Porto © 2026"
    - Enlaces a GitHub, LinkedIn, WhatsApp con target="_blank", rel="noopener noreferrer"
    - Fondo #0B0F19
    - aria-label en cada enlace social
    - _Requisitos: 9.1, 9.2, 9.3, 9.4_

- [~] 9. Checkpoint - Verificar secciones individuales
  - Asegurar que todos los componentes de sección compilen correctamente, que los tipos estén correctos y no haya errores de TypeScript. Preguntar al usuario si surgen dudas.

- [ ] 10. Composición de página y SEO
  - [~] 10.1 Componer la página principal
    - Actualizar `app/page.tsx` como Server Component que importe y renderice todas las secciones en orden: Navbar, Hero, AboutMe, Services, Projects, Technologies, Experience, CTAFinal, Footer
    - Envolver secciones en estructura semántica: header (Navbar), main (contenido), footer
    - Usar ids en cada sección para navegación por anclas (#inicio, #proyectos, #servicios, #tecnologias, #contacto)
    - _Requisitos: 14.4, 15.4_

  - [~] 10.2 Configurar metadata y SEO en el layout
    - Actualizar `app/layout.tsx` con metadata completa usando la Metadata API de Next.js
    - Incluir: title, description, keywords, Open Graph (og:title, og:description, og:image con URL absoluta, og:type "website", og:url), Twitter Card (summary_large_image)
    - Importar datos desde `data/site.ts`
    - Verificar que `lang="es"` esté configurado en `<html>`
    - _Requisitos: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

  - [~] 10.3 Configurar imágenes y assets
    - Agregar placeholder para `public/images/luis-porto.webp` y `public/images/og-image.png`
    - Usar componente `next/image` con formato WebP, lazy loading para imágenes fuera del viewport inicial
    - Configurar onError fallback para imágenes que no cargan
    - _Requisitos: 14.2, 14.5, 2.8_

- [~] 11. Checkpoint - Build completo y verificación
  - Ejecutar `npm run build` para verificar que la aplicación compila sin errores. Ejecutar `npm run lint` para verificar el código. Preguntar al usuario si surgen dudas.

- [ ] 12. Testing y validación
  - [~] 12.1 Configurar Vitest y Testing Library
    - Crear `vitest.config.ts` con configuración para React (jsdom environment)
    - Crear archivo de setup para testing-library/jest-dom
    - Agregar script "test" en package.json
    - _Requisitos: 14.3_

  - [ ]* 12.2 Escribir property test para completitud de renderizado de Tarjeta de Proyecto
    - **Propiedad 1: Completitud de renderizado de Tarjeta de Proyecto**
    - Generar objetos Project arbitrarios válidos (nombre no vacío, descripción ≤150 chars, al menos 1 funcionalidad, al menos 1 tecnología) con fast-check
    - Verificar que el componente renderizado contenga el nombre, descripción, cada funcionalidad y cada tecnología
    - **Valida: Requisitos 5.1, 5.2**

  - [ ]* 12.3 Escribir property test para renderizado de nombre de Tecnología
    - **Propiedad 2: Renderizado de nombre de Tecnología**
    - Generar objetos Technology arbitrarios válidos (nombre no vacío, icono definido) con fast-check
    - Verificar que el componente renderizado muestre el nombre de la tecnología como texto visible
    - **Valida: Requisitos 6.2**

  - [ ]* 12.4 Escribir property test para duración máxima de animación
    - **Propiedad 3: Duración máxima de animación**
    - Generar configuraciones de animación arbitrarias (FadeIn, SlideUp, StaggerContainer)
    - Verificar que la duración total no exceda 600ms (0.6 segundos)
    - **Valida: Requisitos 11.4**

  - [ ]* 12.5 Escribir property test para respeto a prefers-reduced-motion
    - **Propiedad 4: Respeto a prefers-reduced-motion**
    - Generar configuraciones de componentes de animación arbitrarios
    - Verificar que con prefers-reduced-motion activa, el contenido se renderiza en estado final sin transiciones
    - **Valida: Requisitos 11.6**

  - [ ]* 12.6 Escribir property test para generación válida de metadata Open Graph
    - **Propiedad 5: Generación válida de metadata Open Graph**
    - Generar objetos SiteConfig arbitrarios válidos (title no vacío, description no vacía, url válida, ogImage como path válido)
    - Verificar que la metadata incluya og:title, og:description, og:image como URL absoluta, og:type "website", og:url
    - **Valida: Requisitos 13.4**

  - [ ]* 12.7 Escribir property test para contraste de color WCAG
    - **Propiedad 6: Contraste de color WCAG**
    - Verificar que cada par de colores (texto, fondo) definido en el tema produzca un ratio de contraste ≥ 4.5:1 según WCAG 2.1
    - **Valida: Requisitos 15.2**

  - [ ]* 12.8 Escribir property test para accesibilidad de elementos interactivos
    - **Propiedad 7: Accesibilidad de elementos interactivos**
    - Generar elementos interactivos arbitrarios sin texto visible
    - Verificar que aria-label esté presente con al menos 3 caracteres descriptivos
    - **Valida: Requisitos 15.5**

- [~] 13. Checkpoint final - Verificación completa
  - Ejecutar todos los tests con `npx vitest --run`. Ejecutar `npm run build` para confirmar build de producción exitoso. Preguntar al usuario si surgen dudas.

## Notes

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Los property tests validan propiedades universales de corrección definidas en el diseño
- Los componentes de animación deben siempre verificar `prefers-reduced-motion` antes de animar
- Consultar la documentación de Next.js en `node_modules/next/dist/docs/` antes de implementar código relacionado con el framework

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.3"] },
    { "id": 1, "tasks": ["1.2", "2.1"] },
    { "id": 2, "tasks": ["2.2"] },
    { "id": 3, "tasks": ["3.1", "3.2", "3.3", "3.4", "4.4"] },
    { "id": 4, "tasks": ["4.1", "4.2", "4.3"] },
    { "id": 5, "tasks": ["6.1", "6.2", "8.2"] },
    { "id": 6, "tasks": ["7.1", "7.2", "7.3", "7.4", "7.5", "8.1"] },
    { "id": 7, "tasks": ["10.1", "10.2", "10.3"] },
    { "id": 8, "tasks": ["12.1"] },
    { "id": 9, "tasks": ["12.2", "12.3", "12.4", "12.5", "12.6", "12.7", "12.8"] }
  ]
}
```
