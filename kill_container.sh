#!/usr/bin/env bash

set -e

echo "removing exiting docker image"
docker stop nms-dashboard-ui || true && docker rm -f nms-dashboard-ui || true