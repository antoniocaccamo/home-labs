#!/bin/sh


docker network create -d bridge \
  --subnet=192.168.201.0/24 \
  --gateway=192.168.201.1 \
  -o parent=enp0s3.201 \
  database