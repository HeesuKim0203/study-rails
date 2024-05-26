module Api
  module V1
    class MyCompaniesController < ApplicationController
      def index
        @my_companies = MyCompany.all
        render json: @my_companies
      end

      def show
        @my_company = MyCompany.find(params[:id])
        render json: @my_company
      end

      def create
        @my_company = MyCompany.new(my_company_params)
        if @my_company.save
          render json: @my_company, status: :created
        else
          render json: @my_company.errors, status: :unprocessable_entity
        end
      end

      private

      def my_company_params
        params.require(:my_company).permit(:field1, :field2) # 필요한 필드들 추가
      end
    end
end
end
