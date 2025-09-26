podman run  \
    --volume postgresapp:/var/lib/pgsql/data \
    -p "5432:5432" \
    -e POSTGRES_USER="postgres" \
    -e POSTGRES_PASSWORD="postgres" \
    --rm \
    --name postgresql \
    --network database  \
    postgres:17.2