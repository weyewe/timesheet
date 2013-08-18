class Api::AppUsersController < Api::BaseApiController
  
  def index
    
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = User.where{
        (is_deleted.eq false) & 
        (
          (name =~  livesearch ) | 
          (email =~  livesearch )
        )
        
      }.page(params[:page]).per(params[:limit]).order("id DESC")
      
      @total = User.where{
        (is_deleted.eq false) & 
        (
          (name =~  livesearch ) | 
          (email =~  livesearch )
        )
        
      }.count
    else
      @objects = User.active_objects.joins(:role).page(params[:page]).per(params[:limit]).order("id DESC")
      @total = User.active_objects.count
    end
    
    
    
    # render :json => { :users => @objects , :total => @total, :success => true }
  end

  def create
    @object = User.create_by_employee(current_user,  params[:user] )  
    
    
 
    if @object.errors.size == 0 
      render :json => { :success => true, 
                        :users => [{
                          :id 			=> 				@object.id ,
                        	:name 		=> 				@object.name ,
                        	:email		=> 	@object.email ,
                        	:role_name=> 			@object.role.name
                        }] , 
                        :total => User.active_objects.count }  
    else
      msg = {
        :success => false, 
        :message => {
          :errors => extjs_error_format( @object.errors )  
        }
      }
      
      render :json => msg                         
    end
  end

  def update
    
    @object = User.find_by_id params[:id] 
    @object.update_by_employee(current_user,  params[:user])
     
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :users => [@object],
                        :total => User.active_objects.count  } 
    else
      msg = {
        :success => false, 
        :message => {
          :errors => extjs_error_format( @object.errors )  
        }
      }
      
      render :json => msg 
    end
  end

  def destroy
    @object = User.find(params[:id])
    @object.delete(current_user)

    if @object.is_deleted
      render :json => { :success => true, :total => User.active_objects.count }  
    else
      render :json => { :success => false, :total => User.active_objects.count }  
    end
  end
end
