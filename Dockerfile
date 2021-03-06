FROM node:16
RUN mkdir -p /usr/src/app/
RUN chown -R node:node /usr/src/app/
WORKDIR /usr/src/app

#NX
RUN npm install -g nx

#angular
RUN npm install -g @angular/cli@8.1.2

# firebase
RUN npm install -g firebase-tools
RUN npm install http-server -g

RUN apt-get -y update

# Packages
RUN apt install openssl \
    ffmpeg -y

USER node
