#:Install npm packages
install:
	npm install

#:Run all unit tests
test:
	npm test

build:
	rm -f get_public_url_lambda.zip
	zip get_public_url_lambda.zip index.js src/**

deploy:
	$(MAKE) terraform-destroy
	$(MAKE) build
	$(MAKE) terraform-apply

terraform-install:
	./terraform/terraform-install.sh

terraform-apply:
	./terraform/terraform-apply.sh

terraform-destroy:
	./terraform/terraform-destroy.sh

.PHONY: install test build deploy terraform-install terraform-apply terraform-destroy
