FROM node:14.17.3-alpine3.14 as build-insight-viewer
WORKDIR /app
COPY . .
ARG MODE
RUN yarn \
 && yarn doc:insight-viewer

FROM nginx:1.21.1-alpine as release-insight-viewer
LABEL maintainer=skpark@lunit.io
COPY --from=build-insight-viewer /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
