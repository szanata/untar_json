#!/bin/bash

docker run --rm -it \
  -e NODE_ENV="development" \
  -v `pwd`:/app/ \
  -w /app/ \
    node:12.14-alpine /bin/sh
