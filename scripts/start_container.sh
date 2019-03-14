#!/usr/bin/env bash

set -e
echo "Logging in to Amazon ECR..."
$(aws ecr get-login --no-include-email --region us-west-2)
echo "Running docker image"
sudo docker run -d --name nms-dashboard-ui -p 3000:3000 860360332628.dkr.ecr.us-west-2.amazonaws.com/nms-dashboard-ui:latest