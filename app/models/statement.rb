class Statement < ApplicationRecord
  belongs_to :bill

  validates :withholding, inclusion: { in: [true, false] }

  before_create :set_uuid

  private

  def set_uuid
    self.id = SecureRandom.uuid
  end
end
