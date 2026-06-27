import type { ToolManifest } from "../domain";
import { invokeApiCommand } from "./invoke";

export function listTools() {
  return invokeApiCommand<ToolManifest[]>("list_tools");
}

export function getTool(appKey: string) {
  return invokeApiCommand<ToolManifest>("get_tool", { appKey });
}

export function setToolAgentEnabled(appKey: string, enabled: boolean) {
  return invokeApiCommand<ToolManifest>("set_tool_agent_enabled", {
    appKey,
    enabled,
  });
}
