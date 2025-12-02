#!/usr/bin/env bash
set -euo pipefail

# Simple pre-push helper: run backend tests and build the frontend bundle.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[prepush] Running Python tests..."
python -m pytest -q

echo "[prepush] Installing frontend deps (if needed) and building..."
cd "$ROOT_DIR/frontend"
npm install
npm run build

echo "[prepush] All checks passed. Safe to push."

