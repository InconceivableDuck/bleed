# Add additional source files to the SRC variable.
LINT_SRC = $(wildcard *.js)

test: $(LINT_SRC)
	@node_modules/.bin/jshint $^
	@node_modules/.bin/istanbul test node_modules/.bin/_mocha \
		-R spec -- \
		--reporter spec