This is a [Next.js](https://nextjs.org/) web app for the [klimadatenschule](https://klimadatenschule.de) project

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Running in production

We are using docker-compose to run the web app in production. Steps to set up the project

1. Edit the .env file in the Fusionauth Section

2. `docker-compose up -d fusionauth auth_db`

3. Setup Fusionauth at [URL](#)

4. Edit the .env file in the Next.js app section

5. `docker-compose up -d postgres`

Now we are generating the DB

6. `docker-compose build app`

7. `docker-compose up -d app`

Your app should now be running
