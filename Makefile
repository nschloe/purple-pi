default:
	@echo "make update?"

update:
	npm update
	npm update --save-dev
	npm outdated

format:
	npm run format

lint:
	npm run lint

clean:
	rm -rf dist/ node_modules/ purple-pi.zip
