#!/usr/bin/env bash
# tools/validate-examples.sh — CI: validate all .rpml files in examples/
set -e

PASS=0
FAIL=0

for file in examples/*.rpml; do
  if bun packages/validator/src/cli.ts "$file" 2>&1; then
    PASS=$((PASS + 1))
  else
    FAIL=$((FAIL + 1))
  fi
done

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
