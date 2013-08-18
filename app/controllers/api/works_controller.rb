class Api::WorksController < Api::BaseApiController
  
  def index
    
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = Work.active_objects.joins(:customer).where{
        ( user_id.eq current_user.id) & 
        (is_deleted.eq false) & 
        (
          (title =~  livesearch )
        )
        
      }.page(params[:page]).per(params[:limit]).order("id DESC")
      
      @total = Work.where{
        ( user_id.eq current_user.id) & 
        (is_deleted.eq false) & 
        (
          (title =~  livesearch )
        )
      }.count
      
      # calendar
      
    else
      @objects = Work.active_objects.where(:user_id => current_user.id).joins(:project, :category).page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Work.active_objects.where(:user_id => current_user.id).count 
    end
    
    
    # render :json => { :works => @objects , :total => @total , :success => true }
  end

  def create
    # @object = Work.new(params[:work])
 
    params[:work][:deadline_date] =  parse_date_from_client_booking( params[:work][:deadline_date] ) 
    @object = Work.create_object( params[:work] )
    
    if @object.errors.size == 0 
      render :json => { :success => true, 
                        :works => [{
                          :id 						=>		@object.id ,
                        	:start_datetime =>			format_datetime_friendly(@object.start_datetime)   ,
                        	:end_datetime 	=>		format_datetime_friendly(@object.end_datetime)   ,
                        	:category_id 		=>		@object.category_id,
                        	:category_name	=>			@object.category.name,
                        	:project_id     =>   @object.project_id ,
                        	:project_title   =>       @object.project.name,
                        	:duration       =>    @object.duration
                        }] , 
                        :total => Work.active_objects.where(:user_id => current_user.id).count }  
    else
      msg = {
        :success => false, 
        :message => {
          :errors => extjs_error_format( @object.errors ) 
          # :errors => {
          #   :name => "Nama tidak boleh bombastic"
          # }
        }
      }
      
      render :json => msg                         
    end
  end

  def update
    @object = Work.find(params[:id])
    params[:work][:deadline_date] =  parse_date_from_client_booking( params[:work][:deadline_date] ) 
    
    
    puts "==========> \n"*10
    puts "Before update object"
    @object.update_object( params[:work] )
    
    puts "After update object"
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :works => [
                          {
                            :id 						=>		@object.id ,
                          	:start_datetime =>			format_datetime_friendly(@object.start_datetime)   ,
                          	:end_datetime 	=>		format_datetime_friendly(@object.end_datetime)   ,
                          	:category_id 		=>		@object.category_id,
                          	:category_name	=>			@object.category.name,
                          	:project_id     =>   @object.project_id ,
                          	:project_title   =>       @object.project.name,
                          	:duration       =>    @object.duration
                          }],
                        :total => Work.active_objects.where(:user_id => current_user.id).count  } 
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
    @object = Work.find(params[:id])
    @object.delete_object 

    if ( not @object.persisted?  or @object.is_deleted ) and @object.errors.size == 0 
      render :json => { :success => true, :total => Work.active_objects.where(:user_id => current_user.id).count }  
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
  
  
  def search
    search_params = params[:query]
    selected_id = params[:selected_id]
    if params[:selected_id].nil?  or params[:selected_id].length == 0 
      selected_id = nil
    end
    
    query = "%#{search_params}%"
    # on PostGre SQL, it is ignoring lower case or upper case 
    
    if  selected_id.nil?
      @objects = Work.where{ (title =~ query)   & 
                                (is_deleted.eq false ) & 
                                (user_id.eq current_user.id )
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
    else
      @objects = Work.where{ (id.eq selected_id)  & 
                                (is_deleted.eq false ) & 
                                (user_id.eq current_user.id )
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
    end
    
    render :json => { :records => @objects , :total => @objects.count, :success => true }
  end
end
