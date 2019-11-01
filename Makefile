build:
	docker build -t legacy-webs .

run:
	docker run --rm -d --name legacy-webs -p 80:80 legacy-webs
