class Api::ProjectsController < Api::BaseApiController
  
  def index
    
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = Project.active_objects.joins(:customer).where{
        (is_deleted.eq false) & 
        (
          (title =~  livesearch )
        )
        
      }.page(params[:page]).per(params[:limit]).order("id DESC")
      
      @total = Project.where{
        (is_deleted.eq false) & 
        (
          (title =~  livesearch )
        )
      }.count
      
      # calendar
      
    else
      @objects = Project.active_objects.joins(:customer).page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Project.active_objects.count 
    end
    
    
    # render :json => { :projects => @objects , :total => @total , :success => true }
  end

  def create
    # @object = Project.new(params[:project])
 
    params[:project][:deadline_date] =  parse_date_from_client_booking( params[:project][:deadline_date] ) 
    @object = Project.create_object( params[:project] )
    
    if @object.errors.size == 0 
      render :json => { :success => true, 
                        :projects => [{
                          :id 						=>		@object.id ,
                        	:title =>			@object.title   ,
                        	:customer_id 	=>		@object.customer.id   ,
                        	:customer_name 		=>		@object.customer.name,
                        	:deadline_date	=>			format_date_friendly(@object.deadline_date)  ,
                        	:description     =>   @object.description  
                        }],
                         
                        :total => Project.active_objects.count }  
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
    @object = Project.find(params[:id])
    params[:project][:deadline_date] =  parse_date_from_client_booking( params[:project][:deadline_date] ) 
    
    
    puts "==========> \n"*10
    puts "Before update object"
    @object.update_object( params[:project] )
    
    puts "After update object"
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :projects => [
                          {
                            :id 						 =>	@object.id,                                               
                          	:deadline_date  =>	format_date_friendly(@object.deadline_date),
                          	:title 	 =>	 @object.title ,
                          	:description => @object.description 
                          }],
                        :total => Project.active_objects.count  } 
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
    @object = Project.find(params[:id])
    @object.delete_object 

    if ( not @object.persisted?  or @object.is_deleted ) and @object.errors.size == 0 
      render :json => { :success => true, :total => Project.active_objects.count }  
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
      @objects = Project.where{ (title =~ query)   & 
                                (is_deleted.eq false )
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
                        
      @total =  Project.where{ (title =~ query)   & 
                                (is_deleted.eq false )
                              }.count
    else
      @objects = Project.where{ (id.eq selected_id)  & 
                                (is_deleted.eq false )
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
                        
      @total = Project.where{ (id.eq selected_id)  & 
                                (is_deleted.eq false )
                              }.count
    end
    
    
    render :json => { :records => @objects , :total => @total , :success => true }
  end
end
