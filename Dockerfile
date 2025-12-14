# --------------------------------------
# 1️⃣ Frontend Build (Angular)
# --------------------------------------
FROM node:18-alpine AS ui-build
WORKDIR /usr/src/app

# Fix OpenSSL crypto error
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY client/ ./client/
RUN cd client && npm install && npm run build


# --------------------------------------
# 2️⃣ Backend Build (Node API)
# --------------------------------------
FROM node:18-alpine AS server-build
WORKDIR /usr/src/app
COPY nodeapi/ ./nodeapi/
RUN cd nodeapi && npm install


# --------------------------------------
# 3️⃣ Final Runtime Image
# --------------------------------------
FROM node:18-alpine
WORKDIR /usr/src/app

# Fix OpenSSL bug here too (runtime)
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY --from=server-build /usr/src/app/nodeapi/ ./
COPY --from=ui-build /usr/src/app/client/dist ./client/dist

EXPOSE 5000
EXPOSE 4200

CMD ["npm", "start"]




#FROM node:14 AS ui-build
#WORKDIR /usr/src/app
#COPY client/ ./client/
#RUN cd client && npm install && npm run build

#FROM node:14 AS server-build
#WORKDIR /usr/src/app
#COPY nodeapi/ ./nodeapi/
#RUN cd nodeapi && npm install

#FROM node:14
#WORKDIR /usr/src/app/
#COPY --from=server-build /usr/src/app/nodeapi/ ./
#COPY --from=ui-build /usr/src/app/client/dist ./client/dist
#RUN ls
#EXPOSE 4200
#EXPOSE 5000
#CMD ["/bin/sh", "-c", "cd /usr/src/app/ && npm start"]

