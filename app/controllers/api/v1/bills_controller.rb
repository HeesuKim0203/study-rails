module Api
  module V1
    class BillsController < ApplicationController

      protect_from_forgery with: :null_session
      skip_before_action :verify_authenticity_token, only: [:create, :update]

      def count
        search_params = params.permit(
          :business_partner, :tail_str, :branch_number, :invoice_date,
          :method_of_deposit, :deposit_date, :title, :representative,
          :remarks, :memo, :my_company_id, :amount, :method_of_tax
        ).to_h.compact

        if search_params.present?

            must_queries = search_params.map do |key, value|
            { wildcard: { key => "*#{value}*" } }
          end

            query_body = {
            query: {
              bool: {
                must: must_queries
              }
            }
          }

          search_response = Bill.search(query_body)
          bills = search_response['hits']['hits'].map { |hit| Bill.find(hit['_id']) }
          total_count = bills.size
        else
          total_count = Bill.count
        end
        render json: { total_count: total_count }
      end

      def index
        search_params = params.permit(
          :business_partner, :tail_str, :branch_number, :invoice_date,
          :method_of_deposit, :deposit_date, :title, :representative,
          :remarks, :memo, :my_company_id, :amount, :method_of_tax
        ).to_h.compact

        if search_params.present?

          must_queries = search_params.map do |key, value|
            { wildcard: { key => "*#{value}*" } }
          end

          query_body = {
            query: {
              bool: {
                must: must_queries
              }
            }
          }

          search_response = Bill.search(query_body)
          bills = search_response['hits']['hits'].map { |hit| Bill.find(hit['_id']) }
        else
          bills = Bill.order(updated_at: :desc)
        end

        if params[:per_page].present? && params[:page].present?
          bills = Kaminari.paginate_array(bills).page(params[:page]).per(params[:per_page])
        end

        render json: bills, include: :statements
      end

      def show
        bill = Bill.find(params[:id])
        render json: bill, include: :statements
      end

      def create
        bill = Bill.new(bill_params)
        if bill.save
          render json: bill, include: :statements, status: :created
        else
          render json: { errors: bill.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        bill = Bill.find(params[:id])
        if bill.update(bill_params)
          render json: bill, include: :statements, status: :ok
        else
          render json: { errors: bill.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        bill = Bill.find(params[:id])
        if bill.destroy
          render json: { message: 'Bill deleted successfully' }, status: :ok
        else
          render json: { errors: bill.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def bill_params
        params.require(:bill).permit(
          :business_partner,
          :tail_str,
          :branch_number,
          :invoice_date,
          :method_of_deposit,
          :deposit_date,
          :amount,
          :title,
          :representative,
          :method_of_tax,
          :remarks,
          :memo,
          :my_company_id,
          statements_attributes: [
            :id,
            :summary,
            :count,
            :unit,
            :price,
            :tax,
            :withholding,
            :_destroy
          ]
        )
      end
    end
  end
end
