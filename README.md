# Colour Generator

This project is a simple colour generator built with Nuxt 3 and Tailwind CSS. It allows users to generate a rainbow palette based on the number of colours entered. Users can click on any colour box to copy the colour code to the clipboard, with a tooltip indicating the successful copy.

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Generate static files:

```bash
npm run generate
```

## Deployment to GitHub Pages

1. Update `nuxt.config.ts` for static export:

```typescript
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/colour-generator/',
  },
});
```

2. Create and run the `deploy.sh` script:

Create a file named `deploy.sh` in the root of your project with the following content:

```sh
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# generate static files
npm run generate

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://samherb.github.io/colour-generator
git push -f git@github.com:samherb/colour-generator.git master:gh-pages

cd -
```

Make the `deploy.sh` script executable:

```bash
chmod +x deploy.sh
```

Run the `deploy.sh` script:

```bash
./deploy.sh
```

3. Configure GitHub Pages:

Go to **Settings > Pages** in your repository.
Set the source to the `gh-pages` branch.

Your site should be available at [https://samherb.github.io/colour-generator/](https://samherb.github.io/colour-generator/).

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.