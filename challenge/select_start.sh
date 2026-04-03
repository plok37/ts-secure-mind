#!/bin/bash

# select_and_start_challenges.sh - Let user pick which challenges to spin up

set -e

echo "==== Available Challenges ===="

# Gather all challenge directories with docker-compose.yml
declare -a CHALLENGE_PATHS
declare -a CHALLENGE_NAMES

# Main challenges
i=1
for dir in ./challenge-section/*/; do
  if [ -f "$dir/docker-compose.yml" ]; then
    name=$(basename "$dir")
    CHALLENGE_PATHS+=("$dir")
    CHALLENGE_NAMES+=("Main: $name")
    echo "$i) Main: $name"
    ((i++))
  fi
done

# Real-world scenario challenges
for dir in ./real-world-section/*/; do
  if [ -f "$dir/docker-compose.yml" ]; then
    name=$(basename "$dir")
    CHALLENGE_PATHS+=("$dir")
    CHALLENGE_NAMES+=("Real-World: $name")
    echo "$i) Real-World: $name"
    ((i++))
  fi
done

echo
read -p "Enter the numbers of the challenges you want to start (comma-separated, e.g. 1,3,5): " selection

# Parse user input
IFS=',' read -ra INDICES <<< "$selection"

echo
for idx in "${INDICES[@]}"; do
  idx=$(echo "$idx" | xargs) # trim whitespace
  if [[ "$idx" =~ ^[0-9]+$ ]] && [ "$idx" -ge 1 ] && [ "$idx" -le "${#CHALLENGE_PATHS[@]}" ]; then
    dir="${CHALLENGE_PATHS[$((idx-1))]}"
    name="${CHALLENGE_NAMES[$((idx-1))]}"
    echo "Starting $name ..."
    (cd "$dir" && docker compose up -d)
  else
    echo "Invalid selection: $idx"
  fi
done

echo
echo "==== Selected challenges started! ===="