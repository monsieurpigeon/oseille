USER_ID = $(shell id -u)
GROUP_ID = $(shell id -g)

export UID = $(USER_ID)
export GID = $(GROUP_ID)

DOCKER_COMPOSE_DEV = docker-compose -p oseille

help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install docker stack
	$(DOCKER_COMPOSE_DEV) run --rm node bash -ci 'npm install'

start: ## Start all the stack
	$(DOCKER_COMPOSE_DEV) up -d

stop: ## Stop all the containers
	$(DOCKER_COMPOSE_DEV) down

log: ## Show logs
	$(DOCKER_COMPOSE_DEV) logs -f node