#!/bin/sh


docker network create -d bridge \
  --subnet=192.168.202.0/24 \
  --gateway=192.168.202.1 \
  -o parent=enp0s3.202 \
  dns
