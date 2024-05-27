module Api
  module V1
    class MyCompaniesController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        @my_companies = MyCompany.all
        render json: @my_companies
      end

      def show
        @my_company = MyCompany.find(params[:id])
        render json: @my_company
      end

      # def create
      #   @my_company = MyCompany.new(my_company_params)
      #   if @my_company.save
      #     render json: @my_company, status: :created
      #   else
      #     render json: @my_company.errors, status: :unprocessable_entity
      #   end
      # end

      def update
        @my_company = MyCompany.find(params[:id])
        if @my_company.update(my_company_params)
          render json: @my_company, status: :ok
        else
          render json: @my_company.errors, status: :unprocessable_entity
        end
      end

      # def destroy
      #   @my_company = MyCompany.find(params[:id])
      #   @my_company.destroy
      #   head :no_content
      # end

      private

      def my_company_params
        params.require(:my_company).permit(:responsible_person, :company_name, :company_info, :bank_account)
      end
    end
  end
end
