use serde::Serialize;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DashboardOverviewStats {
    pub agent_tool_count: u32,
    pub pending_plan_count: u32,
    pub today_automation_count: u32,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DashboardMetricStats {
    pub installed_tool_count: u32,
    pub today_execution_count: u32,
    pub pending_confirmation_count: u32,
    pub resource_asset_count: u32,
}
