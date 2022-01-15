FROM node:16.13.1-alpine

RUN apk add --no-cache bash vim
RUN apk add --update \
  git \
  && rm -rf /var/cache/apk/*

EXPOSE 4000

WORKDIR /usr/src/app

COPY . .
COPY ./entrypoint.sh /etc/entrypoint.sh
RUN chmod +x /etc/entrypoint.sh
CMD ["/bin/sh"]
ENTRYPOINT ["/etc/entrypoint.sh"]
