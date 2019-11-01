FROM nginx

RUN rm -f /usr/share/nginx/html/index.html
ADD ./html /usr/share/nginx/html
ADD ./default.conf /etc/nginx/conf.d/default.conf

