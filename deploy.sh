#!/usr/bin/env sh

set -e

npm run build
npm run generate

cd dist

touch .nojekyll

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:samherb/colour-generator.git master:gh-pages

cd -
