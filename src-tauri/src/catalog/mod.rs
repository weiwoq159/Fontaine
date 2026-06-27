use std::{fs, path::PathBuf};

use crate::domain::tool::{ToolAgent, ToolManifest};

pub fn tools_dir() -> Result<PathBuf, String> {
    let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let repo_root = manifest_dir
        .parent()
        .ok_or_else(|| "failed to resolve repository root from src-tauri".to_string())?;

    Ok(repo_root.join("tools"))
}

pub fn tool_manifest_path(app_key: &str) -> Result<PathBuf, String> {
    Ok(tools_dir()?.join(app_key).join("manifest.json"))
}

/// Toggles `agent.enabled` in `tools/<app_key>/manifest.json` and returns the
/// updated manifest. Other fields and their order are preserved by round-tripping
/// through `ToolManifest`, whose field order mirrors the manifest.
pub fn write_tool_agent_enabled(app_key: &str, enabled: bool) -> Result<ToolManifest, String> {
    let manifest_path = tool_manifest_path(app_key)?;

    if !manifest_path.exists() {
        return Err(format!("tool manifest not found: {app_key}"));
    }

    let manifest_text = fs::read_to_string(&manifest_path)
        .map_err(|error| format!("failed to read {:?}: {error}", manifest_path))?;
    let mut manifest = serde_json::from_str::<ToolManifest>(&manifest_text)
        .map_err(|error| format!("failed to parse {:?}: {error}", manifest_path))?;

    manifest.agent = Some(ToolAgent { enabled });

    let serialized = serde_json::to_string_pretty(&manifest)
        .map_err(|error| format!("failed to serialize manifest for {app_key}: {error}"))?;
    fs::write(&manifest_path, format!("{serialized}\n"))
        .map_err(|error| format!("failed to write {:?}: {error}", manifest_path))?;

    Ok(manifest)
}

pub fn read_tool_manifests() -> Result<Vec<ToolManifest>, String> {
    let tools_dir = tools_dir()?;

    if !tools_dir.exists() {
        return Ok(Vec::new());
    }

    let mut manifests = Vec::new();

    for entry in fs::read_dir(&tools_dir)
        .map_err(|error| format!("failed to read tools directory {:?}: {error}", tools_dir))?
    {
        let entry = entry.map_err(|error| format!("failed to read tools entry: {error}"))?;
        let path = entry.path();

        if !path.is_dir() {
            continue;
        }

        let manifest_path = path.join("manifest.json");

        if !manifest_path.exists() {
            continue;
        }

        let manifest_text = fs::read_to_string(&manifest_path)
            .map_err(|error| format!("failed to read {:?}: {error}", manifest_path))?;
        let manifest = serde_json::from_str::<ToolManifest>(&manifest_text)
            .map_err(|error| format!("failed to parse {:?}: {error}", manifest_path))?;

        manifests.push(manifest);
    }

    Ok(manifests)
}
