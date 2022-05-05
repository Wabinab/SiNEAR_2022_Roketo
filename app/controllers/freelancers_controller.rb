class FreelancersController < ApplicationController
  def profile
    @user = User.new 
    @user.account_id = search_params[:account_id].gsub('-', '.')
  end

  private
    def search_params 
      params.permit(:account_id)
    end
end
