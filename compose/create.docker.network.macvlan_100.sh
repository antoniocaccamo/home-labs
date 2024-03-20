#!/bin/sh

# 2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
#     link/ether 08:00:27:b8:04:e3 brd ff:ff:ff:ff:ff:ff
#     inet 192.168.56.10/24 brd 192.168.56.255 scope global enp0s3
#        valid_lft forever preferred_lft forever
#     inet6 fe80::a00:27ff:feb8:4e3/64 scope link 
#        valid_lft forever preferred_lft forever

docker network create -d macvlan \
  --subnet=192.168.100.0/28 \
  --gateway=192.168.100.1 \
  -o parent=enp0s3.100 \
  macvlan_100
