FROM kyma/docker-nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html/

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

CMD service nginx start