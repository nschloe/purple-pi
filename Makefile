default:
	@echo "make update?"


update:
	npm update
	npm update --save-dev
	npm outdated

clean:
	rm -rf dist/ node_modules/ green-pi.zip
