class ItemsController < ApplicationController

  def index
    @items = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end

  def create
    @item = Item.new(item_params)
    puts params.inspect

    if @item.save
      redirect_to item_index_path, notice: 'Item was successfully created.'
    else
      flash.now[:alert] = 'Failed to create item.'
      render :index
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
    respond_to do |format|
      format.html { redirect_to item_index_path, notice: 'Item was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private
    def item_params
      params.require(:item).permit(:image, :product_name, :company_name, :desc)
    end
end
