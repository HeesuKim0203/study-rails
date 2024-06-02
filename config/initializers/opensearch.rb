require 'opensearch-ruby'

OpenSearchClient = OpenSearch::Client.new(
  hosts: ENV['OPENSEARCH_URL'],
  log: true,
  transport_options: {
    ssl: {
      verify: false
    }
  }
)

unless OpenSearchClient.indices.exists?(index: 'bills')
  OpenSearchClient.indices.create(
    index: 'bills',
    body: {
      settings: {
        number_of_shards: 1,
        number_of_replicas: 0,
        analysis: {
          tokenizer: {
            kuromoji_tokenizer: {
              type: 'kuromoji_tokenizer'
            }
          },
          analyzer: {
            kuromoji_analyzer: {
              type: 'custom',
              tokenizer: 'kuromoji_tokenizer'
            }
          }
        }
      },
      mappings: {
        properties: {
          id: { type: 'keyword' },
          business_partner: { type: 'text', analyzer: 'kuromoji_analyzer' },
          tail_str: { type: 'text', analyzer: 'kuromoji_analyzer' },
          branch_number: { type: 'text', analyzer: 'kuromoji_analyzer' },
          invoice_date: { type: 'date' },
          method_of_deposit: { type: 'text', analyzer: 'kuromoji_analyzer' },
          deposit_date: { type: 'date' },
          title: { type: 'text', analyzer: 'kuromoji_analyzer' },
          representative: { type: 'text', analyzer: 'kuromoji_analyzer' },
          remarks: { type: 'text', analyzer: 'kuromoji_analyzer' },
          memo: { type: 'text', analyzer: 'kuromoji_analyzer' },
          my_company_id: { type: 'keyword' },
          created_at: { type: 'date' },
          updated_at: { type: 'date' },
          amount: { type: 'integer' },
          method_of_tax: { type: 'text', analyzer: 'kuromoji_analyzer' }
        }
      }
    }
  )
end
