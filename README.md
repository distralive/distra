# distra

distra is a free and open source video sharing platform that prioritizes free access and cutting-edge technology to provide a unique and user-friendly experience for sharing, viewing, and interacting with video content.

## Local development or self-hosting

### Prerequisites

You'll need the following to run your own distra instance:

- Node.js 18.x or later
- pnpm (as the package manager)
- A running PostgreSQL database (you can use Docker to run one)
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

If you haven't setup a PostgreSQL instance, set it up on your local machine directly, or with [Docker](https://www.docker.com/).

**Setting up with Docker (recommended)**

1. Pull the [postgres](https://hub.docker.com/_/postgres) image.

```
docker pull postgres
```

2. Run an instance.

```
docker run --name distra-db -e POSTGRES_PASSWORD=my-secret-pw -p 5432:5432 -d postgres
```

3. Add a `DATABASE_URL` environment variable.
   The value of the variable should be something like `postgres://postgres:my-secret-pw@localhost:5432/postgres`

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

Then, you open up `http://localhost:9000` or whatever your MinIO endpoint is on the browser.
Then, you sign into it with the access key and the secret key.
And then, you create 3 buckets that are called `distra-videos`, `distra-private-videos`, and `distra-thumbnails` respectively.

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

### Deploying the app

If you'd choose to deploy your own instance somewhere, we would recommend these:

- [Vercel](https://vercel.com) for running the Next.js app
- [Neon](https://neon.tech) for running the database, based on PostgreSQL
- [Amazon S3](https://aws.amazon.com/s3/) for running the object storage, which hosts the videos and thumbnails
  - _[Cloudflare R2](https://www.cloudflare.com/products/r2/) may work, but since this app uses presigned POST urls for uploads, which isn't supported by it, we wouldn't recommend this_

_note: We are not sponsored/endorsed by any of these sites._

## Hosted instances

These are hosted instances of distra to try out.

| Country | Link to instance                      | Cloudflare enabled | Is up? |
| :-----: | ------------------------------------- | ------------------ | ------ |
|   🇺🇸    | https://distra.ihatethedemonkahl.com/ | ✅                 | ❌     |
