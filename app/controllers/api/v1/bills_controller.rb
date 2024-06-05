module Api
  module V1
    class BillsController < ApplicationController
      protect_from_forgery with: :null_session

      def count

        if search_params.present?
          bills = search_bill(search_params)
          total_count = bills.size
        else
          total_count = Bill.count
        end
        render json: { total_count: total_count }
      end

      def index

        if search_params.present?
          bills = search_bill(search_params)
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

      def search_bill(search_params)
        must_queries = search_params.map do |key, value|
          if key == 'amount'
            if value.match?(/(<=|>=|<|>)/)
              amount_value, operator = value.split(' ').map(&:strip)
              case operator
              when '>='
                { range: { key => { lte: amount_value.to_i } } }
              when '<='
                { range: { key => { gte: amount_value.to_i } } }
              end
            end
          else
            { wildcard: { key => '*#{value}*' } }
          end
        end

        query_body = {
          query: {
            bool: {
              must: must_queries
            }
          }
        }

        search_response = Bill.search(query_body)
        bills = Bill.where(id: search_response['hits']['hits'].map { |hit| hit['_id'] })

        return bills
      end

      def search_params
        search_params = params.permit(
          :business_partner, :tail_str, :branch_number, :invoice_date,
          :method_of_deposit, :deposit_date, :title, :representative,
          :remarks, :memo, :my_company_id, :amount, :method_of_tax
        ).to_h.compact

        return search_params
      end

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
