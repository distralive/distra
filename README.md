# distra

distra is a free and open source video sharing platform, built with [Next.js](https://nextjs.org) 13, and some microservices with [Rust](https://rust-lang.org).

## Local development

### Prerequisites

You'll need the following to run your own distra instance:

- Node.js 18.x (LTS)
- pnpm (as the package manager)
- A running MySQL database (you can use Docker to run one)
- A running MinIO instance (you can use Docker to run one)

### Clone the repository

```
git clone https://github.com/distralive/distra && cd distra
```

### Install the dependencies

```
pnpm i
```

### Initializing the database

If you haven't setup a MySQL instance, set it up on your local machine directly, or with [Docker](https://www.docker.com/).

**Setting up with Docker (recommended)**

1. Pull the [mysql](https://hub.docker.com/_/mysql) image.

```
docker pull mysql
```

2. Run an instance.

```
docker run --name distra-db -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql
```

3. Add a `DATABASE_URL` environment variable.

But first, copy the .env.example file to .env,

```
cp .env.example .env
```

and then add the value in the `DATABASE_URL` variable.

4. Migrate the schema to the database.

```
pnpm db:push
```

### Setup NextAuth.js

1. Create a secret for NextAuth.js.

Generate a secret with:

```
openssl rand -base64 32
```

The output should be copied to .env.

2. Add GitHub OAuth secrets.

Get the secrets by [creating a new OAuth application](https://github.com/settings/applications/new), and copy and paste the values on the .env file.

### Initializing MinIO

You can follow the [docs](https://min.io/docs/minio/container/index.html) to setup a MinIO instance.

After that, the access key and the secret key is copied to the .env file.

### Run a development server

To run a development server, run:

```
pnpm dev
```