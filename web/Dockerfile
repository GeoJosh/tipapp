# Build application distributables using temporary build container
FROM node:lts-alpine AS ngbuild

RUN mkdir /tmp/tipapp
COPY /src /tmp/tipapp/src
COPY /*.json /tmp/tipapp/

WORKDIR /tmp/tipapp

RUN npm install
RUN /tmp/tipapp/node_modules/\@angular/cli/bin/ng build --configuration=production

# Build operational image using build artifacts from temporary build container 
FROM nginx:alpine

COPY files/etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=ngbuild /tmp/tipapp/dist/tipapp /usr/share/nginx/html
