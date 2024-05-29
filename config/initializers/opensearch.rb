require 'opensearch-ruby'

OpenSearchClient = OpenSearch::Client.new(
  hosts: 'http://localhost:9200',
  log: true,
  transport_options: {
    ssl: {
      verify: false
    }
  }
)
