#!/bin/sh
for file in $(find /usr/share/nginx/html -iname "*.css" -o -iname "*.html" -o -iname "*.js")
do
        /bin/sed -i "s|__KEYCLOAK_URL__|${KEYCLOAK_URL}|g"  $file
done
zip -r -j /usr/share/nginx/html/build/${projectName}.zip /usr/share/nginx/html/build

nginx -g 'daemon off;'