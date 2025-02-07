# stellar-appview

This is a Stellar AppView Server.

# Develop

Write the required environment variables.

```
DB_NAME=
DB_USER=
DB_PASS=

DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@db:5432/postgres?schema=public
```

Run the app.

```
docker-compose up
```

After that, open http://localhost:3000 in your browser.
