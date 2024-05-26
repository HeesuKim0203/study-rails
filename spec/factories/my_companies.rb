FactoryBot.define do
  factory :my_company do
    id { SecureRandom.uuid }
    responsible_person { "John Doe" }
    company_name { "My Company" }
    company_info { "Company Information" }
    bank_account { "Bank Account Information" }
  end
end
