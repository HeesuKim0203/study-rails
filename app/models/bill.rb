class Bill < ApplicationRecord
  belongs_to :my_company
  before_create :set_uuid

  private

  def set_uuid
    self.id = SecureRandom.uuid
  end
end
