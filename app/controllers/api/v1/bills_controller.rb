module Api
  module V1
    class BillsController < ApplicationController

      protect_from_forgery with: :null_session
      skip_before_action :verify_authenticity_token, only: [:create, :update]

      def count
        @total_count = Bill.count
        render json: { total_count: @total_count }
      end

      def index
        if params[:per_page] && params[:page]
          @bills = Bill.order(updated_at: :desc).page(params[:page]).per(params[:per_page])
        else
          @bills = Bill.all
        end
        render json: @bills, include: :statements
      end

      def show
        @bill = Bill.find(params[:id])
        render json: @bill, include: :statements
      end

      def create
        @bill = Bill.new(bill_params)
        if @bill.save
          render json: @bill, include: :statements, status: :created
        else
          render json: { errors: @bill.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        @bill = Bill.find(params[:id])
        if @bill.update(bill_params)
          render json: @bill, include: :statements, status: :ok
        else
          render json: { errors: @bill.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @bill = Bill.find(params[:id])
        if @bill.destroy
          render json: { message: 'Bill deleted successfully' }, status: :ok
        else
          render json: { errors: @bill.errors.full_messages }, status: :unprocessable_entity
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
