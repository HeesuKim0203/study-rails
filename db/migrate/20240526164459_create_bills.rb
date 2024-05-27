class CreateBills < ActiveRecord::Migration[7.1]
  def change
    create_table :bills, id:false do |t|
      t.string :id, primary_key: true, limit: 36
      t.string :business_partner
      t.string :tail_str
      t.string :bill_id
      t.string :branch_number
      t.date :invoice_date
      t.string :method_of_deposit
      t.date :deposit_date
      t.date :transfer_date
      t.string :title
      t.string :representative
      t.string :remarks
      t.string :memo
      t.references :my_company, null: false, foreign_key: true, type: :string

      t.timestamps
    end
  end
end
