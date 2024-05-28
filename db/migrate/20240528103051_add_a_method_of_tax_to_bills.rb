class AddAMethodOfTaxToBills < ActiveRecord::Migration[7.1]
  def change
    add_column :bills, :method_of_tax, :string
  end
end
