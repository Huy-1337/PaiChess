#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env::consts::OS;
use tauri::command;

#[command]
fn get_engine_download_url(engine: &str) -> Result<String, String> {
    match (engine, OS) {
        ("Stockfish", "windows") => {
            Ok("https://stockfishchess.org/files/stockfish-windows-x86-64-avx2.zip".into())
        }
        ("Stockfish", "linux") => {
            Ok("https://stockfishchess.org/files/stockfish-ubuntu-x86-64-avx2.tar".into())
        }
        ("Stockfish", "macos") => {
            Ok("https://stockfishchess.org/files/stockfish-macos-m1-apple-silicon.tar".into())
        }
        ("Dragon", _) => Ok("https://komodochess.com/pub/dragon.zip".into()),
        _ => Err(format!("Unsupported OS ({}) or Engine ({})", OS, engine)),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_engine_download_url])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
