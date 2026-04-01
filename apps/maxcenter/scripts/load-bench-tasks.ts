/**
 * Script to load and parse all finalized YAML bench tasks
 * and generate a TypeScript file with the data.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FINALIZED_DIR = '/Users/yee/Documents/agent/skill/tasks/finalized';
const OUTPUT_FILE = path.join(__dirname, '../lib/data/bench-tasks.ts');

// Finalized YAML 格式
interface YamlTask {
  id: string;
  parent_id?: string | null;
  title_zh?: string;
  title_en?: string;
  safety?: string;
  source?: string;
  related_user_persona?: string[];
  usecase_references?: Array<{
    platform: string;
    title: string;
    url: string;
  }>;
  difficulty?: string;
  type?: string;
  task_phase?: string;
  task_concurrency?: string;
  solution_space?: string;
  output_types?: string | string[];
  domain?: string[];
  tools?: string | string[];
  setup?: {
    initial_message_en?: string;
    initial_message_zh?: string;
    initial_input_type?: string;
    initial_context_completeness?: string;
    hidden_context_en?: string;
    hidden_context_zh?: string;
    constraint_types?: string[];
    fixtures?: any[];
    overall_input_type?: string | null;
  };
  grading_en?: GradingCriterion[] | string;
  grading_zh?: GradingCriterion[] | string;
  notes?: string[];
}

interface ParsedBenchTask {
  id: string;
  parentId: string | null;
  titleZh: string;
  titleEn: string;
  type: string;
  safety: string;
  source: string;
  taskPhase: string;
  taskConcurrency: string;
  solutionSpace: string;
  outputTypes: string[];
  difficulty: string;
  domain: string[];
  tools: string[];
  initialMessageZh: string;
  initialMessageEn: string;
  initialInputType: string;
  initialContextCompleteness: string;
  hiddenContextZh: string;
  hiddenContextEn: string;
  constraintTypes: string[];
  gradingZh: string;
  gradingEn: string;
  relatedUserPersona: any[];
  usecaseReferences: any[];
  notes: string[];
}

function parseTools(tools: string | string[] | undefined): string[] {
  if (!tools) return [];
  if (Array.isArray(tools)) return tools;
  return tools.split(',').map(t => t.trim()).filter(Boolean);
}

function parseOutputTypes(outputTypes: string | string[] | undefined): string[] {
  if (!outputTypes) return [];
  if (Array.isArray(outputTypes)) return outputTypes;
  return outputTypes.split(',').map(t => t.trim()).filter(Boolean);
}

function normalizeDifficulty(difficulty: string | undefined): string {
  if (!difficulty || difficulty === '') return 'medium';
  return difficulty.toLowerCase();
}

// 转换 grading 数组为格式化字符串
type GradingCriterion = {
  name: string;
  weight: number;
  criteria: Record<string, string>;
}

function formatGrading(grading: GradingCriterion[] | string | undefined): string {
  if (!grading) return '';
  if (typeof grading === 'string') return grading;
  if (!Array.isArray(grading)) return '';

  return grading.map(item => {
    const criteriaText = Object.entries(item.criteria)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([score, text]) => `[${score}] ${text}`)
      .join('\n');
    return `${item.name} (权重: ${item.weight})\n${criteriaText}`;
  }).join('\n\n');
}

async function loadBenchTasks(): Promise<ParsedBenchTask[]> {
  const tasks: ParsedBenchTask[] = [];

  const files = fs.readdirSync(FINALIZED_DIR);
  const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

  for (const file of yamlFiles) {
    try {
      const content = fs.readFileSync(path.join(FINALIZED_DIR, file), 'utf-8');
      const data = yaml.load(content) as YamlTask;

      if (!data || !data.id) {
        console.warn(`Skipping ${file}: no id found`);
        continue;
      }

      const task: ParsedBenchTask = {
        id: String(data.id),
        parentId: data.parent_id || null,
        titleZh: data.title_zh || data.title_en || '未命名任务',
        titleEn: data.title_en || data.title_zh || 'Untitled',
        type: data.type || 'openclaw',
        safety: data.safety || 'safe',
        source: data.source || 'unknown',
        taskPhase: data.task_phase || 'Mature-Operation',
        taskConcurrency: data.task_concurrency || 'sequential',
        solutionSpace: data.solution_space || 'many_paths',
        outputTypes: parseOutputTypes(data.output_types),
        difficulty: normalizeDifficulty(data.difficulty),
        domain: data.domain || [],
        tools: parseTools(data.tools),
        initialMessageZh: data.setup?.initial_message_zh || '',
        initialMessageEn: data.setup?.initial_message_en || '',
        initialInputType: data.setup?.initial_input_type || 'text_only',
        initialContextCompleteness: data.setup?.initial_context_completeness || 'complete',
        hiddenContextZh: data.setup?.hidden_context_zh || '',
        hiddenContextEn: data.setup?.hidden_context_en || '',
        constraintTypes: data.setup?.constraint_types || [],
        gradingZh: formatGrading(data.grading_zh),
        gradingEn: formatGrading(data.grading_en),
        relatedUserPersona: data.related_user_persona || [],
        usecaseReferences: data.usecase_references || [],
        notes: data.notes || [],
      };

      tasks.push(task);
    } catch (err) {
      console.error(`Error parsing ${file}:`, err);
    }
  }

  // Sort by numeric ID
  tasks.sort((a, b) => {
    const numA = parseInt(a.id, 10);
    const numB = parseInt(b.id, 10);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return String(a.id).localeCompare(String(b.id));
  });

  console.log(`Loaded ${tasks.length} bench tasks from ${FINALIZED_DIR}`);
  return tasks;
}

function generateTypescript(tasks: ParsedBenchTask[]): string {
  const tasksJson = JSON.stringify(tasks, null, 2);

  return `// Auto-generated bench tasks from finalized YAML files
// Generated at: ${new Date().toISOString()}

export interface UseCaseReference {
  platform: string;
  title: string;
  url: string;
}

export interface MigratedBenchTask {
  id: string;
  parentId: string | null;
  titleZh: string;
  titleEn: string;
  type: string;
  safety: string;
  source: string;
  taskPhase: string;
  taskConcurrency: string;
  solutionSpace: string;
  outputTypes: string[];
  difficulty: string;
  domain: string[];
  tools: string[];
  initialMessageZh: string;
  initialMessageEn: string;
  initialInputType: string;
  initialContextCompleteness: string;
  hiddenContextZh: string;
  hiddenContextEn: string;
  constraintTypes: string[];
  gradingZh: string;
  gradingEn: string;
  relatedUserPersona: any[];
  usecaseReferences: UseCaseReference[];
  notes: string[];
}

export const migratedBenchTasks: MigratedBenchTask[] = ${tasksJson};

export const DIFFICULTY_OPTIONS = [
  { value: "all", label: "全部" },
  { value: "short", label: "短任务" },
  { value: "medium", label: "中等" },
  { value: "long", label: "长任务" },
  { value: "ultra_long", label: "超长任务" },
  { value: "single_step", label: "单步任务" },
];

export const TYPE_OPTIONS = [
  { value: "all", label: "全部" },
  { value: "manus", label: "Manus" },
  { value: "openclaw", label: "OpenClaw" },
  { value: "claude co-work", label: "Claude Co-work" },
];

export const typeBadgeColors: Record<string, { bg: string; text: string }> = {
  manus: { bg: "bg-gray-500/10", text: "text-gray-600" },
  openclaw: { bg: "bg-green-500/10", text: "text-green-600" },
  "claude co-work": { bg: "bg-yellow-500/10", text: "text-yellow-600" },
};

export const difficultyBadgeColors: Record<string, { bg: string; text: string }> = {
  short: { bg: "bg-green-500/10", text: "text-green-600" },
  medium: { bg: "bg-blue-500/10", text: "text-blue-600" },
  long: { bg: "bg-orange-500/10", text: "text-orange-600" },
  ultra_long: { bg: "bg-red-500/10", text: "text-red-600" },
  single_step: { bg: "bg-purple-500/10", text: "text-purple-600" },
};

export const safetyBadgeColors: Record<string, { bg: string; text: string }> = {
  safe: { bg: "bg-green-500/10", text: "text-green-600" },
  unsafe: { bg: "bg-red-500/10", text: "text-red-600" },
  unknown: { bg: "bg-gray-500/10", text: "text-gray-600" },
};

export const taskPhaseLabels: Record<string, string> = {
  "Exploration": "探索阶段",
  "In-Progress": "进行中",
  "Mature-Operation": "成熟运营",
};

export const concurrencyLabels: Record<string, string> = {
  "sequential": "顺序执行",
  "concurrent_independent": "独立并发",
  "concurrent_dependent": "依赖并发",
};

export const solutionSpaceLabels: Record<string, string> = {
  "single_path": "单一路径",
  "few_paths": "少数路径",
  "many_paths": "多路径",
  "open_ended": "开放式",
};

export const contextCompletenessLabels: Record<string, string> = {
  "complete": "完整",
  "mostly_complete": "基本完成",
  "under_specified": "欠规范",
  "severely_under_specified": "严重欠规范",
};

export const constraintTypeLabels: Record<string, string> = {
  "explicit": "显式约束",
  "implicit": "隐式约束",
  "soft": "软约束",
  "hard": "硬约束",
  "temporal": "时间约束",
};

export const getDomainOptions = (tasks: MigratedBenchTask[]) => {
  const domains = new Set<string>();
  tasks.forEach(t => {
    t.domain.forEach(d => domains.add(d));
  });
  return [{ value: "all", label: "全部" }, ...Array.from(domains).sort().map(d => ({ value: d, label: d.replace(/[_-]/g, " ") }))];
};

export const getToolOptions = (tasks: MigratedBenchTask[]) => {
  const tools = new Set<string>();
  tasks.forEach(t => {
    t.tools.forEach(tool => tools.add(tool));
  });
  return [{ value: "all", label: "全部" }, ...Array.from(tools).sort().map(t => ({ value: t, label: t.replace(/_/g, " ") }))];
};

export const DOMAIN_LABELS: Record<string, string> = {
  "all": "全部",
  "Business-Operations": "业务运营",
  "Software-Engineering": "软件工程",
  "Marketing": "营销增长",
  "Data-Science": "数据科学",
  "Product-Management": "产品管理",
  "Finance": "金融",
  "Creative": "创意",
  "Education": "教育",
  "Healthcare": "医疗健康",
  "Customer-Service": "客户服务",
  "Media-Entertainment": "媒体娱乐",
};

export const DOMAIN_COLORS: Record<string, string> = {
  "Business-Operations": "text-blue-500",
  "Software-Engineering": "text-green-500",
  "Marketing": "text-purple-500",
  "Data-Science": "text-yellow-500",
  "Product-Management": "text-pink-500",
  "Finance": "text-emerald-500",
  "Creative": "text-orange-500",
  "Education": "text-cyan-500",
  "Healthcare": "text-red-500",
  "Customer-Service": "text-indigo-500",
  "Media-Entertainment": "text-violet-500",
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  "short": "短任务",
  "medium": "中等",
  "long": "长任务",
  "ultra_long": "超长任务",
  "single_step": "单步任务",
};

export const TYPE_LABELS: Record<string, string> = {
  "all": "全部",
  "manus": "Manus",
  "openclaw": "OpenClaw",
  "claude co-work": "Claude Co-work",
};

export const TOOL_LABELS: Record<string, string> = {
  "file_system": "文件系统",
  "code_execution": "代码执行",
  "api_call": "API 调用",
  "web_browser": "浏览器",
  "communication": "通信",
  "database": "数据库",
};
`;
}

async function main() {
  console.log('Loading bench tasks from finalized YAML files...');
  const tasks = await loadBenchTasks();

  console.log('Generating TypeScript file...');
  const tsContent = generateTypescript(tasks);

  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf-8');
  console.log(`Generated ${OUTPUT_FILE} with ${tasks.length} tasks`);
}

main().catch(console.error);
