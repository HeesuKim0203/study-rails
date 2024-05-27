class HomeController < ApplicationController
  def index
    @bills = Bill.all
    @my_companies = MyCompany.all
  end
end
