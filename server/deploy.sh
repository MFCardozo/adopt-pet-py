#!/bin/bash

echo What should the version be?
read VERSION

docker build  --build-arg NODE_OPTIONS=--max-old-space-size=8048 -t mcfly6/pet-finder-py:$VERSION .
docker push mcfly6/pet-finder-py:$VERSION
ssh root@157.230.235.207 "docker pull mcfly6/pet-finder-py:$VERSION && docker tag mcfly6/pet-finder-py:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"