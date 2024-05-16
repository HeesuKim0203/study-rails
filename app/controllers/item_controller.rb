class ItemController < ApplicationController
  def index
    @items = Item.all
    @item = Item.new
  end

  def show
  end
end
