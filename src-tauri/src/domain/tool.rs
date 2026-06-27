use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ToolManifest {
    pub app_key: String,
    pub name: String,
    pub description: String,
    pub category_key: String,
    pub icon_key: String,
    pub entry: String,
    pub status: String,
    #[serde(default)]
    pub link: String,
    #[serde(default)]
    pub tags: Vec<String>,
    pub agent: Option<ToolAgent>,
    pub queue: ToolQueue,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ToolAgent {
    pub enabled: bool,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ToolQueue {
    pub enabled: bool,
}
