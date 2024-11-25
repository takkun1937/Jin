FROM node:20.12.0

RUN apt-get update -y && apt-get install -y \
  git \
  tree

WORKDIR /jin

RUN npx -y playwright@1.49.0 install --with-deps chromium
