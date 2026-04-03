#!/bin/bash

# stop_all_challenges.sh - Stop and remove all challenge containers

set -e

echo "==== Stopping all challenge containers ===="

# Stop main challenges
for compose in ./challenge-section/*/docker-compose.yml; do
  dir=$(dirname "$compose")
  echo "Stopping challenge in $dir ..."
  (cd "$dir" && docker compose down)
done

# Stop real-world scenario challenges
for compose in ./real-world-section/*/docker-compose.yml; do
  dir=$(dirname "$compose")
  echo "Stopping real-world scenario in $dir ..."
  (cd "$dir" && docker compose down)
done

echo "==== All challenges stopped and removed! ===="