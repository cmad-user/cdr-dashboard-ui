#!/usr/bin/env bash

set -e
echo "Logging in to Amazon ECR..."
$(aws ecr get-login --no-include-email --region us-west-2)
echo "Running docker image"
sudo docker run -d --name cdr-dashboard-ui -p 3000:3000 628443245197.dkr.ecr.us-west-2.amazonaws.com/cdr-dashboard-ui:latest