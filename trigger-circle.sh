#!/usr/bin/env bash

# todo: use correct repo url for pull requests and forks

echo "Triggering Circle build against deployed url $DEPLOY_URL branch $BRANCH"

# Circle API https://circleci.com/docs/api/v1-reference/

# pass deployed url to Cypress as an environment variable
# https://on.cypress.io/environment-variables
curl -u ${CIRCLE_API_USER_TOKEN}: \
      -d build_parameters[CYPRESS_baseUrl]=$DEPLOY_URL \
      https://circleci.com/api/v1.1/project/github/bahmutov/gatsby-starter-blog/tree/$BRANCH
