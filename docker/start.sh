. ./env/dev.sh
docker-compose -f docker/docker-compose.yml up -d
yarn migrate up
