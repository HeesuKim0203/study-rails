module Api
  module V1
    class StatementsController < ApplicationController
      protect_from_forgery with: :null_session

      # def index
      #   @statement = Statement.all
      #   render json: @statement
      # end

      def update
        @statement = Statement.find(params[:id])
        if @statement.update(statement_params)
          render json: @statement, status: :ok
        else
          render json: { errors: @statement.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @statement = Statement.find(params[:id])
        if @statement.destroy
          render json: { message: 'Statements deleted successfully' }, status: :ok
        else
          render json: { errors: @statement.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def statement_params
        params.require(:statement).permit(:summary, :count, :unit, :price, :tax, :withholding, :bill_id)
      end
    end
  end
end
