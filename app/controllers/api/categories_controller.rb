class Api::CategoriesController < Api::BaseApiController
  
  def index
    
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = Category.where{
        (is_deleted.eq false) & 
        (
          (name =~  livesearch )
        )
        
      }.page(params[:page]).per(params[:limit]).order("id DESC")
      
      @total = Category.where{
        (is_deleted.eq false) & 
        (
          (name =~  livesearch )
        )
      }.count
      
      # calendar
      
    else
      @objects = Category.active_objects.page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Category.active_objects.count 
    end
    
    
    render :json => { :categories => @objects , :total => @total , :success => true }
  end

  def create
    # @object = Category.new(params[:category])
 
    @object = Category.create_object( params[:category] )
    if @object.errors.size == 0 
      render :json => { :success => true, 
                        :categories => [@object] , 
                        :total => Category.active_objects.count }  
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
    @object = Category.find(params[:id])
    
    @object.update_object( params[:category] )
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :categories => [@object],
                        :total => Category.active_objects.count  } 
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
    @object = Category.find(params[:id])
    @object.delete_object 

    if ( not @object.persisted?  or @object.is_deleted ) and @object.errors.size == 0 
      render :json => { :success => true, :total => Category.active_objects.count }  
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
      @objects = Category.where{ (name =~ query)   & 
                                (is_deleted.eq false )
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
                        
      @total =                   Category.where{ (name =~ query)   & 
                                                  (is_deleted.eq false )
                                                }.count
    else
      @objects = Category.where{ (id.eq selected_id)  & 
                                (is_deleted.eq false )
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
                        
      @total =     Category.where{ (id.eq selected_id)  & 
                                    (is_deleted.eq false )
                                  }.count
    end
    
    
    
    render :json => { :records => @objects , :total => @total, :success => true }
  end
end
