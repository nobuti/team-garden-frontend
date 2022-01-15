SHELL := /bin/bash # Use bash syntax

mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir_name := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))

run:
	docker-compose run --service-ports --name front-container --rm app

up:
	docker-compose build

stop:
	docker-compose stop

destroy:
	docker-compose down
	docker rmi front
