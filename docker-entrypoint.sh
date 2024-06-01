#!/bin/bash
set -e

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Check if node_modules folder exists, if not run npm install
if [ ! -d "node_modules" ]; then
  echo "Installing npm dependencies..."
  npm install
fi

# Check if database exists
bundle exec rails db:prepare

# Run migrations
bundle exec rails db:migrate

# Run seed
bundle exec rails db:seed

# Index the data
bundle exec rails runner "Bill.find_each(&:index_document)"

# Then exec the container's main process (what's set as CMD in the Dockerfile)
exec "$@"
