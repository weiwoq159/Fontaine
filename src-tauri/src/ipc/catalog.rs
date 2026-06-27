use crate::catalog::{read_tool_manifests, write_tool_agent_enabled};
use crate::domain::response::ApiResponse;
use crate::domain::tool::ToolManifest;

#[tauri::command]
pub async fn list_tools() -> Result<ApiResponse<Vec<ToolManifest>>, String> {
    Ok(ApiResponse::success(read_tool_manifests()?))
}

#[tauri::command]
pub async fn get_tool(app_key: String) -> Result<ApiResponse<ToolManifest>, String> {
    let tool = read_tool_manifests()?
        .into_iter()
        .find(|manifest| manifest.app_key == app_key)
        .ok_or_else(|| format!("tool manifest not found: {app_key}"))?;

    Ok(ApiResponse::success(tool))
}

#[tauri::command]
pub async fn set_tool_agent_enabled(
    app_key: String,
    enabled: bool,
) -> Result<ApiResponse<ToolManifest>, String> {
    Ok(ApiResponse::success(write_tool_agent_enabled(
        &app_key, enabled,
    )?))
}

#[cfg(test)]
mod tests {
    use serde_json::Value;

    #[test]
    fn list_tools_returns_all_tool_manifests() {
        let response = tauri::async_runtime::block_on(super::list_tools()).expect("list tools");
        let json = serde_json::to_value(response).expect("serialize response");

        assert_eq!(json["ok"], Value::Bool(true));
        assert!(json["data"]
            .as_array()
            .is_some_and(|items| !items.is_empty()));
    }
}
