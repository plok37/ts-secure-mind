#!/bin/bash

set -e

(cd challenge-base && docker build  . -t gcr.io/paradigmxyz/ctf/base:latest)
echo "building eth"
(cd challenge && docker build . -f Dockerfile.eth -t plok7337/blockchain-ctf-eth:secure-mind)