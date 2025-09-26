#!/bin/sh

set -xe
# keycloak
# ========
export KEYCLOAK_VERSION=26.1.4
export KEYCLOAK_ADMIN_USERNAME=keycloak
export KEYCLOAK_ADMIN_PASSWORD=keycloak


podman run --name keycloak \
    -p 8090:8080  \
    -e KC_BOOTSTRAP_ADMIN_USERNAME=${KEYCLOAK_ADMIN_USERNAME} \
    -e KC_BOOTSTRAP_ADMIN_PASSWORD=${KEYCLOAK_ADMIN_PASSWORD} \
    --rm \
    --network keycloak  \
    --volume keycloakapp:/opt/keycloak/data \
    quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} start-dev 

#podman compose  up