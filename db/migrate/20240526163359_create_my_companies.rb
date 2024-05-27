class CreateMyCompanies < ActiveRecord::Migration[7.1]
  def change
    create_table :my_companies, id:false do |t|
      t.string :id, primary_key: true, limit: 36
      t.string :responsible_person
      t.string :company_name
      t.text :company_info
      t.text :bank_account

      t.timestamps
    end
  end
end
