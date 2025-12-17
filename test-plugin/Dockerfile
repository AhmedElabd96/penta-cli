
############################
# 1️⃣ Build Stage
############################
FROM node:22-alpine3.21  AS  build
WORKDIR /app
COPY package.json .
COPY . /app
RUN npm ci
ENV ASSET_PATH=GATEWAY_URL/test-plugin/build/ 
RUN npm run prod
############################
# 2️⃣ Runtime Stage
############################
FROM pentab.azurecr.io/nginx:1.29.2-alpine-slim
WORKDIR /app
# Install required tools
USER root
RUN apk update && \
    apk add --no-cache bash zip nano
RUN mkdir -p /run/nginx && \
chown -R nginxuser:nginxgroup /run/nginx /var/cache/nginx /usr/share/nginx/html /etc/nginx /app
# Copy build output and script
COPY --from=build /app/dist /usr/share/nginx/html
COPY run.sh /app
RUN  chown -R nginxuser:nginxgroup /usr/share/nginx/html/
# Switch back to the secure non-root user
USER root
EXPOSE 80
CMD ["bash", "run.sh"]