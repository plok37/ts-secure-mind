#!/bin/bash

# start_all_challenges.sh - Spin up all challenge containers in parallel

set -e

echo "==== Starting all challenge containers ===="

# Start main challenges
for compose in ./challenge-section/*/docker-compose.yml; do
  dir=$(dirname "$compose")
  echo "Starting challenge in $dir ..."
  (cd "$dir" && docker compose up -d)
done

# Start real-world scenario challenges
for compose in ./real-world-section/*/docker-compose.yml; do
  dir=$(dirname "$compose")
  echo "Starting real-world scenario in $dir ..."
  (cd "$dir" && docker compose up -d)
done

echo "==== All challenges started! ===="