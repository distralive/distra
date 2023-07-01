# distra

distra is a free and open source video sharing platform that prioritizes free access and cutting-edge technology to provide a unique and user-friendly experience for sharing, viewing, and interacting with video content.

## Local development or self-hosting

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

### Copy the .env.example file

```
cp .env.example .env
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
docker run --name distra-db -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -p 33060:33060 -d mysql
```

3. Add a `DATABASE_URL` environment variable.
The value of the variable should be something like `mysql://root:my-secret-pw@localhost:3306/db?schema=public`

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

After that, the endpoint, the access key and the secret key is copied to the .env file.
By default MinIO's endpoint is `http://localhost:9000`.

### Run a development server

To run a development server, run:

```
pnpm dev
```

### Build to production

To create a production build, run:

```
pnpm build
```

After that, to start the production build, run:

```
pnpm start
```