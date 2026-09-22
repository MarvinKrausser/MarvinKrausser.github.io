FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY . /usr/share/nginx/html

# nginx.conf is needed in the build context but must not be served
RUN rm /usr/share/nginx/html/nginx.conf

EXPOSE 8081

CMD ["nginx", "-g", "daemon off;"]
