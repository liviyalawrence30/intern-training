#!/bin/bash
set -e

echo "=== Intern Dashboard Setup ==="

if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: Node.js not found. Install it from https://nodejs.org/"
  exit 1
fi

echo "Node $(node -v) ready."

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "Dependencies already installed."
fi

if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    cp .env.example .env
    echo ".env created from .env.example"
  else
    echo ".env.example not found. Skipping."
  fi
else
  echo ".env already exists."
fi

if npm run | grep -q "test:run"; then
  if npm run test:run; then
    echo "All tests passed."
  else
    echo "Some tests failed."
  fi
else
  echo "No test:run script found. Skipping tests."
fi

echo ""
echo "=== Setup Complete ==="
echo "Start the development server with:"
echo "npm run dev"
