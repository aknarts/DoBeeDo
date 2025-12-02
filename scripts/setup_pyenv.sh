#!/usr/bin/env bash
# Setup script for a local virtualenv suitable for running tests for the
# DoBeeDo integration without polluting the system Python.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="${REPO_ROOT}/.venv-test"

echo "[DoBeeDo] Setting up test environment under ${REPO_ROOT}".

# Create a virtualenv for tests if it does not exist yet
if [ ! -d "${VENV_DIR}" ]; then
  echo "[DoBeeDo] Creating virtualenv in ${VENV_DIR}..."
  python -m venv "${VENV_DIR}"
fi

# Activate and install dependencies
# shellcheck source=/dev/null
source "${VENV_DIR}/bin/activate"

echo "[DoBeeDo] Installing Python test dependencies inside ${VENV_DIR}..."
python -m pip install --upgrade pip

# If you later add extras to pyproject.toml, they can be installed here.
if [ -f "${REPO_ROOT}/pyproject.toml" ]; then
  python -m pip install .[test] || true
fi

# Explicit Home Assistant install for integration tests
python -m pip install "homeassistant>=2024.0.0" pytest

echo "[DoBeeDo] Test environment ready. To use it manually, run:"
echo "  source ${VENV_DIR}/bin/activate"
