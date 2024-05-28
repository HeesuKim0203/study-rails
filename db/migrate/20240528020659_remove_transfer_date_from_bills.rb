class RemoveTransferDateFromBills < ActiveRecord::Migration[7.1]
  def change
    remove_column :bills, :transfer_date, :date
  end
end
