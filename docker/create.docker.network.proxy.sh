#!/bin/sh


docker network create -d bridge \
  --subnet=192.168.200.0/24 \
  --gateway=192.168.200.1 \
  -o parent=enp0s3.200 \
  proxy