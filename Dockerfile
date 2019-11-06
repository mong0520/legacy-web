FROM nginx:1.17.5

COPY ./default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./html /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/index.html
# RUN echo "hello" > /usr/share/nginx/html/index.html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
