FROM mhart/alpine-node:7.4.0

MAINTAINER Ganesha <reekoheek@gmail.com>

COPY . /app
ADD https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip /ngrok.zip

RUN set -x \
  && apk add --no-cache git \
  && unzip -o /ngrok.zip -d /bin \
  && rm -f /ngrok.zip \
  && mkdir -p /home/ngrok \
  && echo 'ngrok:x:6737:6737:Ngrok user:/home/ngrok:/bin/false' >> /etc/passwd \
  && echo 'ngrok:x:6737:' >> /etc/group \
  && chown ngrok:ngrok /home/ngrok \
  && chmod -R go=u,go-w /home/ngrok \
  && chmod go= /home/ngrok \
  && cd /app \
  && npm install \
  && npm build \
  && rm -rf node_modules \
  && npm install --production \
  && chown ngrok:ngrok /app \
  && chmod -R go=u,go-w /app

USER ngrok
WORKDIR /app

EXPOSE 4040

CMD ["node", "--harmony-async-await", "./index.js"]
