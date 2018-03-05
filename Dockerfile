FROM node:carbon

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ADD . /app

WORKDIR /app

ADD package.json yarn.lock ./

ENTRYPOINT ["sh", "./entrypoint.sh"]

CMD [ "yarn", "start" ]
