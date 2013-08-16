class Api::PasswordsController < Api::BaseApiController
  before_filter :authenticate_user!, :except => [:create, :destroy, :say_hi ]
  respond_to :json
 
  def update
    @user = current_user

    if @user.update_with_password(params[:user])
      sign_in(@user, :bypass => true)
      flash[:notice] = "Password is updated successfully."
    else
      flash[:error] = "Fail to update password. Check your input!"
    end
    
    success_value = @user.errors.size == 0 
    
    if @user.errors.size == 0 
      render :json => {
        :success => true, 
        :message => "Pasword is updated succsesfully",
        :auth_token => @user.authentication_token 
      }
    else
      render :json => {
        :success => false, 
        :message => "Fail to update password"
      }
    end
    
  end
end