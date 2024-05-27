module Api
  module V1
    class BillsController < ApplicationController
      def index
        @bills = Bill.all
        render json: @bills
      end

      def show
        @bill = Bill.find(params[:id])
        render json: @bill
      end

      def create
        @bill = Bill.new(bill_params)
        if @bill.save
          render json: @bill, status: :created
        else
          render json: @bill.errors, status: :unprocessable_entity
        end
      end

      def update
        @bill = Bill.find(params[:id])
        if @bill.update(bill_params)
          render json: @bill
        else
          render json: @bill.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @bill = Bill.find(params[:id])
        if @bill.destroy
          render json: { message: 'Bill successfully deleted' }, status: :ok
        else
          render json: { error: 'Failed to delete bill' }, status: :unprocessable_entity
        end
      end

      private

      def bill_params
        params.require(:bill).permit(
          :business_partner,
          :tail_str,
          :bill_id,
          :branch_number,
          :invoice_date,
          :method_of_deposit,
          :deposit_date,
          :transfer_date,
          :title,
          :representative,
          :remarks,
          :memo,
          :my_company_id
        )
      end
    end
  end
end
