class Bill < ApplicationRecord

  has_many :statements, dependent: :destroy
  accepts_nested_attributes_for :statements, allow_destroy: true, update_only: true

  belongs_to :my_company
  before_create :set_uuid

  paginates_per 10

  private

  def set_uuid
    self.id = SecureRandom.uuid
  end
end
