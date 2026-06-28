import { create } from "zustand";

import { listTools } from "@core/bridge/catalog";
import type { ToolManifest } from "@core/domain";
import type { StatItem } from "@workshop/shared/stats";
import {
  getToolCategoryMeta,
  type ToolCategoryKey,
  type ToolCategoryMeta,
  type ToolStatusFilter,
} from "@workshop/shared/tool-meta";

export const statusFilters: ToolStatusFilter[] = ["all", "available", "disabled", "hidden", "agent-enabled"];

interface ToolStoreState {
  tools: ToolManifest[];
  isLoading: boolean;
  selectedCategory: ToolCategoryKey;
  selectedStatus: ToolStatusFilter;
  searchText: string;
  stats: StatItem[];
  categoryCounts: Record<string, number>;
  categoryOptions: ToolCategoryMeta[];
  statusCounts: Record<ToolStatusFilter, number>;
  filteredTools: ToolManifest[];
  fetchTools: () => Promise<void>;
  setSelectedCategory: (category: ToolCategoryKey) => void;
  setSelectedStatus: (status: ToolStatusFilter) => void;
  setSearchText: (value: string) => void;
}

interface CatalogComputedState {
  stats: StatItem[];
  categoryCounts: Record<string, number>;
  categoryOptions: ToolCategoryMeta[];
  statusCounts: Record<ToolStatusFilter, number>;
  filteredTools: ToolManifest[];
}

function getCategoryCounts(tools: ToolManifest[]) {
  return tools.reduce<Record<string, number>>((counts, tool) => {
    counts[tool.categoryKey] = (counts[tool.categoryKey] ?? 0) + 1;
    return counts;
  }, {});
}

function getCatalogStats(tools: ToolManifest[]): StatItem[] {
  const availableCount = tools.filter((tool) => tool.status === "available").length;
  const agentToolCount = tools.filter((tool) => tool.agent?.enabled).length;
  const categoryCount = Object.keys(getCategoryCounts(tools)).length;
  const guardedCount = tools.filter((tool) => !tool.agent?.enabled).length;

  return [
    {
      label: "本地应用",
      value: tools.length,
      desc: "全部来自 manifest.json",
    },
    {
      label: "可用应用",
      value: availableCount,
      desc: "可直接进入工作流",
    },
    {
      label: "Agent 工具",
      value: agentToolCount,
      desc: "允许 Agent 调度",
    },
    {
      label: "分类数量",
      value: categoryCount,
      desc: `需人工确认 ${guardedCount}`,
    },
  ];
}

function getStatusCounts(tools: ToolManifest[]): Record<ToolStatusFilter, number> {
  return {
    all: tools.length,
    available: tools.filter((tool) => tool.status === "available").length,
    disabled: tools.filter((tool) => tool.status === "disabled").length,
    hidden: tools.filter((tool) => tool.status === "hidden").length,
    "agent-enabled": tools.filter((tool) => tool.agent?.enabled).length,
  };
}

function filterTools(
  tools: ToolManifest[],
  categoryKey: ToolCategoryKey,
  statusFilter: ToolStatusFilter,
  searchText: string,
) {
  const query = searchText.trim().toLowerCase();

  return tools.filter((tool) => {
    const isCategoryMatch = categoryKey === "all" || tool.categoryKey === categoryKey;
    const isStatusMatch =
      statusFilter === "all" ||
      (statusFilter === "agent-enabled" ? tool.agent?.enabled === true : tool.status === statusFilter);
    const isSearchMatch =
      query.length === 0 ||
      [tool.name, tool.description, tool.appKey, tool.categoryKey, ...tool.tags]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return isCategoryMatch && isStatusMatch && isSearchMatch;
  });
}

function getCatalogComputedState(
  tools: ToolManifest[],
  selectedCategory: ToolCategoryKey,
  selectedStatus: ToolStatusFilter,
  searchText: string,
): CatalogComputedState {
  const categoryCounts = getCategoryCounts(tools);

  return {
    stats: getCatalogStats(tools),
    categoryCounts,
    categoryOptions: [getToolCategoryMeta("all"), ...Object.keys(categoryCounts).map(getToolCategoryMeta)],
    statusCounts: getStatusCounts(tools),
    filteredTools: filterTools(tools, selectedCategory, selectedStatus, searchText),
  };
}

const initialComputedState = getCatalogComputedState([], "all", "all", "");

export const useToolStore = create<ToolStoreState>((set) => ({
  tools: [],
  isLoading: false,
  selectedCategory: "all",
  selectedStatus: "all",
  searchText: "",
  ...initialComputedState,
  fetchTools: async () => {
    set({ isLoading: true });
    const tools = await listTools();

    set((state) => ({
      tools,
      isLoading: false,
      ...getCatalogComputedState(tools, state.selectedCategory, state.selectedStatus, state.searchText),
    }));
  },
  setSelectedCategory: (selectedCategory) => {
    set((state) => ({
      selectedCategory,
      ...getCatalogComputedState(state.tools, selectedCategory, state.selectedStatus, state.searchText),
    }));
  },
  setSelectedStatus: (selectedStatus) => {
    set((state) => ({
      selectedStatus,
      ...getCatalogComputedState(state.tools, state.selectedCategory, selectedStatus, state.searchText),
    }));
  },
  setSearchText: (searchText) => {
    set((state) => ({
      searchText,
      ...getCatalogComputedState(state.tools, state.selectedCategory, state.selectedStatus, searchText),
    }));
  },
}));
