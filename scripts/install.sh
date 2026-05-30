#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_NAME="Codex Now.app"
BUILD_SCRIPT="$ROOT_DIR/scripts/build.sh"
BUILD_APP="$ROOT_DIR/build/$APP_NAME"
INSTALL_DIR="$HOME/Applications"
INSTALL_APP="$INSTALL_DIR/$APP_NAME"

"$BUILD_SCRIPT"

mkdir -p "$INSTALL_DIR"
rm -rf "$INSTALL_APP"
cp -R "$BUILD_APP" "$INSTALL_APP"

echo "Installed: $INSTALL_APP"
echo "You can now open Codex Now from ~/Applications."
