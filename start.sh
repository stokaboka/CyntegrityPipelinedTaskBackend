#!/bin/sh

NODE_ENV=development

npm install

npm run build

sudo pm2 delete cpt
sudo pm2 start ecosystem.config.js --only cpt --env production

# docker-compose -f ./docker-compose.production.yml up -d

exit 0
