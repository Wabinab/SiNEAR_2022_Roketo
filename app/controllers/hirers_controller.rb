class HirersController < ApplicationController
  def profile
  end

  def hiring
    @freelancer = Freelancer.find_by(account_id: search_params[:account_id])
  end

  def cards
  end

  private

    def search_params 
      params.permit(:account_id)
    end
end
