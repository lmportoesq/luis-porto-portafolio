# Requirements Document

## Introduction

Panel de administración para el portafolio de Luis Porto, integrado con Supabase como backend (base de datos, autenticación y almacenamiento). El panel permite gestionar todo el contenido del portafolio (proyectos, servicios, tecnologías, experiencia, configuración del sitio e imágenes) sin necesidad de modificar código. La página pública del portafolio consume los datos desde Supabase con una estrategia de caché/ISR para mantener el rendimiento.

## Glossary

- **Panel_Admin**: Interfaz de administración protegida accesible en la ruta `/admin` para gestionar el contenido del portafolio
- **Supabase_Client**: Cliente de Supabase configurado para interactuar con la base de datos, autenticación y almacenamiento
- **Portafolio_Público**: Páginas públicas del sitio web que muestran el contenido del portafolio a los visitantes
- **RLS**: Row Level Security, políticas de seguridad a nivel de fila en PostgreSQL/Supabase que restringen el acceso a datos
- **Storage_Bucket**: Contenedor de archivos en Supabase Storage para almacenar imágenes del portafolio
- **ISR**: Incremental Static Regeneration, estrategia de Next.js para regenerar páginas estáticas de forma incremental
- **Sesión_Admin**: Sesión autenticada del usuario administrador (Luis Porto) mediante Supabase Auth
- **Proyecto**: Entidad que representa un proyecto del portafolio con nombre, descripción, características, tecnologías e imagen
- **Servicio**: Entidad que representa un servicio ofrecido con título, descripción e ícono
- **Tecnología**: Entidad que representa una tecnología dominada con nombre e ícono
- **Entrada_Experiencia**: Entidad que representa una entrada de experiencia laboral con período, título, empresa y descripción
- **Configuración_Sitio**: Entidad que contiene los metadatos y enlaces del sitio (nombre, título, descripción, URLs, redes sociales, email, WhatsApp)

## Requirements

### Requisito 1: Integración con Supabase

**User Story:** Como desarrollador del portafolio, quiero integrar Supabase como backend, para tener una base de datos, autenticación y almacenamiento centralizados.

#### Criterios de Aceptación

1. THE Supabase_Client SHALL proveer conexión a la base de datos PostgreSQL, al servicio de autenticación y al servicio de almacenamiento de archivos
2. THE Supabase_Client SHALL utilizar variables de entorno para la URL del proyecto y la clave anónima (anon key) sin exponer credenciales en el código fuente
3. THE Supabase_Client SHALL proveer un cliente separado para operaciones del lado del servidor con la clave de servicio (service role key)
4. WHEN el Supabase_Client no pueda establecer conexión con Supabase, THE Supabase_Client SHALL registrar el error en la consola y el Portafolio_Público SHALL mostrar contenido de fallback o una página de error apropiada

### Requisito 2: Autenticación del Administrador

**User Story:** Como Luis Porto, quiero ser el único usuario con acceso al panel de administración, para proteger la gestión del contenido de mi portafolio.

#### Criterios de Aceptación

1. THE Panel_Admin SHALL autenticar al usuario mediante email y contraseña utilizando Supabase Auth
2. WHEN un usuario no autenticado intente acceder a la ruta `/admin`, THE Panel_Admin SHALL redirigir al usuario a la página de inicio de sesión `/admin/login`
3. WHEN un usuario ingrese credenciales válidas en la página de login, THE Panel_Admin SHALL crear una Sesión_Admin y redirigir al usuario al dashboard del Panel_Admin
4. WHEN un usuario ingrese credenciales inválidas, THE Panel_Admin SHALL mostrar un mensaje de error descriptivo sin revelar si el email existe en el sistema
5. WHEN el usuario autenticado presione el botón de cerrar sesión, THE Panel_Admin SHALL destruir la Sesión_Admin y redirigir al usuario a la página de login
6. WHILE una Sesión_Admin esté activa, THE Panel_Admin SHALL permitir el acceso a todas las rutas bajo `/admin`
7. WHEN la Sesión_Admin expire, THE Panel_Admin SHALL redirigir al usuario a la página de login con un mensaje indicando que la sesión expiró

### Requisito 3: Gestión de Proyectos (CRUD)

**User Story:** Como Luis Porto, quiero crear, leer, actualizar y eliminar proyectos desde el panel, para mantener mi portafolio actualizado sin editar código.

#### Criterios de Aceptación

1. WHILE una Sesión_Admin esté activa, THE Panel_Admin SHALL mostrar una lista de todos los Proyectos existentes en la sección de gestión de proyectos
2. WHEN el administrador presione el botón de crear proyecto, THE Panel_Admin SHALL mostrar un formulario con campos para nombre, descripción, características (lista dinámica de strings), tecnologías (lista dinámica de strings) e imagen
3. WHEN el administrador envíe el formulario de creación con datos válidos, THE Panel_Admin SHALL insertar el nuevo Proyecto en la base de datos y mostrar un mensaje de confirmación
4. WHEN el administrador presione el botón de editar en un proyecto, THE Panel_Admin SHALL mostrar el formulario precargado con los datos actuales del Proyecto
5. WHEN el administrador envíe el formulario de edición con datos válidos, THE Panel_Admin SHALL actualizar el Proyecto en la base de datos y mostrar un mensaje de confirmación
6. WHEN el administrador presione el botón de eliminar en un proyecto, THE Panel_Admin SHALL solicitar confirmación antes de proceder con la eliminación
7. WHEN el administrador confirme la eliminación, THE Panel_Admin SHALL eliminar el Proyecto de la base de datos y remover la imagen asociada del Storage_Bucket
8. IF el formulario de proyecto se envía sin nombre o sin descripción, THEN THE Panel_Admin SHALL mostrar mensajes de validación en los campos requeridos sin enviar datos al servidor

### Requisito 4: Gestión de Servicios (CRUD)

**User Story:** Como Luis Porto, quiero gestionar los servicios que ofrezco desde el panel, para reflejar cambios en mis servicios sin modificar archivos de código.

#### Criterios de Aceptación

1. WHILE una Sesión_Admin esté activa, THE Panel_Admin SHALL mostrar una lista de todos los Servicios existentes en la sección de gestión de servicios
2. WHEN el administrador envíe el formulario de creación de servicio con datos válidos (título, descripción, ícono), THE Panel_Admin SHALL insertar el nuevo Servicio en la base de datos
3. WHEN el administrador envíe el formulario de edición de servicio con datos válidos, THE Panel_Admin SHALL actualizar el Servicio en la base de datos
4. WHEN el administrador confirme la eliminación de un servicio, THE Panel_Admin SHALL eliminar el Servicio de la base de datos
5. THE Panel_Admin SHALL proveer un selector de íconos que muestre los íconos disponibles de Lucide React para asignar al Servicio
6. IF el formulario de servicio se envía sin título o sin descripción, THEN THE Panel_Admin SHALL mostrar mensajes de validación en los campos requeridos

### Requisito 5: Gestión de Tecnologías (CRUD)

**User Story:** Como Luis Porto, quiero gestionar las tecnologías que domino desde el panel, para agregar o remover tecnologías a medida que evoluciono profesionalmente.

#### Criterios de Aceptación

1. WHILE una Sesión_Admin esté activa, THE Panel_Admin SHALL mostrar una lista de todas las Tecnologías existentes en la sección de gestión de tecnologías
2. WHEN el administrador envíe el formulario de creación de tecnología con datos válidos (nombre, ícono), THE Panel_Admin SHALL insertar la nueva Tecnología en la base de datos
3. WHEN el administrador envíe el formulario de edición de tecnología con datos válidos, THE Panel_Admin SHALL actualizar la Tecnología en la base de datos
4. WHEN el administrador confirme la eliminación de una tecnología, THE Panel_Admin SHALL eliminar la Tecnología de la base de datos
5. IF el formulario de tecnología se envía sin nombre, THEN THE Panel_Admin SHALL mostrar un mensaje de validación en el campo requerido

### Requisito 6: Gestión de Experiencia Laboral (CRUD)

**User Story:** Como Luis Porto, quiero gestionar mis entradas de experiencia laboral desde el panel, para actualizar mi trayectoria profesional fácilmente.

#### Criterios de Aceptación

1. WHILE una Sesión_Admin esté activa, THE Panel_Admin SHALL mostrar una lista de todas las Entradas_Experiencia existentes ordenadas por período descendente
2. WHEN el administrador envíe el formulario de creación de experiencia con datos válidos (período, título, empresa, descripción), THE Panel_Admin SHALL insertar la nueva Entrada_Experiencia en la base de datos
3. WHEN el administrador envíe el formulario de edición de experiencia con datos válidos, THE Panel_Admin SHALL actualizar la Entrada_Experiencia en la base de datos
4. WHEN el administrador confirme la eliminación de una entrada de experiencia, THE Panel_Admin SHALL eliminar la Entrada_Experiencia de la base de datos
5. IF el formulario de experiencia se envía sin período, título o empresa, THEN THE Panel_Admin SHALL mostrar mensajes de validación en los campos requeridos

### Requisito 7: Gestión de Configuración del Sitio

**User Story:** Como Luis Porto, quiero editar la configuración general de mi sitio desde el panel, para actualizar mis datos de contacto, redes sociales y metadatos SEO sin tocar código.

#### Criterios de Aceptación

1. WHILE una Sesión_Admin esté activa, THE Panel_Admin SHALL mostrar un formulario precargado con la Configuración_Sitio actual (nombre, título, descripción, URL, URLs de redes sociales, email, WhatsApp)
2. WHEN el administrador envíe el formulario de configuración con datos válidos, THE Panel_Admin SHALL actualizar la Configuración_Sitio en la base de datos y mostrar un mensaje de confirmación
3. IF el formulario de configuración se envía con un email con formato inválido, THEN THE Panel_Admin SHALL mostrar un mensaje de validación indicando el formato correcto
4. IF el formulario de configuración se envía con una URL con formato inválido, THEN THE Panel_Admin SHALL mostrar un mensaje de validación indicando el formato correcto

### Requisito 8: Gestión de Imágenes

**User Story:** Como Luis Porto, quiero subir y gestionar imágenes (foto de perfil, imagen OG, imágenes de proyectos) desde el panel, para mantener el contenido visual actualizado.

#### Criterios de Aceptación

1. WHEN el administrador seleccione un archivo de imagen para subir, THE Panel_Admin SHALL validar que el archivo sea de un tipo permitido (JPEG, PNG, WebP, SVG) y que no exceda 5MB de tamaño
2. WHEN el administrador suba una imagen válida, THE Panel_Admin SHALL almacenar el archivo en el Storage_Bucket de Supabase y asociar la URL pública al registro correspondiente
3. WHEN el administrador suba una nueva imagen para reemplazar una existente, THE Panel_Admin SHALL eliminar la imagen anterior del Storage_Bucket antes de almacenar la nueva
4. THE Panel_Admin SHALL mostrar una vista previa de la imagen seleccionada antes de confirmar la subida
5. IF el archivo seleccionado excede 5MB o no es un tipo permitido, THEN THE Panel_Admin SHALL mostrar un mensaje de error descriptivo sin intentar subir el archivo
6. WHEN el administrador elimine un proyecto que tiene imagen asociada, THE Panel_Admin SHALL eliminar la imagen del Storage_Bucket junto con el registro del proyecto

### Requisito 9: Ruta Protegida del Panel

**User Story:** Como Luis Porto, quiero que el panel de administración esté en una ruta protegida, para que solo yo pueda acceder a las funcionalidades de gestión.

#### Criterios de Aceptación

1. THE Panel_Admin SHALL estar disponible exclusivamente bajo la ruta `/admin` y sus sub-rutas
2. WHEN un usuario no autenticado acceda a cualquier ruta bajo `/admin` (excepto `/admin/login`), THE Panel_Admin SHALL redirigir al usuario a `/admin/login`
3. THE Panel_Admin SHALL verificar la Sesión_Admin en el middleware de Next.js antes de renderizar cualquier página protegida
4. THE Panel_Admin SHALL no exponer enlaces o referencias al panel de administración en el Portafolio_Público

### Requisito 10: Consumo de Datos desde Supabase en el Portafolio Público

**User Story:** Como visitante del portafolio, quiero ver el contenido actualizado por Luis Porto, para tener información precisa sobre sus proyectos y servicios.

#### Criterios de Aceptación

1. THE Portafolio_Público SHALL obtener los datos de Proyectos, Servicios, Tecnologías, Entradas_Experiencia y Configuración_Sitio desde la base de datos de Supabase
2. THE Portafolio_Público SHALL dejar de utilizar los archivos estáticos de datos (`data/projects.ts`, `data/services.ts`, `data/technologies.ts`, `data/experience.ts`, `data/site.ts`) como fuente primaria de contenido
3. WHEN la consulta a Supabase falle en el Portafolio_Público, THE Portafolio_Público SHALL mostrar una página con un mensaje genérico de error sin exponer detalles técnicos al visitante

### Requisito 11: Estrategia de Caché y Rendimiento

**User Story:** Como visitante del portafolio, quiero que las páginas carguen rápidamente, para tener una experiencia de navegación fluida sin esperas innecesarias.

#### Criterios de Aceptación

1. THE Portafolio_Público SHALL implementar revalidación temporal (ISR) con un intervalo de revalidación de 60 segundos para las páginas que consumen datos de Supabase
2. WHEN el contenido en Supabase se actualice, THE Portafolio_Público SHALL reflejar los cambios en un máximo de 60 segundos para los visitantes subsiguientes
3. THE Portafolio_Público SHALL servir páginas desde caché durante el intervalo de revalidación sin realizar consultas adicionales a Supabase por cada solicitud de visitante
4. WHEN el administrador guarde cambios en el Panel_Admin, THE Panel_Admin SHALL invocar la revalidación bajo demanda (on-demand revalidation) de las rutas afectadas para que los cambios se reflejen de forma inmediata

### Requisito 12: Seguridad

**User Story:** Como Luis Porto, quiero que mi panel y mis datos estén protegidos adecuadamente, para evitar accesos no autorizados o manipulación de contenido.

#### Criterios de Aceptación

1. THE Supabase_Client SHALL tener políticas RLS activas en todas las tablas de la base de datos
2. THE RLS SHALL permitir operaciones de lectura (SELECT) a todos los usuarios en las tablas públicas (proyectos, servicios, tecnologías, experiencia, configuración del sitio)
3. THE RLS SHALL restringir operaciones de escritura (INSERT, UPDATE, DELETE) exclusivamente a usuarios autenticados con rol de administrador
4. THE Storage_Bucket SHALL tener políticas que permitan lectura pública de las imágenes y restrinjan la escritura a usuarios autenticados con rol de administrador
5. THE Panel_Admin SHALL sanitizar todas las entradas de texto del usuario antes de almacenarlas en la base de datos para prevenir inyección de código
6. THE Panel_Admin SHALL validar el tipo MIME y la extensión del archivo en el servidor antes de aceptar subidas de imágenes al Storage_Bucket
7. IF un usuario intenta realizar una operación de escritura sin estar autenticado como administrador, THEN THE Supabase_Client SHALL rechazar la operación y retornar un error de autorización

### Requisito 13: Tema Visual del Panel de Administración

**User Story:** Como Luis Porto, quiero que el panel de administración tenga un diseño coherente con mi portafolio, para mantener una identidad visual consistente.

#### Criterios de Aceptación

1. THE Panel_Admin SHALL utilizar el tema oscuro consistente con los colores y estilos del Portafolio_Público
2. THE Panel_Admin SHALL utilizar los mismos componentes UI base (tipografía Inter, esquema de colores, bordes redondeados) definidos en el Portafolio_Público
3. THE Panel_Admin SHALL incluir una barra de navegación lateral para acceder a las secciones de gestión (Proyectos, Servicios, Tecnologías, Experiencia, Configuración, Imágenes)

### Requisito 14: Responsividad del Panel de Administración

**User Story:** Como Luis Porto, quiero poder gestionar mi portafolio desde cualquier dispositivo, para hacer cambios rápidos incluso desde mi teléfono.

#### Criterios de Aceptación

1. THE Panel_Admin SHALL adaptar su diseño a pantallas de escritorio (mayor o igual a 1024px), tabletas (entre 768px y 1023px) y dispositivos móviles (menor a 768px)
2. WHILE el Panel_Admin se muestre en un dispositivo móvil, THE Panel_Admin SHALL colapsar la barra de navegación lateral en un menú tipo hamburguesa
3. THE Panel_Admin SHALL mantener la funcionalidad completa de todos los formularios y acciones CRUD en todos los tamaños de pantalla
4. THE Panel_Admin SHALL utilizar un tamaño mínimo de 44x44 píxeles para todos los elementos interactivos (botones, enlaces, controles de formulario) en dispositivos táctiles
