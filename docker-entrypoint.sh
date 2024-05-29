#!/bin/bash
set -e

# Check if database exists
bundle exec rails db:prepare

# Run migrations
bundle exec rails db:migrate

# Index the data
bundle exec rails runner "Bill.find_each(&:index_document)"

# Then exec the container's main process (what's set as CMD in the Dockerfile)
exec "$@"