APP=my-legacy-web
PORT=80

init:
	heroku login
	heroku container:login
	heroku create ${APP}

build:
	@docker build . -t ${APP}

up:
	@docker run --rm --name ${APP} -e PORT=${PORT} -d -p 8000:${PORT} ${APP}
	@echo "http://localhost:8000" 

down:
	@docker stop ${APP}

push:
	@docker tag ${APP} mong0520/${APP}
	@docker push mong0520/${APP}
	@heroku container:push web

release:
	@heroku container:release web
	@heroku open