class FreelancersController < ApplicationController
  def profile
    # @user = User.new 
    # @user.account_id = search_params[:account_id].gsub('-', '.')
  end

  def index
    redirect_to profile_path
  end

  def create
    @freelancer = Freelancer.new(freelancer_params)

    if @freelancer.save 
      flash.now[:success] = "Successfully save user"
      render 'profile'
    else 
      flash.now[:success] = "Updated profile"
      @freelancer = Freelancer.find_by(account_id: freelancer_params[:account_id])
      @freelancer.message = freelancer_params[:message]
      @freelancer.price_per_hour = freelancer_params[:price_per_hour]
      @freelancer.save
      render 'profile'
    end
  end

  private
    def freelancer_params 
      params.permit(:message, :price_per_hour, :account_id)
    end

    def search_params 
      params.permit(:account_id)
    end
end
