# Stage 1: Node.js for building (using official secure image)
# PRST-4200: pin Node.js to 22.23.2 (fixes 3 high / 4 medium nodejs CVEs flagged by Aikido)
FROM node:22.23.2-alpine AS node-base

# PRST-4185: npm bundles a vulnerable ip-address (<10.3.1, GHSA-mwp4-54f8-5fhr, SSRF via
# octal/decimal IPv4 parsing mismatch). No npm release ships the fix yet, so replace the
# bundled copy with the patched version (dependency-free, satisfies socks' ^10.0.1 range).
RUN cd /tmp && npm pack ip-address@10.3.1 && \
    rm -rf /usr/local/lib/node_modules/npm/node_modules/ip-address && \
    mkdir /usr/local/lib/node_modules/npm/node_modules/ip-address && \
    tar -xzf ip-address-10.3.1.tgz --strip-components=1 -C /usr/local/lib/node_modules/npm/node_modules/ip-address && \
    rm ip-address-10.3.1.tgz

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
