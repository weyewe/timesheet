class Api::BaseApiController < ApplicationController
  respond_to :json
  
  before_filter :authenticate_auth_token, :ensure_authorized
  
  
  def access_denied
    return render( :json => {:access_denied => "Requires appropriate role"} )
  end
  
  
  
  def authenticate_auth_token
    # puts "Inside the authenticate_auth_token\n"*10
    # puts "The auth_token: #{params[:auth_token]}"
    resource = User.find_by_authentication_token( params[:auth_token])
    # puts "The resource : #{resource.inspect}"
    if resource.nil?
      msg = {
        :success => false, 
        :auth_token_invalid => true, 
        :message => {
          :errors => {
            :auth_token_invalid => "False authentication. Please try to log in"
          }
        }
      }
      
      render :json => msg 
      return 
    end
  end
  
  
  def extjs_error_format( errors ) 
    new_error = {}
    errors.messages.each do |field, messages|
      aggregated_messages = "" 
      
      new_error[field.to_s] = messages.join(' | ')
    end
    
    return new_error 
  end
  
  
  def extract_extensible_date(date_string)# 2013-06-30
    date_array = date_string.split('-').map{|x| x.to_i}
    
    # date = Date.new( date_array[0], date_array[1], date_array[2])
    # return date.to_datetime
    
    datetime = DateTime.new(date_array[0], date_array[1], date_array[2], 0 ,0 ,0) 
    # puts "inside extraction.. the datetime: #{datetime}"
    return datetime 
  end
  
  def parse_datetime_from_client( datetime_string)
    date = datetime_string.split("T").first
    time = datetime_string.split("T").last 
    time = time.split("+").first 
    
    date_array = date.split('-').map{|x| x.to_i}
    time_array = time.split(':').map{|x| x.to_i}
    
    # puts "The date_array: #{date_array}"
    # puts "The time_array : #{time_array}"
    
   
    datetime = DateTime.new( date_array[0], 
                              date_array[1], 
                              date_array[2], 
                              time_array[0], 
                              time_array[1], 
                              time_array[2],
                  Rational( UTC_OFFSET , 24) )
                  
                  
    return datetime.utc
  end
  
  def parse_datetime_from_client_booking( datetime_string)
    date = datetime_string.split(" ").first
    time = datetime_string.split(" ").last  
    
    date_array = date.split('-').map{|x| x.to_i}
    time_array = time.split(':').map{|x| x.to_i}
    
    puts "The date_array: #{date_array}"
    puts "The time_array : #{time_array}"
    
   
    datetime = DateTime.new( date_array[0], 
                              date_array[1], 
                              date_array[2], 
                              time_array[0], 
                              time_array[1], 
                              time_array[2],
                  Rational( UTC_OFFSET , 24) )
                  
                  
    return datetime.utc
  end
  
  def extract_date( date ) 
    if date.nil? or date.length == 0 
      return nil 
    end
    
    date_array = date.split("/")
    
    year  = 0
    month = 0 
    day   = 0
    if date_array.nil? || date_array.length == 0  
    else
      year  = date_array[2].to_i
      month = date_array[1].to_i 
      day   = date_array[0].to_i 
    end
    
    new_date = Date.new( year, month, day)
    return new_date 
  end
  
  def extract_datetime( datetime )
    if datetime.nil? or datetime.length ==0 
      return  nil 
    end
    
    date_array = datetime.split(" ").first 
    # puts "The date_array : #{date_array}"
    date_array = date_array.split('/')
    
    time_array =  datetime.split(" ").last 
    # puts "The time_array : #{time_array}"
    time_array = time_array.split(':')
    
    
    
    year  = 0
    month = 0 
    day   = 0
    if date_array.nil? || date_array.length == 0  
    else
      year  = date_array[2].to_i
      month = date_array[1].to_i 
      day   = date_array[0].to_i 
    end
 
    hour   = 0 
    minute = 0 
    second = 0 
    if time_array.nil? || time_array.length == 0  
    else
      hour    = time_array[0].to_i
      minute  = time_array[1].to_i
      second  = time_array[2].to_i
    end        
              
     
     
    new_datetime = DateTime.new( year, 
                  month, 
                  day, 
                  hour, 
                  minute, 
                  second, 
                  Rational( UTC_OFFSET , 24) )
              
    return new_datetime.getutc 
  end
  
  # port from application_helper
  def format_datetime_friendly( datetime ) 
    return nil if datetime.nil? 
     
    
    a = datetime.in_time_zone("Jakarta")
    day = a.day
    month = a.month
    year = a.year
    hour = a.hour
    minute = a.min
    second = a.sec 
    
    if day.to_s.length == 1 
      day = "0#{day}"
    end
    
    if month.to_s.length == 1 
      month = "0#{month}"
    end
    
    if hour.to_s.length == 1
      hour  = "0#{hour}"
    end
    
    if minute.to_s.length == 1 
      minute = "0#{minute}"
    end
    
    if second.to_s.length == 1 
      second = "0#{second}"
    end
    
    return "#{year}-#{month}-#{day}" + " " + 
            "#{hour}:#{minute}:#{second}"
  end
  
  def ensure_authorized
    puts "===========>Inside ensure_authorized\n"
    puts "The params: "
    puts "#{params}"
    current_controller_name = params[:controller].gsub("api/", "")
    
    if not current_user.has_role?(current_controller_name.to_sym, params[:action])
      render :json => {:success => false, :access_denied => "Tidak punya authorisasi"}
      return
    end
  end
 
end