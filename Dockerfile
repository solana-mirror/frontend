FROM node:20.17.0

RUN mkdir -p /home/solana-mirror-frontend/app
WORKDIR /home/solana-mirror-frontend/app

COPY package.json package-lock.json postcss.config.mjs tailwind.config.ts next.config.mjs ./
RUN apt-get update && \
    apt-get install -y python3 build-essential && \
    rm -rf /var/lib/apt/lists/* 
RUN npm cache clear --force && npm install --verbose

COPY src /home/solana-mirror-frontend/app/src
COPY public /home/solana-mirror-frontend/app/public
COPY tsconfig.json /home/solana-mirror-frontend/app
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
