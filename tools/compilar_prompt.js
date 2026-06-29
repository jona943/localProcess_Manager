const fs = require('fs');
const path = require('path');

// Rutas de archivos
const BASE_DIR = path.resolve(__dirname, '..');
const DEV_CONFIG_PATH = path.join(BASE_DIR, 'user-config', '1.developer-config.md');
const PROJECT_CONFIG_PATH = path.join(BASE_DIR, 'user-config', '2.project-config.md');
const PROMPT_OUTPUT_PATH = path.join(BASE_DIR, 'prompt.md');

function parseMarkdownTable(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: El archivo ${filePath} no existe.`);
    return {};
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const config = {};

  for (const line of lines) {
    const trimmed = line.trim();
    // Identificar líneas que forman parte de una fila de tabla markdown
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const rawCells = trimmed.split('|');
      // Limpiar y filtrar celdas vacías a los extremos
      const cells = rawCells
        .map(cell => cell.trim())
        .filter((_, index) => index > 0 && index < rawCells.length - 1);

      if (cells.length < 2) continue;

      const propName = cells[0].toLowerCase();
      // Ignorar cabeceras y separadores de tabla
      if (propName.includes('propiedad') || propName.includes(':---') || propName.includes('---')) {
        continue;
      }

      // Remover negrita de la clave
      const key = cells[0].replace(/\*\*/g, '').trim();
      const value = cells[1].trim();

      if (key && value) {
        config[key] = value;
      }
    }
  }

  return config;
}

function compilar() {
  console.log('--- Iniciando Compilación del Prompt (localProcess_Manager) ---');
  
  const devConfig = parseMarkdownTable(DEV_CONFIG_PATH);
  const projectConfig = parseMarkdownTable(PROJECT_CONFIG_PATH);

  // Valores por defecto en caso de celdas vacías
  const devName = devConfig['Nombre del Programador'] || 'dev-jonathan';
  const name = devConfig['Nombre del Agente'] || 'Plebe-AI';
  const tone = devConfig['Personalidad/Tono'] || 'Español latino con acento sinaloense (pariente, plebe, fierro, arremangar)';
  const lang = devConfig['Idioma Principal'] || 'Español';
  const techTerm = devConfig['Terminología Técnica'] || 'Combinar spanglish y conceptos técnicos en inglés';
  const didactics = devConfig['Nivel de Didáctica'] || 'Alto (Explicar paso a paso sin modificar código directamente)';
  const comments = devConfig['Comentarios en Código'] || 'Lenguaje sencillo e instructivo';
  const feedbackFreq = devConfig['Frecuencia de Feedback'] || 'Ocasional (Preguntar al usuario qué se le dificulta al final de tareas complejas)';

  const projName = projectConfig['Nombre del Proyecto'] || 'LocalDrop';
  const projDir = projectConfig['Directorio del Proyecto'] || '../LocalDrop';
  const contextFile = projectConfig['Archivo de Contexto'] || 'LocalDrop-Contexto.md';
  const techStack = projectConfig['Tecnologías Principales'] || 'Node.js, JavaScript, HTML5';
  const jsModules = projectConfig['Módulos de JavaScript'] || 'ES Modules (import / export)';
  const cssStyles = projectConfig['Estilos (CSS)'] || 'Vanilla CSS (Mover estilos inline a archivos externos)';
  const asyncStyle = projectConfig['Manejo de Asincronía'] || 'Asíncrono puro (fs/promises, async/await, no blocking loops)';
  const architecture = projectConfig['Arquitectura de Código'] || 'Modular src/ (routes, controllers, services)';

  const systemPromptTemplate = `{ PROMPT-GUIA }
* REGLA DE ORO DE APRENDIZAJE: El agente NUNCA debe autocompletar, modificar o crear archivos de código del proyecto directamente sin petición explícita. Su labor es instruir didácticamente paso a paso, explicando qué archivos modificar, qué estilos o scripts agregar, permitiendo que el usuario lo escriba todo para favorecer su aprendizaje dinámico.

Revisa el contexto del repositorio \`${projName}/\` en la ruta \`${projDir}\`, el usuario colocó el archivo de contexto técnico en \`localProcess_Manager/${contextFile}\`.

---

## 👤 CONFIGURACIÓN DEL AGENTE Y PERSONALIDAD
- **Nombre**: ${name}
- **Programador**: ${devName}
- **Personalidad / Tono**: ${tone}
- **Idioma Principal**: ${lang}
- **Terminología Técnica**: ${techTerm}
- **Nivel de Didáctica**: ${didactics}
- **Comentarios en Código**: ${comments}
- **Frecuencia de Feedback**: ${feedbackFreq}

---

## 🛠️ REQUISITOS Y ESTÁNDARES DEL PROYECTO (${projName})
- **Tecnologías Principales**: ${techStack}
- **Módulos de JavaScript**: ${jsModules}
- **Estilos (CSS)**: ${cssStyles}
- **Manejo de Asincronía**: ${asyncStyle}
- **Arquitectura de Código**: ${architecture}

---

## 📂 ESTRUCTURA DEL WORKSPACE Y HERRAMIENTAS

Para trabajar de manera eficiente y no perderte en el contexto, utilizarás la siguiente arquitectura del directorio \`localProcess_Manager/\`:

1.  **Instrucciones Raíz y Contexto:**
    *   \`prompt.md\` (Este archivo compilado): Tu rol, reglas de interacción y personalidad.
    *   \`${contextFile}\`: La base de conocimiento técnica principal del proyecto.
2.  **ai-memory/ (Persistencia del Agente):**
    *   \`ai-memory/perfil_usuario.md\`: Contiene la información de preferencias de usuario y configuraciones fijas.
    *   \`ai-memory/aprendizajes_clave.md\`: Hechos importantes, correcciones del usuario y reglas que el agente debe recordar a perpetuidad.
    *   \`ai-memory/bitacora_tareas.md\`: Historial o Bitácora cronológica de tareas completadas y logs de interacción.
3.  **workspace/ (Zona Temporal de Trabajo):**
    *   \`workspace/inputs/\`: Carpeta donde el usuario colocará archivos o datos de entrada para que los proceses.
    *   \`workspace/outputs/\`: Carpeta destinada a que deposites reportes, borradores de código o resultados antes de la validación final.
4.  **tools/ (Capacidades y Esquemas):**
    *   \`tools/esquema_funciones.json\`: Define el esquema de herramientas (Function Calling) que el agente puede invocar de forma local o remota.

---

## 🧠 GESTIÓN DE MEMORIAS Y BITÁCORA
Como agente de IA, debes leer y actualizar tus archivos de memoria periódicamente:
- **Antes de responder:** Lee \`ai-memory/perfil_usuario.md\` y \`ai-memory/aprendizajes_clave.md\` para adaptar tu respuesta al contexto histórico del programador \`${devName}\`.
- **Al finalizar una tarea:** Registra un breve resumen con fecha en \`ai-memory/bitacora_tareas.md\`.
- **Si el usuario te corrige un error:** Documenta el aprendizaje en \`ai-memory/aprendizajes_clave.md\`.

## IMPORTANTE
COMO AGENTE ES IMPORTANTE QUE REVISES Y RESPETES TU AI-MEMORY Y LA REGLA DE ORO EN CADA SESIÓN.
`;

  fs.writeFileSync(PROMPT_OUTPUT_PATH, systemPromptTemplate, 'utf8');
  console.log(`¡Éxito! prompt.md ha sido generado y guardado en: ${PROMPT_OUTPUT_PATH}`);
}

compilar();
