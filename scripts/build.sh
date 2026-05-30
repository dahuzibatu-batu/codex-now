#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_NAME="Codex Now.app"
BUILD_DIR="$ROOT_DIR/build"
SOURCE_FILE="$ROOT_DIR/src/Codex Now.js"
APP_PATH="$BUILD_DIR/$APP_NAME"

mkdir -p "$BUILD_DIR"
rm -rf "$APP_PATH"

osacompile -l JavaScript -o "$APP_PATH" "$SOURCE_FILE"

echo "Built: $APP_PATH"
