install:
	npm install

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
	./infrastructure/terraform-install.sh
	$(MAKE) terraform-init

terraform-init:
	./infrastructure/terraform-init.sh

terraform-apply:
	./infrastructure/terraform-apply.sh

terraform-destroy:
	./infrastructure/terraform-destroy.sh

.PHONY: install test build deploy terraform-install terraform-apply terraform-destroy
