#!/usr/bin/env bash

# todo: use correct repo url for pull requests and forks

echo "Triggering Circle build against deployed url $DEPLOY_URL branch $BRANCH"
echo "Other Netlify variables"
echo "REPOSITORY_URL $REPOSITORY_URL"
echo "PULL_REQUEST $PULL_REQUEST"
echo "CONTEXT $CONTEXT"
echo "REVIEW_ID $REVIEW_ID"
echo "URL $URL"
echo "DEPLOY_URL $DEPLOY_URL"
echo "DEPLOY_PRIME_URL $DEPLOY_PRIME_URL"

# Circle API https://circleci.com/docs/api/v1-reference/

# pass deployed url to Cypress as an environment variable
# https://on.cypress.io/environment-variables

if [[ -n PULL_REQUEST ]]; then
  echo "Triggering pull request build - cannot use BRANCH directly"
  curl -u ${CIRCLE_API_USER_TOKEN}: \
        -d build_parameters[CYPRESS_baseUrl]=$DEPLOY_URL \
        https://circleci.com/api/v1.1/project/github/bahmutov/gatsby-starter-blog/tree/pulls/$REVIEW_ID
else
  curl -u ${CIRCLE_API_USER_TOKEN}: \
        -d build_parameters[CYPRESS_baseUrl]=$DEPLOY_URL \
        https://circleci.com/api/v1.1/project/github/bahmutov/gatsby-starter-blog/tree/$BRANCH
fi
