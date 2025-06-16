#!/usr/bin/env bash
# Script to import templates from vtex/vtex-emails repository
set -e

REPO_URL="https://github.com/vtex/vtex-emails.git"
TEMP_DIR="$(mktemp -d)"

echo "Cloning repository..."
if ! git clone --depth=1 "$REPO_URL" "$TEMP_DIR"; then
    echo "Failed to clone $REPO_URL" >&2
    exit 1
fi

SRC_DIR="$TEMP_DIR/source/templates"
DEST_DIR="$(dirname "$0")/src/templates"

if [ ! -d "$SRC_DIR" ]; then
    echo "Source directory $SRC_DIR not found" >&2
    exit 1
fi

mkdir -p "$DEST_DIR"
cp -r "$SRC_DIR"/* "$DEST_DIR"/

echo "Templates copied to $DEST_DIR"

# cleanup
test -d "$TEMP_DIR" && rm -rf "$TEMP_DIR"
