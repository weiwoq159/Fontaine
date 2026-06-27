import { create } from "zustand";

import type { ToolManifest } from "@core/domain";
import { listTools } from "@core/bridge/catalog";
interface ToolStoreState {
  tools: ToolManifest[];
  fetchTools: () => void;
}

export const useToolStore = create<ToolStoreState>((set) => ({
  tools: [],
  fetchTools: async () => {
    const res = await listTools();
    set({ tools: res });
  },
}));
