#!/bin/bash

# check_resources.sh - Check if your system can handle 21 challenge containers

REQUIRED_CONTAINERS=21
RECOMMENDED_RAM_PER_CONTAINER_MB=512
RECOMMENDED_TOTAL_RAM_MB=$((REQUIRED_CONTAINERS * RECOMMENDED_RAM_PER_CONTAINER_MB))
RECOMMENDED_CPU_CORES=4

echo "==== System Resource Check for CTF Challenges ===="
echo

# RAM
TOTAL_RAM_MB=$(free -m | awk '/^Mem:/{print $2}')
FREE_RAM_MB=$(free -m | awk '/^Mem:/{print $7}')
echo "Total RAM: ${TOTAL_RAM_MB} MB"
echo "Free RAM:  ${FREE_RAM_MB} MB"
echo "Recommended total RAM for $REQUIRED_CONTAINERS containers: ${RECOMMENDED_TOTAL_RAM_MB} MB"
if [ "$TOTAL_RAM_MB" -lt "$RECOMMENDED_TOTAL_RAM_MB" ]; then
  echo "WARNING: You may not have enough total RAM for all containers."
fi
if [ "$FREE_RAM_MB" -lt "$RECOMMENDED_TOTAL_RAM_MB" ]; then
  echo "WARNING: You may not have enough free RAM to start all containers right now."
fi
echo

# CPU
CPU_CORES=$(nproc)
echo "CPU cores available: $CPU_CORES"
echo "Recommended minimum CPU cores: $RECOMMENDED_CPU_CORES"
if [ "$CPU_CORES" -lt "$RECOMMENDED_CPU_CORES" ]; then
  echo "WARNING: Fewer than $RECOMMENDED_CPU_CORES CPU cores detected. Performance may be limited."
fi
echo

# Docker
if ! command -v docker &>/dev/null; then
  echo "Docker is not installed or not in PATH."
  exit 1
fi
RUNNING_CONTAINERS=$(docker ps -q | wc -l)
echo "Currently running Docker containers: $RUNNING_CONTAINERS"
echo

echo "==== Summary ===="
if [ "$FREE_RAM_MB" -ge "$RECOMMENDED_TOTAL_RAM_MB" ] && [ "$CPU_CORES" -ge "$RECOMMENDED_CPU_CORES" ]; then
  echo "Your system should be able to run all $REQUIRED_CONTAINERS challenge containers."
else
  echo "Your system may struggle to run all $REQUIRED_CONTAINERS containers at once."
  echo "Consider closing other applications or upgrading your hardware."
fi