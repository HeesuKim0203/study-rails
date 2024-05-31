class Bill < ApplicationRecord
  after_commit :index_document, on: [:create, :update]
  after_commit :delete_document, on: :destroy

  has_many :statements, dependent: :destroy
  accepts_nested_attributes_for :statements, allow_destroy: true, update_only: true

  belongs_to :my_company
  before_create :set_uuid

  paginates_per 10

  def self.search(query)
    OpenSearchClient.search(
      index: 'bills',
      body: query
    )
  end

  def as_indexed_json
    as_json(
      only: [
        :id,
        :business_partner,
        :tail_str,
        :branch_number,
        :invoice_date,
        :method_of_deposit,
        :deposit_date,
        :title,
        :representative,
        :remarks,
        :memo,
        :my_company_id,
        :created_at,
        :updated_at,
        :amount,
        :method_of_tax
      ]
    )
  end

  def index_document
    OpenSearchClient.index(
      index: 'bills',
      id: id,
      body: as_indexed_json
    )
  end

  def delete_document
    OpenSearchClient.delete(
      index: 'bills',
      id: id
    )
  end

  private

  def set_uuid
    self.id = SecureRandom.uuid
  end
end
