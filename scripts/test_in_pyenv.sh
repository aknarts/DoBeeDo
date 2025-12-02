#!/usr/bin/env bash
set -euo pipefail

# Wrapper to run pytest inside the local pyenv-based virtualenv created
# by scripts/setup_pyenv.sh.

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="${REPO_ROOT}/.venv-test"

if [ ! -d "${VENV_DIR}" ]; then
  echo "[DoBeeDo] Test virtualenv not found at ${VENV_DIR}. Run scripts/setup_pyenv.sh first." >&2
  exit 1
fi

# shellcheck source=/dev/null
source "${VENV_DIR}/bin/activate"

cd "${REPO_ROOT}"

echo "[DoBeeDo] Running pytest inside ${VENV_DIR}..."
pytest "$@"

