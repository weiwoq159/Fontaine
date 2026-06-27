mod ipc;
mod domain;
mod catalog;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            ipc::dashboard::get_dashboard_overview_stats,
            ipc::dashboard::get_dashboard_metric_stats,
            ipc::catalog::get_tool,
            ipc::catalog::list_tools,
            ipc::catalog::set_tool_agent_enabled
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
