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
      
    elsif params[:selectedRecordId].present?
      project = Project.where(:id => params[:selectedRecordId]).first 
      if project.nil?
        @objects  = [] 
        @total = 0 
      else
        @objects = Work.active_objects.where(:user_id => current_user.id, 
                :project_id =>  project.id).
                joins(:project, :category).page(params[:page]).per(params[:limit]).order("id DESC")
                
        @total =         Work.active_objects.where(:user_id => current_user.id, 
                        :project_id =>  project.id).count
      end
      
      
    else
      @objects = Work.active_objects.where(:user_id => current_user.id).joins(:project, :category).page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Work.active_objects.where(:user_id => current_user.id).count 
    end
    
    
    # render :json => { :works => @objects , :total => @total , :success => true }
  end

  def create
    # @object = Work.new(params[:work])
 
    params[:work][:start_datetime] =  parse_datetime_from_client_booking( params[:work][:start_datetime] )
    params[:work][:end_datetime] =  parse_datetime_from_client_booking( params[:work][:end_datetime] )
    params[:work][:user_id]  = current_user.id 
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
                        	:project_title   =>       @object.project.title,
                        	:duration       =>    @object.duration,
                        	:description => @object.description
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
    
    params[:work][:start_datetime] =  parse_datetime_from_client_booking( params[:work][:start_datetime] )
    params[:work][:end_datetime] =  parse_datetime_from_client_booking( params[:work][:end_datetime] )
    params[:work][:user_id]  = current_user.id 
    
    
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
                          	:project_title   =>       @object.project.title,
                          	:duration       =>    @object.duration,
                          	:description => @object.description
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
  
  def reports
    # render :json => { 
    #     :store_config => {
    #        fields: ['year', 'comedy', 'action', 'drama', 'thriller'],
    #        data: [
    #                {year: 2005, comedy: 34000000, action: 23890000, drama: 18450000, thriller: 20060000},
    #                {year: 2006, comedy: 56703000, action: 38900000, drama: 12650000, thriller: 21000000},
    #                {year: 2007, comedy: 42100000, action: 50410000, drama: 25780000, thriller: 23040000},
    #                {year: 2008, comedy: 38910000, action: 56070000, drama: 24810000, thriller: 26940000}
    #              ]
    #     }  ,
    #     :axes_fields => ['comedy', 'action', 'drama', 'thriller'],
    #     :category_fields => ['year'],
    #     :series_x_field => 'year',
    #     :series_y_fields => ['comedy', 'action', 'drama', 'thriller'],
    #     
    # }
    
    # it is proven to be working.. 
    # on the reportpanel
    # afterrender: build the components: the chart and the list. 
=begin
  afterrender: 
  panel.removeAll(); 
  panel.buildComponents(); 
  
  refreshView: 
  panel.removeAll();
  panel.buildComponents(); 
  
  that's it. pretty much simple. lets' do it later. 
  
=end

    render :json => {
      :component_config => {
            :title  => 'Panel dynamically loaded',
            :html => "Awesome shite",
            :xtype  => 'panel'
         }
    }
    return 
  end
  
  def project_reports
    
    records = []
    Project.all.each do |project|
      records << {
        :name => project.title, 
        :data1 => project.works.sum("duration"),
        :id => project.id
      }
    end
    
    # records = [
    #   {
    #     :name => 'Project 1',
    #     :data1 => 350,
    #     :id => 1 
    #   },
    #   {
    #     :name => 'Project 2',
    #     :data1 => 250,
    #     :id => 2 
    #   },
    #   {
    #     :name => 'Project 3',
    #     :data1 => 100,
    #     :id => 3
    #   },
    #   {
    #     :name => 'Project 4',
    #     :data1 => 180,
    #     :id => 4 
    #   },
    #   {
    #     :name => 'Project 5',
    #     :data1 => 160,
    #     :id => 5 
    #   }
    # ]
    
    render :json => { :records => records , :total => records.count, :success => true }
    
    # render :json => {
    #   :config => {
    #     :xField => 'year',
    #     :yField =>  [  'comedy', 'action', 'drama', 'thriller'],
    #     :fields=> ['year', 'comedy', 'action', 'drama', 'thriller'],
    #     :data => [
    #       {
    #         :name => 'Project 1',
    #         :data1 => 350
    #       },
    #       {
    #         :name => 'Project 2',
    #         :data1 => 250
    #       },
    #       {
    #         :name => 'Project 3',
    #         :data1 => 100
    #       },
    #       {
    #         :name => 'Project 4',
    #         :data1 => 180
    #       },
    #       {
    #         :name => 'Project 5',
    #         :data1 => 160
    #       }
    #     ]
    #   }
    # }
  end
  
  def category_reports
  end
end
