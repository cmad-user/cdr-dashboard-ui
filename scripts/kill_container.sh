#!/usr/bin/env bash

set -e

echo "removing exiting docker container"
docker stop cdr-dashboard-ui || true && docker rm -f cdr-dashboard-ui || true
echo "removing exiting docker image"
sudo docker images | grep "cdr-dashboard-ui" | awk '{print $1":"$2}' | xargs docker rmi