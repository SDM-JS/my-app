FROM node:24

WORKDIR /app

COPY . .

EXPOSE 3000

USER admin

CMD [ "pnpm build" ]

RUN pnpm dev