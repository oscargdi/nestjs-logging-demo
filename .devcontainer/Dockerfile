FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends pre-commit

RUN su node -c "npm install -g @nestjs/cli"
