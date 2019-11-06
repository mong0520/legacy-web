FROM nginx

RUN rm -f /usr/share/nginx/html/index.html
ADD ./html /usr/share/nginx/html
ADD ./default.conf.template /etc/nginx/conf.d/default.conf.template

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
