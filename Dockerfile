# Stage 1: Node.js for building (using official secure image)
FROM node:22-alpine AS node-base

# Stage 2: Final image with nginx and node
FROM nginx:alpine

# Copy Node.js from official image (ensures latest security patches)
COPY --from=node-base /usr/local/bin/node /usr/local/bin/node
COPY --from=node-base /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm && \
    ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

# Update Alpine packages
RUN apk update && apk upgrade --no-cache

# PRST-3867: patch openssl libs for CVE-2026-45447 (libssl3/libcrypto3 3.5.6-r0 -> 3.5.7-r0)
RUN apk add --no-cache --upgrade libssl3 libcrypto3

WORKDIR /app

COPY package.json package-lock.json ./
COPY scripts ./scripts
COPY abis ./abis

RUN npm install

COPY . .

WORKDIR /

ENTRYPOINT ["/bin/sh", "/app/scripts/deploy.sh"]
