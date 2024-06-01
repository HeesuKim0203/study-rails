FactoryBot.define do
  factory :bill do
    id { SecureRandom.uuid }
    business_partner { "Business Partner" }
    tail_str { "Tail String" }
    branch_number { "Branch Number" }
    invoice_date { Date.today }
    method_of_deposit { "Method of Deposit" }
    deposit_date { Date.today }
    amount { "amount" }
    method_of_tax { "method_of_tax" }
    title { "Title" }
    representative { "Representative" }
    remarks { "Remarks" }
    memo { "Memo" }
    association :my_company
  end
end
