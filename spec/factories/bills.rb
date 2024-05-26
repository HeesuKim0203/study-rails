FactoryBot.define do
  factory :bill do
    id { SecureRandom.uuid }
    business_partner { "Business Partner" }
    tail_str { "Tail String" }
    bill_id { "Bill ID" }
    branch_number { "Branch Number" }
    invoice_date { Date.today }
    method_of_deposit { "Method of Deposit" }
    deposit_date { Date.today }
    transfer_date { Date.today }
    title { "Title" }
    representative { "Representative" }
    remarks { "Remarks" }
    memo { "Memo" }
    association :my_company
  end
end
