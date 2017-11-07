FROM debian:8
LABEL name api-storytellin.gg

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

RUN mkdir /server
WORKDIR /server
RUN mkdir /src

COPY package.json /server

COPY /src /server/src
COPY yarn.lock /server
COPY .babelrc /server
COPY .env /server

RUN npm install node-gyp -g
RUN npm install yarn -g
RUN yarn install
RUN yarn run build

EXPOSE 5000

CMD ["yarn", "start"]
