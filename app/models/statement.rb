class Statement < ApplicationRecord
  belongs_to :bill

  validates :summary, :count, :unit, :price, :tax, presence: true
  validates :withholding, inclusion: { in: [true, false] }

  before_create :set_uuid

  private

  def set_uuid
    self.id = SecureRandom.uuid
  end
end
