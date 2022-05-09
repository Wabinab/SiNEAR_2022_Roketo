class FreelancersController < ApplicationController
  def profile
    @freelancer = Freelancer.find_by(account_id: search_params[:account_id])

    # For auto filling form
    # if @current_user.nil?
    #   @current_user = Freelancer.new
    # end
  end

  def create
    @freelancer = Freelancer.new(freelancer_params)

    if @freelancer.save 
      flash.now[:success] = "Successfully save user"
      render 'profile'
    else 
      flash.now[:success] = "Updated profile"
      @freelancer = Freelancer.find_by(account_id: freelancer_params[:account_id])
      @freelancer.update(freelancer_params)
      @freelancer.save
      render 'profile'
    end
  end

  private
    def freelancer_params 
      params.permit(:message, :price_per_hour, :account_id, :for_hire)
    end

    def search_params 
      params.permit(:account_id)
    end
end
