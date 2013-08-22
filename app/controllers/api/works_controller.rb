class Api::WorksController < Api::BaseApiController
  
=begin
  We need to query many works for reporting purposes. 
  
  PERSONAL REPORT 
    Params that is  needed: params[:viewer] => 'personal'
    => This requires 2 params value: 
      1. selectedRecordId  ( the project_id or the category_id, depending on the perspective) 
      2. perspective  => 'project' or 'category'
    ByProject
      Select a given project for current_user in a given timeframe
      Show the works ever done in that time frame & project 
    ByCategory
      Select a given category for current_user in a given timeframe
      Show the works ever done in that time frame & category 
  
  
  MASTER REPORT 
    Params that is  needed: params[:viewer] => 'master'
    EMPLOYEE REPORT
      1. selectedParentRecordId  => user_id 
      2. parentRecordType => 'project' or 'user' or 'category'
      3. selectedRecordId 
      4. perspective 'project' or 'category' or 'user'  (x-axis on the chart)
      5. companyView => true or false.. use the perspective to give constraint. 
      
      By Project
        Select a user to view his time spent ( on which project)
        Select project to see the details 
      By Category 
        Select a user to view his time spent ( on what kind of work category)
        Select category to see the details 
        
    PROJECT REPORT
      By User
        Select a project to view the details
        Select a user to view the works 
      By Category 
        Select a project to view the details 
        Select the category to view the works 
    
    COMPANY REPORT
      By User
        no selectedParentRecord 
      By Category 
      By Project 
=end
  def index
    
    if params[:livesearch].present? 
      build_livesearch_results 
    elsif params[:selectedRecordId].present? and params[:viewer] == 'personal'
      build_personal_report_results # current_user scope 
    elsif params[:selectedRecordId].present? and params[:viewer] == 'master'
      # on behalf of the employee.
      # it requires the params selectedParentRecordId
      build_master_report_results  # whole company scope 
      
      # what if we want on behalf of project? the selectedParentRecord == project? 
    else
      @objects = Work.active_objects.where(:user_id => current_user.id).joins(:project, :category).page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Work.active_objects.where(:user_id => current_user.id).count 
    end
  end
  
  def build_livesearch_results
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
  end
  
  def build_personal_report_results
    if params[:perspective] == 'project'
      build_personal_project_details
    elsif params[:perspective] == 'category'
      build_personal_category_details
    end
  end
  
  def build_master_report_results # company scope 
    if params[:perspective] == 'project'
      build_master_project_details
    elsif params[:perspective] == 'category'
      build_master_category_details
    end
  end
  
  # we need the one with parentPerspective == Project. 
  
  # parentPerspective = user 
  def build_master_project_details
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
  end
  
  def build_personal_project_details
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
  end
  
  def build_personal_category_details
    category = Category.where(:id => params[:selectedRecordId]).first 
    if category.nil?
      @objects  = [] 
      @total = 0 
    else
      @objects = Work.active_objects.where(:user_id => current_user.id, 
              :category_id =>  category.id).
              joins(:project, :category).page(params[:page]).per(params[:limit]).order("id DESC")
              
      @total =         Work.active_objects.where(:user_id => current_user.id, 
                      :category_id =>  category.id).count
    end
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
    view_value = params[:viewValue].to_i  
    date = parse_datetime_from_client_booking( params[:focusDate])
    date =   DateTime.new( date.year , 
                              date.month, 
                              date.day, 
                              0, 
                              0, 
                              0,
                  Rational( UTC_OFFSET , 24) )
                  
    
     
    
    records = [] 
    works = []
    current_user_id = current_user.id
    if view_value == VIEW_VALUE[:week]
      starting_date = date - date.wday.days 
      ending_date = starting_date + 7.days 
      works = Work.active_objects.where{
        (start_datetime.gte starting_date) & 
        (start_datetime.lt ending_date ) & 
        (user_id.eq current_user_id )
      }
      
    elsif view_value == VIEW_VALUE[:month]
      starting_date = date - date.mday.days 
      
      days_in_month = Time.days_in_month(date.month, date.year)
      ending_date = starting_date + days_in_month.days
   
      works = Work.active_objects.where{
        (start_datetime.gte starting_date) & 
        (start_datetime.lt ending_date ) & 
        (user_id.eq current_user_id )
      }
    end
    
    project_id_list = works.collect {|x| x.project_id}.uniq
    
    projects = Project.where(:id => project_id_list)
    
    projects.each do |project|
      record = {}
      record[:name] = project.title 
      record[:data1] = works.where(:project_id => project.id).sum('duration')
      record[:id] = project.id 
      
      records << record
    end
    
    
    render :json => { :records => records , :total => records.count, :success => true }
  end
  
  def category_reports
    view_value = params[:viewValue].to_i  
    date = parse_datetime_from_client_booking( params[:focusDate])
    date =   DateTime.new( date.year , 
                              date.month, 
                              date.day, 
                              0, 
                              0, 
                              0,
                  Rational( UTC_OFFSET , 24) )
                  
    records = [] 
    works = []
    current_user_id = current_user.id
    
    # in the master report 
    if params[:selectedRecordId].present? and params[:selectedRecordId].to_i != 0 
      current_user_id  = params[:selectedRecordId].to_i
    end
    
    if view_value == VIEW_VALUE[:week]
      starting_date = date - date.wday.days 
      ending_date = starting_date + 7.days 
      works = Work.active_objects.where{
        (start_datetime.gte starting_date) & 
        (start_datetime.lt ending_date ) & 
        (user_id.eq current_user_id )
      }
      
    elsif view_value == VIEW_VALUE[:month]
      starting_date = date - date.mday.days 
      
      days_in_month = Time.days_in_month(date.month, date.year)
      ending_date = starting_date + days_in_month.days
   
      works = Work.active_objects.where{
        (start_datetime.gte starting_date) & 
        (start_datetime.lt ending_date ) & 
        (user_id.eq current_user_id )
      }
    end
    
    category_id_list = works.collect {|x| x.category_id}.uniq
    
    categories = Category.where(:id => category_id_list)
    
    categories.each do |category|
      record = {}
      record[:name] = category.name 
      record[:data1] = works.where(:category_id => category.id).sum('duration')
      record[:id] = category.id 
      
      records << record
    end
    
    
    render :json => { :records => records , :total => records.count, :success => true }
  end
end
