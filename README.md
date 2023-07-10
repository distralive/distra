# distra
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

Then, you open up `http://localhost:9000` or whatever your MinIO endpoint is on the browser.
Then, you sign into it with the access key and the secret key.
Then, you create 3 buckets that are called `distra-videos`, `distra-private-videos`, and `distra-thumbnails` respectively.
And then, you set an S3 policy for the `distra-videos` bucket:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow", 
            // Start of the policy
            "Principal": {
                "AWS": [
                    "*"
                ]
            },
            // End of the policy
            ...
        }
    ]
}
```

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
- [PlanetScale](https://planetscale.com) for running the database, based on MySQL
- [Amazon S3](https://aws.amazon.com/s3/) for running the object storage, which hosts the videos and thumbnails
  - *[Cloudflare R2](https://www.cloudflare.com/products/r2/) may work, but since this app uses presigned POST urls for uploads, which isn't supported by it, we wouldn't recommend this*

*note: We are not sponsored/endorsed by any of these sites.*

## Hosted instances

These are hosted instances of distra to try out.

| Country | Link to instance                      | Cloudflare enabled | Is up? |   |
|:-------:|---------------------------------------|--------------------|--------|---|
| 🇺🇸      | https://distra.ihatethedemonkahl.com/ | ✅                  | ✅      |   |

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/frolleks"><img src="https://avatars.githubusercontent.com/u/83149723?v=4?s=100" width="100px;" alt="Frolleks"/><br /><sub><b>Frolleks</b></sub></a><br /><a href="https://github.com/distralive/distra/commits?author=frolleks" title="Code">💻</a> <a href="#maintenance-frolleks" title="Maintenance">🚧</a> <a href="#ideas-frolleks" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->