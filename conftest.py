"""Pytest configuration for the DoBeeDo project.

This file ensures that the repository root is on ``sys.path`` so that
packages like ``custom_components`` are importable when tests run
inside a virtualenv, regardless of the current working directory.
"""
from __future__ import annotations

import os
import sys

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))

if REPO_ROOT not in sys.path:
    sys.path.insert(0, REPO_ROOT)

