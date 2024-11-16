FROM node:20.12.0

RUN apt-get update -y && apt-get install -y \
  git \
  iputils-ping \
  net-tools
