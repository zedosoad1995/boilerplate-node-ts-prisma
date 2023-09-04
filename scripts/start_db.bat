docker-compose --file="docker/docker-compose-postgres.yml" -p db up -d
npx prisma migrate deploy