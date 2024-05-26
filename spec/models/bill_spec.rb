require "rails_helper"

RSpec.describe Bill, type: :model do
  it "creates a bill with valid attributes" do
    my_company = FactoryBot.create(:my_company)
    bill = FactoryBot.build(:bill, my_company: my_company)

    expect(bill).to be_valid
    expect { bill.save }.to change { Bill.count }.by(1)
  end
end
