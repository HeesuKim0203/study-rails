class HomeController < ApplicationController
  def index
    @my_companies = MyCompany.all
  end
end
