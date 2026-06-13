# Requirements Document

## Introduction

Portafolio web premium para Luis Porto, desarrollador Full Stack y fundador de Porto Soluciones. El sitio tiene como objetivo transmitir confianza a clientes potenciales, mostrar proyectos reales y generar oportunidades comerciales. El diseño sigue una estética de startup tecnológica moderna con tema oscuro elegante, animaciones sutiles y una experiencia de usuario profesional. El stack tecnológico incluye Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Shadcn/UI, Lucide React y despliegue en Vercel.

## Glossary

- **Portafolio**: Aplicación web de página única (SPA) que presenta la información profesional de Luis Porto
- **Navbar**: Barra de navegación fija ubicada en la parte superior de la página
- **Hero**: Sección principal visible al cargar la página, con presentación destacada del desarrollador
- **CTA**: Call To Action, elemento visual que invita al usuario a realizar una acción específica
- **Glassmorphism**: Efecto visual de cristal translúcido aplicado a elementos de interfaz
- **Tema_Oscuro**: Esquema de colores con fondo principal #0B0F19, tarjetas #111827, color principal #4F46E5, color secundario #7C3AED, texto principal #FFFFFF y texto secundario #9CA3AF
- **Sistema_de_Animaciones**: Conjunto de animaciones implementadas con Framer Motion incluyendo Fade In, Slide Up, Hover Effects y Floating Animation
- **Sección**: Bloque de contenido diferenciado dentro de la página (Hero, Sobre Mí, Servicios, Proyectos, Tecnologías, Experiencia, CTA Final, Footer)
- **Tarjeta_de_Proyecto**: Componente visual premium que muestra información de un proyecto incluyendo nombre, descripción, funcionalidades y tecnologías utilizadas
- **Tarjeta_de_Servicio**: Componente visual que presenta un servicio ofrecido con título y descripción
- **Timeline**: Componente visual de línea temporal vertical que muestra la experiencia profesional
- **Viewport**: Área visible del navegador del usuario

## Requirements

### Requisito 1: Navbar de Navegación

**Historia de Usuario:** Como visitante del portafolio, quiero una barra de navegación clara y accesible, para poder desplazarme fácilmente entre las secciones del sitio.

#### Criterios de Aceptación

1. THE Navbar SHALL mostrar el logo "LP" en el extremo izquierdo como enlace que desplaza la vista a la sección de inicio
2. THE Navbar SHALL incluir los enlaces de navegación en el siguiente orden de izquierda a derecha: Inicio, Proyectos, Servicios, Tecnologías y Contacto
3. THE Navbar SHALL incluir un botón "Hablemos" visualmente diferenciado de los enlaces de texto mediante fondo de color principal #4F46E5 con texto en color blanco
4. THE Navbar SHALL permanecer fija en la parte superior del viewport con posición sticky y un z-index superior al resto del contenido
5. WHEN el usuario desplaza la página más de 0px verticalmente, THE Navbar SHALL mostrar un efecto de desenfoque (backdrop-blur) de fondo para distinguirse del contenido inferior
6. WHEN el usuario hace clic en un enlace de navegación, THE Navbar SHALL desplazar la vista suavemente (scroll-behavior: smooth) hasta la sección correspondiente
7. WHILE el viewport tiene un ancho menor a 768px, THE Navbar SHALL colapsar los enlaces y el botón "Hablemos" en un menú oculto activado por un botón hamburguesa con atributo aria-label descriptivo y aria-expanded que refleje el estado abierto o cerrado del menú
8. WHEN el usuario hace clic en el botón hamburguesa estando el menú cerrado, THE Navbar SHALL mostrar el panel de navegación con los enlaces visibles y actualizar aria-expanded a "true"
9. WHEN el usuario hace clic en un enlace dentro del menú móvil abierto, THE Navbar SHALL cerrar el panel de navegación, actualizar aria-expanded a "false" y desplazar la vista a la sección correspondiente

### Requisito 2: Sección Hero Principal

**Historia de Usuario:** Como visitante del portafolio, quiero ver una presentación impactante al llegar al sitio, para entender rápidamente quién es Luis Porto y qué hace.

#### Criterios de Aceptación

1. WHILE el viewport tiene un ancho igual o mayor a 1024px, THE Hero SHALL presentar un diseño en dos columnas
2. THE Hero SHALL mostrar en la columna izquierda el nombre "Luis Porto", el título "Full Stack Developer & Founder of Porto Soluciones" y la descripción "Creo aplicaciones web modernas, sistemas empresariales y soluciones digitales escalables para empresas y emprendedores"
3. THE Hero SHALL incluir dos botones de acción: "Ver Proyectos" que desplaza la vista suavemente hasta la sección de proyectos, y "Contactar" que desplaza la vista suavemente hasta la sección de contacto
4. THE Hero SHALL mostrar en la columna izquierda badges con el nombre de cada tecnología (Next.js, PostgreSQL, TypeScript, Supabase) acompañados de su icono correspondiente
5. THE Hero SHALL mostrar en la columna derecha una fotografía profesional con recorte circular, un borde con resplandor difuminado de al menos 8px de radio, y una animación de desplazamiento vertical cíclico con amplitud máxima de 10px y duración entre 3 y 6 segundos
6. THE Hero SHALL incluir una tarjeta de presentación superpuesta a la fotografía que muestre los datos: Luis Porto, Full Stack Developer, Colombia
7. WHEN el viewport tiene un ancho menor a 1024px, THE Hero SHALL reorganizar el contenido en una sola columna con la fotografía encima del texto
8. THE Hero SHALL incluir un atributo alt descriptivo en la fotografía con el texto "Fotografía profesional de Luis Porto"

### Requisito 3: Sección Sobre Mí

**Historia de Usuario:** Como cliente potencial, quiero conocer el perfil profesional de Luis Porto, para evaluar si tiene la experiencia que necesito.

#### Criterios de Aceptación

1. THE Sección Sobre Mí SHALL mostrar el título "Transformando ideas en soluciones digitales"
2. THE Sección Sobre Mí SHALL presentar el texto descriptivo del perfil profesional de Luis Porto que incluya como mínimo: su rol actual (Full Stack Developer y Fundador de Porto Soluciones), su especialización (desarrollo de aplicaciones web y sistemas empresariales), al menos tres tecnologías principales que utiliza, y su enfoque de trabajo orientado a soluciones digitales escalables
3. WHEN la Sección Sobre Mí entra en el Viewport durante el scroll, THE Sistema_de_Animaciones SHALL aplicar un efecto Fade In al contenido con una duración máxima de 600ms
4. THE Sección Sobre Mí SHALL incluir una etiqueta o subtítulo visible que identifique la sección como "Sobre Mí" para orientación del usuario

### Requisito 4: Sección de Servicios

**Historia de Usuario:** Como cliente potencial, quiero ver los servicios que ofrece Luis Porto, para determinar si puede resolver mi necesidad específica.

#### Criterios de Aceptación

1. THE Sección de Servicios SHALL mostrar el título "Mis Servicios" y exactamente tres Tarjeta_de_Servicio con los siguientes servicios: "Desarrollo Web" con descripción "Aplicaciones modernas, rápidas y escalables", "Sistemas Empresariales" con descripción "Software personalizado para optimizar procesos", y "Automatización" con descripción "Digitalización y automatización de tareas operativas"
2. THE Tarjeta_de_Servicio SHALL aplicar el estilo Glassmorphism con fondo de tarjeta #111827
3. WHEN el usuario posiciona el cursor sobre una Tarjeta_de_Servicio, THE Sistema_de_Animaciones SHALL aplicar un efecto Hover de escala con factor entre 1.02 y 1.05 o una elevación de sombra visible respecto al estado de reposo
4. WHEN la Sección de Servicios entra en el Viewport durante el scroll, THE Sistema_de_Animaciones SHALL aplicar un efecto Slide Up escalonado a cada tarjeta con un retardo entre tarjetas de 100ms a 200ms

### Requisito 5: Sección de Proyectos Destacados

**Historia de Usuario:** Como cliente potencial, quiero ver proyectos reales completados por Luis Porto, para evaluar la calidad de su trabajo y su experiencia en proyectos similares al mío.

#### Criterios de Aceptación

1. THE Sección de Proyectos SHALL mostrar tres Tarjeta_de_Proyecto en el siguiente orden: "MiConsultorio" (sistema de gestión médica con funcionalidades de agenda médica, gestión de pacientes, historia clínica y control de citas, tecnologías Next.js, PostgreSQL, Supabase), "Sistema de Riñas de Gallos" (plataforma de administración de eventos y estadísticas con funcionalidades de gestión de ejemplares, programación de peleas, estadísticas y reportes, tecnologías Next.js, PostgreSQL), y "Porto Soluciones" (sitio corporativo con landing corporativa, captación de clientes y SEO optimizado, tecnologías Next.js, Tailwind CSS)
2. THE Tarjeta_de_Proyecto SHALL mostrar el nombre del proyecto, una descripción de máximo 150 caracteres, las funcionalidades definidas en el criterio 1 como lista de viñetas, y las tecnologías utilizadas como badges
3. THE Tarjeta_de_Proyecto SHALL aplicar fondo #111827 y un borde de 1px con gradiente
4. WHEN el usuario posiciona el cursor sobre una Tarjeta_de_Proyecto, THE Sistema_de_Animaciones SHALL aplicar una transición de 300ms que eleve la tarjeta (translateY de -4px) y aumente la opacidad del borde con gradiente al 100%
5. WHILE el viewport es menor a 768px, THE Sección de Proyectos SHALL mostrar las Tarjeta_de_Proyecto apiladas en una sola columna

### Requisito 6: Sección de Tecnologías

**Historia de Usuario:** Como cliente potencial, quiero conocer las tecnologías que domina Luis Porto, para verificar que maneja las herramientas relevantes para mi proyecto.

#### Criterios de Aceptación

1. THE Sección de Tecnologías SHALL mostrar iconos representativos de las siguientes tecnologías: Next.js, React, TypeScript, PostgreSQL, Supabase, Tailwind CSS, Git y Vercel
2. THE Sección de Tecnologías SHALL mostrar el nombre de cada tecnología debajo de su icono correspondiente
3. WHEN la Sección de Tecnologías entra en el Viewport durante el scroll, THE Sistema_de_Animaciones SHALL aplicar un efecto Fade In escalonado a cada icono de tecnología con un retardo de entre 50ms y 150ms entre cada elemento
4. WHEN el usuario posiciona el cursor sobre un icono de tecnología, THE Sistema_de_Animaciones SHALL aplicar un efecto Hover de escala o elevación consistente con los efectos Hover definidos en otras secciones del Portafolio
5. THE Sección de Tecnologías SHALL mostrar un título de sección visible que identifique el contenido como las tecnologías o stack tecnológico utilizado

### Requisito 7: Sección de Experiencia

**Historia de Usuario:** Como cliente potencial, quiero ver la trayectoria profesional de Luis Porto, para evaluar su experiencia y compromiso profesional.

#### Criterios de Aceptación

1. THE Sección de Experiencia SHALL presentar un Timeline vertical con la entrada: período "2024 - Actualidad", título "Fundador", empresa "Porto Soluciones", descripción "Desarrollo de soluciones empresariales y aplicaciones web modernas", mostrando cada dato en una línea o bloque diferenciado junto a un indicador circular sobre la línea vertical
2. THE Timeline SHALL utilizar el color principal #4F46E5 como color de la línea vertical y del indicador circular de cada entrada
3. WHEN la Sección de Experiencia entra en el Viewport durante el scroll, THE Sistema_de_Animaciones SHALL aplicar un efecto Fade In al Timeline con una duración máxima de 600ms
4. WHEN el Viewport tiene un ancho menor a 768px, THE Timeline SHALL mantener su orientación vertical adaptando el ancho al 100% del contenedor disponible
5. THE Sección de Experiencia SHALL utilizar una estructura semántica de lista para representar las entradas del Timeline, incluyendo atributos aria-label que identifiquen la sección como "Experiencia profesional"

### Requisito 8: Sección CTA Final

**Historia de Usuario:** Como visitante interesado, quiero una forma clara de contactar a Luis Porto al final del sitio, para iniciar una conversación comercial.

#### Criterios de Aceptación

1. THE Sección CTA Final SHALL mostrar el título "¿Tienes un proyecto en mente?" y el texto "Estoy disponible para ayudarte a construir soluciones digitales modernas y escalables"
2. THE Sección CTA Final SHALL incluir un botón con el texto "Contactar por WhatsApp" que enlace a una URL con formato `https://wa.me/{número}` y que contenga el atributo target="_blank" y rel="noopener noreferrer"
3. WHEN el usuario hace clic en el botón "Contactar por WhatsApp", THE Sección CTA Final SHALL abrir la URL de WhatsApp en una nueva pestaña del navegador
4. THE Sección CTA Final SHALL incluir un botón con el texto "Enviar correo" que enlace a una URL con protocolo `mailto:` conteniendo la dirección de correo de destino
5. WHEN el usuario hace clic en el botón "Enviar correo", THE Sección CTA Final SHALL abrir el cliente de correo predeterminado del usuario con la dirección de destino pre-completada en el campo "Para"
6. THE Sección CTA Final SHALL aplicar un fondo con gradiente lineal que transite entre el color principal #4F46E5 y el color secundario #7C3AED

### Requisito 9: Footer

**Historia de Usuario:** Como visitante del portafolio, quiero ver información legal y enlaces a redes sociales, para poder conectar con Luis Porto en otras plataformas.

#### Criterios de Aceptación

1. THE Footer SHALL mostrar el texto "Luis Porto © 2026"
2. THE Footer SHALL incluir enlaces funcionales a GitHub, LinkedIn y WhatsApp que abran en una nueva pestaña con los atributos target="_blank" y rel="noopener noreferrer"
3. THE Footer SHALL utilizar el fondo principal del Tema_Oscuro #0B0F19
4. THE Footer SHALL incluir atributos aria-label en cada enlace social que describa el destino del enlace

### Requisito 10: Tema Visual y Diseño

**Historia de Usuario:** Como visitante del portafolio, quiero una experiencia visual premium y consistente, para percibir profesionalismo y confianza.

#### Criterios de Aceptación

1. THE Portafolio SHALL utilizar la tipografía Inter como fuente principal en toda la aplicación con fallback a system-ui, sans-serif
2. THE Portafolio SHALL aplicar el Tema_Oscuro de forma consistente en todas las Secciones, usando el color de fondo #0B0F19 para el body y #111827 para tarjetas y elementos contenedores
3. THE Portafolio SHALL aplicar efectos de Glassmorphism en Tarjeta_de_Servicio y Tarjeta_de_Proyecto, implementado como backdrop-filter blur de al menos 8px combinado con un fondo semi-transparente y un borde de 1px con opacidad reducida
4. THE Portafolio SHALL aplicar gradientes lineales entre los colores #4F46E5 y #7C3AED en bordes de tarjetas, fondo de la sección CTA Final y elementos decorativos de acento

### Requisito 11: Animaciones y Microinteracciones

**Historia de Usuario:** Como visitante del portafolio, quiero animaciones elegantes y sutiles, para tener una experiencia fluida y moderna sin distracciones.

#### Criterios de Aceptación

1. THE Sistema_de_Animaciones SHALL implementar todas las animaciones de transición y entrada usando la librería Framer Motion
2. WHEN una Sección entra en el Viewport por primera vez con al menos un 20% de su altura visible, THE Sistema_de_Animaciones SHALL activar la animación de entrada correspondiente (Fade In con opacidad de 0 a 1, o Slide Up con desplazamiento vertical de 20px a 0)
3. THE Sistema_de_Animaciones SHALL aplicar una animación flotante continua a la fotografía del Hero con un desplazamiento vertical máximo de 10px y un ciclo de repetición de 3 segundos
4. THE Sistema_de_Animaciones SHALL mantener una duración máxima de 600ms por animación de entrada para evitar retrasos perceptibles
5. WHILE las animaciones se ejecutan, THE Sistema_de_Animaciones SHALL mantener un rendimiento de al menos 60 FPS sin causar reflow del layout
6. IF el usuario tiene activada la preferencia prefers-reduced-motion en su sistema operativo, THEN THE Sistema_de_Animaciones SHALL desactivar todas las animaciones de movimiento y transición, mostrando los elementos en su estado final de forma inmediata

### Requisito 12: Diseño Responsivo

**Historia de Usuario:** Como visitante, quiero acceder al portafolio desde cualquier dispositivo, para tener una experiencia óptima independientemente del tamaño de pantalla.

#### Criterios de Aceptación

1. THE Portafolio SHALL adaptar su layout a los siguientes breakpoints: móvil (menor a 768px), tablet (768px a 1023px) y escritorio (1024px o mayor), mostrando diferencias observables en la distribución de columnas o el tamaño de los componentes entre cada breakpoint
2. THE Portafolio SHALL seguir la estrategia Mobile First en la implementación de estilos, utilizando media queries basadas en min-width para aplicar estilos progresivos hacia viewports más amplios
3. WHILE el viewport tiene un ancho menor a 768px, THE Portafolio SHALL reorganizar todas las grillas de múltiples columnas a una sola columna
4. THE Portafolio SHALL ser completamente funcional y legible en dispositivos con ancho mínimo de 320px, asegurando que el texto tenga un tamaño mínimo de 16px en móvil, que ningún elemento interactivo tenga un área de toque menor a 44x44px, y que no se produzca truncamiento de contenido ni superposición entre elementos
5. THE Portafolio SHALL no presentar desbordamiento horizontal (scroll horizontal) en ningún viewport con ancho entre 320px y 1920px

### Requisito 13: SEO y Metadatos

**Historia de Usuario:** Como propietario del portafolio, quiero que mi sitio sea encontrable en motores de búsqueda, para atraer clientes potenciales de forma orgánica.

#### Criterios de Aceptación

1. THE Portafolio SHALL incluir la etiqueta title con el valor "Luis Porto | Full Stack Developer"
2. THE Portafolio SHALL incluir la meta description con el valor "Portafolio profesional de Luis Porto. Desarrollo de aplicaciones web modernas, sistemas empresariales y soluciones digitales escalables."
3. THE Portafolio SHALL incluir meta keywords con los valores: Luis Porto, Full Stack Developer, Next.js, PostgreSQL, Supabase, Desarrollo Web, Software Empresarial, Colombia
4. THE Portafolio SHALL incluir metadatos Open Graph con las siguientes propiedades: og:title con el valor "Luis Porto | Full Stack Developer", og:description con el valor de la meta description, og:image con una imagen de al menos 1200x630 píxeles referenciada mediante URL absoluta, og:type con el valor "website" y og:url con la URL canónica del sitio
5. THE Portafolio SHALL establecer el atributo lang del documento HTML como "es" para indicar idioma español
6. THE Portafolio SHALL incluir metadatos Twitter Card con las propiedades twitter:card con el valor "summary_large_image", twitter:title con el valor del og:title y twitter:description con el valor del og:description

### Requisito 14: Rendimiento y Calidad de Código

**Historia de Usuario:** Como propietario del portafolio, quiero que el sitio cargue rápidamente y tenga código mantenible, para ofrecer una buena experiencia y facilitar actualizaciones futuras.

#### Criterios de Aceptación

1. WHEN se ejecuta un análisis de Lighthouse en modo mobile con throttling estándar (Simulated Throttling) sobre cualquier página del Portafolio, THE Portafolio SHALL obtener una puntuación superior a 90 en todas las categorías (Performance, Accessibility, Best Practices, SEO)
2. THE Portafolio SHALL renderizar todas las imágenes mediante el componente next/image con formato de salida WebP o AVIF y con lazy loading activado para imágenes fuera del viewport inicial
3. THE Portafolio SHALL organizar el código en componentes con tipado estricto de TypeScript (opción strict habilitada en tsconfig.json) sin uso de tipo "any" explícito, y cada componente de UI reutilizado en al menos 2 ubicaciones distintas del sitio SHALL estar extraído en un archivo independiente
4. THE Portafolio SHALL utilizar la arquitectura de App Router de Next.js con Server Components por defecto, y SHALL usar Client Components únicamente en componentes que requieran hooks de estado, efectos, event listeners del navegador o APIs exclusivas del cliente
5. IF una imagen no carga correctamente, THEN THE Portafolio SHALL mostrar un placeholder visual que mantenga las dimensiones del layout

### Requisito 15: Accesibilidad

**Historia de Usuario:** Como visitante con necesidades de accesibilidad, quiero poder navegar y consumir el contenido del portafolio, para obtener la información sin barreras.

#### Criterios de Aceptación

1. THE Portafolio SHALL incluir atributos alt en todas las imágenes, donde las imágenes informativas contengan texto alternativo de al menos 5 caracteres que describa el contenido o función de la imagen, y las imágenes decorativas utilicen alt vacío (alt="")
2. THE Portafolio SHALL mantener un contraste de color mínimo de 4.5:1 entre texto y fondo según las pautas WCAG 2.1 AA
3. THE Portafolio SHALL ser navegable completamente usando teclado, con un orden de tabulación lógico que siga el flujo visual del contenido, indicadores de foco con un contraste mínimo de 3:1 respecto al fondo adyacente, y sin trampas de foco en ningún componente
4. THE Portafolio SHALL utilizar etiquetas semánticas HTML (header, nav, main, section, footer) para estructurar el contenido, con exactamente un elemento main por página y landmarks que envuelvan todo el contenido visible
5. THE Portafolio SHALL proporcionar etiquetas aria-label en todos los elementos interactivos que carezcan de texto visible, con un valor mínimo de 3 caracteres que indique la acción o destino del elemento
