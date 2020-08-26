default:
	@echo "make update?"


update:
	npm update
	npm update --save-dev
	npm outdated
