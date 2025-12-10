# syntax=docker/dockerfile:experimental
## build environment
FROM node:18-alpine as build
WORKDIR /app
COPY package.json .
COPY .npmrc .
COPY . /app
RUN npm install
ENV ASSET_PATH=/${projectName}/build/
ENV KEYCLOAK_URL=__KEYCLOAK_URL__
RUN npm run build

# production environment
FROM pentab.azurecr.io/nginx:1.16.0-alpine
WORKDIR /app
RUN apk add --no-cache --upgrade bash
RUN apk add nano
COPY --from=build /app/dist /usr/share/nginx/html
COPY run.sh /app
EXPOSE 80
CMD ["bash", "run.sh"]
