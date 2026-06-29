# localProcess_Manager

**localProcess_Manager** es un entorno modular y estructurado diseñado para estandarizar y optimizar el flujo de trabajo colaborativo entre desarrolladores de software y agentes de Inteligencia Artificial (IA) en entornos CLI (línea de comandos) y terminales.

---

## 🎯 Propósito del Repositorio
El propósito principal de este repositorio es proporcionar una arquitectura estandarizada que permita a cualquier programador interactuar con asistentes de IA de manera predecible, ordenada y eficiente, manteniendo un control absoluto sobre el código y maximizando el contexto disponible para el modelo.

---

## 💡 ¿Qué Resuelve?
Al trabajar con agentes de IA autónomos o semiautónomos en desarrollo, es común enfrentarse a varios problemas recurrentes. **localProcess_Manager** los resuelve de la siguiente forma:

1. **Pérdida de Contexto:** Al aislar el espacio operativo y definir directorios de entrada/salida temporales, evita que la IA acumule logs de terminal masivos innecesarios en su ventana de contexto.
2. **Configuración Acoplada:** Separa las preferencias personales del programador (tono, didáctica, idioma del agente) de las especificaciones y estándares técnicos del código fuente del proyecto (frameworks, metodologías, CSS).
3. **Pérdida de Aprendizajes Clave:** Mediante un módulo dedicado a la persistencia (`ai-memory/`), el agente recuerda de manera indefinida las correcciones hechas por el desarrollador y las lecciones aprendidas en sesiones anteriores.
4. **Modificación de Código No Solicitada (Regla de Oro):** Implementa reglas de sistema estrictas para que la IA actúe como un tutor/guía didáctico y no modifique ni autocomplete archivos directamente a menos que el usuario lo pida explícitamente, favoreciendo el aprendizaje y la revisión.

---

## 🏗️ Arquitectura del Repositorio

```plaintext
localProcess_Manager/
├── README.md                     # Esta guía de uso y documentación
├── LICENSE                       # Licencia de código abierto MIT en español
├── control_checkpoints.md        # Registro y control del estado del entorno
├── prompt.md                     # System Prompt compilado y listo para alimentar a la IA
├── user-config/                  # Configuración modular desacoplada
│   ├── 1.developer-config.md     # Ajustes del programador (Nombre, tono, idioma, nivel de didáctica)
│   └── 2.project-config.md       # Estándares del proyecto (Stack, directorios, CSS, asincronía)
├── ai-memory/                    # Memoria persistente del agente
│   ├── perfil_usuario.md         # Preferencias y perfil del programador
│   ├── aprendizajes_clave.md     # Lecciones aprendidas y reglas corregidas a recordar
│   └── bitacora_tareas.md        # Historial de tareas completadas
├── workspace/                    # Espacio operativo temporal
│   ├── inputs/                   # Fragmentos de código, archivos o documentación que subes a la IA
│   └── outputs/                  # Borradores, análisis o reportes que la IA genera antes de ser aplicados
└── tools/                        # Compilador y capacidades del agente
    ├── esquema_funciones.json    # JSON con el esquema de herramientas/funciones disponibles (Function Calling)
    └── compilar_prompt.js        # Script Node.js encargado de unir las configuraciones en prompt.md
```

---

## 🛠️ Tecnologías Utilizadas
- **Node.js:** Motor ejecutor del compilador del prompt base.
- **Markdown:** Utilizado para almacenar configuraciones legibles, documentación de contexto y la persistencia de memoria.
- **JSON / JSON Schema:** Estructuración de herramientas locales e integración con modelos mediante Function Calling.

---

## 🚀 ¿Cómo Empezar y Correrlo?

### 1. Clonar el repositorio
Clona esta estructura en el mismo directorio donde tengas tus repositorios de desarrollo locales.

### 2. Configurar tus Preferencias
Edita las tablas Markdown en los archivos correspondientes dentro de `user-config/`:
- Configura tu nombre, el acento/personalidad de tu agente y el estilo de ayuda en [1.developer-config.md](file:///home/dev-jonathan/Escritorio/desarrollos/localProcess_Manager/user-config/1.developer-config.md).
- Configura la ruta local, el archivo de contexto y los estándares técnicos de tu proyecto en [2.project-config.md](file:///home/dev-jonathan/Escritorio/desarrollos/localProcess_Manager/user-config/2.project-config.md).

### 3. Compilar el Prompt
Una vez que hayas modificado las tablas de configuración, compila el archivo final de instrucciones ejecutando en tu consola:
```bash
node tools/compilar_prompt.js
```
Esto generará o actualizará automáticamente el archivo [prompt.md](file:///home/dev-jonathan/Escritorio/desarrollos/localProcess_Manager/prompt.md) con las variables inyectadas.

### 4. Inicializar tu Agente
Puedes inicializar tu asistente de inteligencia artificial preferido pasándole el prompt compilado e inyectando tu archivo de contexto técnico.

*Ejemplo usando Antigravity CLI:*
```bash
agy chat --system prompt.md --file [nombre-de-tu-contexto].md
```

*Ejemplo usando Gemini CLI:*
```bash
gemini-cli --system prompt.md --context [nombre-de-tu-contexto].md
```

---

## 💡 Sugerencias y Flujo Recomendado

1. **Uso de Inputs:** En lugar de pegar fragmentos gigantes de código directamente en el chat de la terminal, colócalos en `workspace/inputs/` y dile a la IA: *"Analiza el archivo en `workspace/inputs/controlador.js`"*. Esto mantiene la consola limpia.
2. **Uso de Outputs:** Solicita a la IA que deposite los resultados de generación de código largos o reportes pesados en `workspace/outputs/`. Así podrás revisarlos y probarlos antes de moverlos de forma manual a tu repositorio principal.
3. **Memoria y Errores:** Si la IA repite un error o no respeta una preferencia, agrégala en [aprendizajes_clave.md](file:///home/dev-jonathan/Escritorio/desarrollos/localProcess_Manager/ai-memory/aprendizajes_clave.md). Al inicio de cada sesión de chat, pídele al agente que lea ese archivo para que nunca lo olvide.

---

## 👥 Quién lo Desarrolló
Este estándar ha sido conceptualizado, desarrollado y mantenido por **Jonathan (dev-jonathan)**, enfocado en estructurar mejores entornos didácticos de desarrollo asistido por Inteligencia Artificial de forma local. ¡Las sugerencias y contribuciones de la comunidad son bienvenidas!

---

## 🎁 Extras y Licencia
- **Contribuciones:** Si tienes sugerencias sobre cómo optimizar la bitácora o quieres proponer scripts alternativos de compilación, siéntete libre de abrir un Pull Request.
- **Licencia:** Este repositorio se distribuye bajo la licencia **MIT** en español (ver archivo [LICENSE](file:///home/dev-jonathan/Escritorio/desarrollos/localProcess_Manager/LICENSE)). Eres libre de usarlo, modificarlo y compartirlo para tus propios desarrollos personales o profesionales.
