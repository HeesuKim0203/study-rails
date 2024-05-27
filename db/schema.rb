# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_27_143956) do
  create_table "bills", id: { type: :string, limit: 36 }, charset: "utf8mb3", force: :cascade do |t|
    t.string "business_partner"
    t.string "tail_str"
    t.string "branch_number"
    t.date "invoice_date"
    t.string "method_of_deposit"
    t.date "deposit_date"
    t.date "transfer_date"
    t.string "title"
    t.string "representative"
    t.string "remarks"
    t.string "memo"
    t.string "my_company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["my_company_id"], name: "index_bills_on_my_company_id"
  end

  create_table "my_companies", id: { type: :string, limit: 36 }, charset: "utf8mb3", force: :cascade do |t|
    t.string "responsible_person"
    t.string "company_name"
    t.text "company_info"
    t.text "bank_account"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "statements", id: { type: :string, limit: 36 }, charset: "utf8mb3", force: :cascade do |t|
    t.string "summary"
    t.integer "count"
    t.string "unit"
    t.integer "price"
    t.string "tax"
    t.boolean "withholding"
    t.string "bill_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bill_id"], name: "index_statements_on_bill_id"
  end

  add_foreign_key "bills", "my_companies"
  add_foreign_key "statements", "bills"
end
