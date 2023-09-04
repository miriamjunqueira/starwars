#!/bin/bash

### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'trybe-publisher' fornecido
## pela Trybe.

[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
    --path .trybe \
    --path .github \
    --path trybe.yml \
    --path trybe-filter-repo.sh \
    --path cypress \
    --path cypress.config.js \
    --path reporter.json \
    --path req-1.png \
    --path req-2.gif \
    --path req-3.gif \
    --path req-4.gif \
    --path req-6.gif \
    --path req-7.gif \
    --path req-8.gif \
    --path req-9.gif \
    --path projectIntro.gif \
    --path coverage.png \
    --path cypress-specs.jpeg \
    --path README.md \
    --invert-paths --force --quiet
