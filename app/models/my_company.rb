class MyCompany < ApplicationRecord
  has_many :bills
  before_create :set_uuid

  private

  def set_uuid
    self.id = SecureRandom.uuid
  end
end
