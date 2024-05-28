class AddAmountToBills < ActiveRecord::Migration[7.1]
  def change
    add_column :bills, :amount, :integer
  end
end
