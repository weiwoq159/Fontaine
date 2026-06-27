
use crate::catalog::read_tool_manifests;
use crate::domain::dashboard::{DashboardMetricStats, DashboardOverviewStats};
use crate::domain::response::ApiResponse;

const MOCK_PENDING_PLAN_COUNT: u32 = 3;
const MOCK_PENDING_CONFIRMATION_COUNT: u32 = 3;
const MOCK_TODAY_AUTOMATION_COUNT: u32 = 26;
const MOCK_TODAY_EXECUTION_COUNT: u32 = 26;
const MOCK_RESOURCE_ASSET_COUNT: u32 = 1800;

#[tauri::command]
pub async fn get_dashboard_overview_stats() -> Result<ApiResponse<DashboardOverviewStats>, String> {
    let apps = read_tool_manifests()?;
    let agent_tool_count = apps
        .iter()
        .filter(|manifest| {
            manifest.status == "available"
                && manifest
                    .agent
                    .as_ref()
                    .map(|agent| agent.enabled)
                    .unwrap_or(false)
        })
        .count() as u32;

    Ok(ApiResponse::success(DashboardOverviewStats {
        agent_tool_count,
        pending_plan_count: MOCK_PENDING_PLAN_COUNT,
        today_automation_count: MOCK_TODAY_AUTOMATION_COUNT,
    }))
}

#[tauri::command]
pub async fn get_dashboard_metric_stats() -> Result<ApiResponse<DashboardMetricStats>, String> {
    let installed_tool_count = read_tool_manifests()?.len() as u32;

    Ok(ApiResponse::success(DashboardMetricStats {
        installed_tool_count,
        today_execution_count: MOCK_TODAY_EXECUTION_COUNT,
        pending_confirmation_count: MOCK_PENDING_CONFIRMATION_COUNT,
        resource_asset_count: MOCK_RESOURCE_ASSET_COUNT,
    }))
}
