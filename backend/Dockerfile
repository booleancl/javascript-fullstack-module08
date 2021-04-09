
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Builder for install dev dependencies
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FROM node:12-alpine AS builder
WORKDIR /app

COPY ./src /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

#because this image has not set NODE_ENV this command will install dev dependencies also
RUN npm install

# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Image for provision the production database
# extends from builder for get dev dependencies from last installation
# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FROM builder AS database_provision

ARG environment_name
ARG database_url

ENV NODE_ENV=$environment_name
ENV DATABASE_URL=$database_url

RUN npm run db:migrate

# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Image for production node
# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FROM node:12-alpine

ARG environment_name
ARG database_url
ARG service_account_filename

ENV NODE_ENV=$environment_name
ENV DATABASE_URL=$database_url
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/$service_account_filename

WORKDIR /app

COPY ./src /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

CMD node server.js