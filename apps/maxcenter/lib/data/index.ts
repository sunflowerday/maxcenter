// Re-exports for backward compatibility
// Types
export type {
  Voice,
  UserVoice,
  Comment,
  UseCase,
  HourlyActivity,
  Customer,
  Human,
  AgentSuggestion,
  BenchmarkTask,
  ArchitectureScore,
  BenchmarkRun,
  PinchBenchTask,
} from "./types"

// Data
export { useCases } from "./use-cases"
export { customers } from "./customers"
export { humans } from "./humans"
export { agentSuggestions, benchmarkRuns } from "./agents"
export { voices, PLATFORM_OPTIONS } from "./voices"
export { pinchBenchTasks, PINCHBENCH_FILTER_OPTIONS } from "./bench"

// Hierarchical clustering data (Bench -> Use Cases -> Personas)
export {
  useCaseClusters,
  scenarioDistribution,
  domainDistribution,
  getUseCasesByPersona,
  getPersonasByUseCase,
  getRelatedUseCases,
} from "./use-case-clusters"
export {
  personas,
  platformDistribution,
  knowledgeLevelDistribution,
  sharedUseCases,
  getPersonaById,
  getPersonasByKnowledgeLevel,
  getPersonasByPlatform,
  getPersonaRelationship,
  getPersonaNetwork,
} from "./personas"

// Types
export type {
  UseCaseCluster,
  Persona,
} from "./use-case-clusters"
