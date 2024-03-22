#!/bin/sh


# production

# docker run -it --rm --name certbot \
#    -v "./etc/letsencrypt:/etc/letsencrypt" \
#    -v "./var/lib/letsencrypt:/var/lib/letsencrypt" \
#    certbot/certbot certonly --manual -d *.$DOMAIN -d $DOMAIN \
#    --agree-tos --manual-public-ip-logging-ok --preferred-challenges dns \
#    --server https://acme-v02.api.letsencrypt.org/directory \
#    --register-unsafely-without-email --rsa-key-size 4096



# staging 

docker run -it --rm --name certbot \
   -v "/etc/letsencrypt:/etc/letsencrypt" \
   -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
   certbot/certbot certonly --manual -d *.local.$DOMAIN -d local.$DOMAIN \
   --agree-tos --manual-public-ip-logging-ok --preferred-challenges dns \
   --server https://acme-staging-v02.api.letsencrypt.org/directory \
   --register-unsafely-without-email --rsa-key-size 4096