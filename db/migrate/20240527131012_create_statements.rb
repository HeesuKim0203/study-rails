class CreateStatements < ActiveRecord::Migration[7.1]
  def change
    create_table :statements do |t|
      t.string :summary
      t.integer :count
      t.string :unit
      t.integer :price
      t.string :tax
      t.boolean :withholding
      t.references :bill, null: false, foreign_key: { to_table: :bills }, type: :string

      t.timestamps
    end
  end
end
