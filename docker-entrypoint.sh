#!/bin/bash
set -e

# Remove pre-existing server.pid for Rails.
rm -f /rails/tmp/pids/server.pid

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

# Index the data
bundle exec rails runner "Bill.find_each(&:index_document)"
bundle exec rails server

# Then exec the container's main process (what's set as CMD in the Dockerfile)
exec "$@"
