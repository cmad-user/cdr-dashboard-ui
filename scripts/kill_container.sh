#!/usr/bin/env bash

set -e

echo "removing exiting docker image"
docker stop cdr-dashboard-ui || true && docker rm -f cdr-dashboard-ui || true