install:
	npm install

test:
	npm test

run:
	npm start $(url) $(text)

deploy:
	./infrastructure/deploy.sh

.PHONY: install test run deploy
