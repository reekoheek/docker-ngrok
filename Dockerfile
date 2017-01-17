FROM mhart/alpine-node

MAINTAINER Ganesha <reekoheek@gmail.com>

ADD https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip /ngrok.zip
RUN set -x \
  && unzip -o /ngrok.zip -d /bin \
  && rm -f /ngrok.zip

RUN set -x \
  && mkdir -p /home/ngrok \
  && echo 'ngrok:x:6737:6737:Ngrok user:/home/ngrok:/bin/false' >> /etc/passwd \
  && echo 'ngrok:x:6737:' >> /etc/group \
  && chown ngrok:ngrok /home/ngrok \
  && chmod -R go=u,go-w /home/ngrok \
  && chmod go= /home/ngrok

COPY . /app

USER ngrok

WORKDIR /app

EXPOSE 4040

CMD ["npm", "start"]
