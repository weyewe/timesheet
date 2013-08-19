role = {
  :system => {
    :administrator => true
  }
}

admin_role = Role.create!(
  :name        => ROLE_NAME[:admin],
  :title       => 'Administrator',
  :description => 'Role for administrator',
  :the_role    => role.to_json
)

role = {
  :passwords => {
    :update => true 
  },
  :works => {
    :index => true, 
    :create => true,
    :update => true,
    :destroy => true,
    :work_reports => true 
  },
  :projects => {
    :search => true 
  },
  :categories => {
    :search => true 
  }
}

data_entry_role = Role.create!(
  :name        => ROLE_NAME[:data_entry],
  :title       => 'Data Entry',
  :description => 'Role for data_entry',
  :the_role    => role.to_json
)




=begin
  CREATING THE USER 
=end

admin = User.create_main_user(  :name => "Admin", :email => "admin@gmail.com" ,:password => "willy1234", :password_confirmation => "willy1234") 
admin.set_as_main_user


data_entry1 = User.create_object(:name => "Data Entry", :email => "data_entry1@gmail.com", 
              :password => 'willy1234', 
              :password_confirmation => 'willy1234',
              :role_id => data_entry_role.id )
              
data_entry1.password = 'willy1234'
data_entry1.password_confirmation = 'willy1234'
data_entry1.save

data_entry2 = User.create_object(:name => "Data Entry", :email => "data_entry2@gmail.com", 
              :password => 'willy1234', 
              :password_confirmation => 'willy1234',
              :role_id => data_entry_role.id )
              
data_entry2.password = 'willy1234'
data_entry2.password_confirmation = 'willy1234'
data_entry2.save


user_array = [admin, data_entry1, data_entry2]



=begin
  CREATING THE CUSTOMER 
=end

customer = Customer.create_object({
  :name => "Andy"
})

cust_1 = customer 
cust_2 = Customer.create_object({
  :name => "Jimmy"
})

cust_3 = Customer.create_object({
  :name => "Metro"
})

cust_4 = Customer.create_object({
  :name => "Garlic"
})
customer_array = [cust_1, cust_2, cust_3, cust_4]


=begin
  Create seed date
=end

def make_date(*args)
  now = DateTime.now  
  
  d = ( args[0] || 0 )
  h = (args[1]  || 0)  
  m = (args[2] || 0)  
  s = (args[3] || 0)  
  
  
  target_date = ( now  + d.days + h.hours + m.minutes + s.seconds   ) .new_offset( Rational(0,24) ) 
  
  adjusted_date = DateTime.new( target_date.year, target_date.month, target_date.day, 
                                h, 0 , 0 
            ) .new_offset( Rational(0,24) ) 
  
  # return ( now  + d.days + h.hours + m.minutes + s.seconds   ) .new_offset( Rational(0,24) ) 
  return adjusted_date 
end

def make_date_mins(*args)
  now = DateTime.now  
  
  d = ( args[0] || 0 )
  h = (args[1]  || 0)  
  m = (args[2] || 0)  
  s = (args[3] || 0)  
  
  
  target_date = ( now  + d.days + h.hours + m.minutes + s.seconds   ) .new_offset( Rational(0,24) ) 
  
  
  # what is being adjusted 
  adjusted_date = DateTime.new( target_date.year, target_date.month, target_date.day, 
                                target_date.hour, target_date.minute , target_date.second
            ) .new_offset( Rational(0,24) ) 
  
  return adjusted_date
end

project_array = []
5.times.each do |x|
  
  customer = customer_array[rand(0..3)]
  
   
  deadline_date = start_datetime = make_date( rand(15..30), 0)
  project = Project.create_object({
    :title => "Project #{x}",
    :description => "This is the description of #{x}",
    :deadline_date => deadline_date ,
    :customer_id => customer.id 
  })
  
  project_array << project
end


BILLABLE_WORK_CODES = [
  'Phone call to'                   ,
  'Phone call from'                 ,
  'Writing letter to'               ,
  'Perusing and Considering'        ,
  'Traveling'                       ,
  'Meeting with'                    ,
  'Proof reading '                  ,
  'Taking instruction from'         ,
  'Discussion between'              ,
  'Researching'                    ,
  ' Appearing in Court '            ,
  'Drafting'                       ,
  'Consultation between '          ,
  'Preparing'                      ,
  'Supervising'                    ,
  'Reviewing'                      ,
  'Analyzing'                      ,
  'Finalizing'                     ,
  'Checking and Amending'          ,
  'Writing Memo to'                ,
  'Attending'                      ,
  'Translating'                    ,
  'Ordering'                       ,
  'Calculating'                    ,
  'Arranging'                      ,
  'LDD'
]

NON_BILLABLE_WORK_CODES = [
  'Marketing',
  'Internal Meeting',
  'Precedents',
  'Training' ,
  'General & Administration'
]


BILLABLE_WORK_CODES.each do |x|
  Category.create_object({
    :name => x,
    :is_billable => true 
  })
end 

NON_BILLABLE_WORK_CODES.each do |x|
  Category.create_object({
    :name => x,
    :is_billable => false 
  })
end

=begin
  Create the Work 
=end
user_array.each do |user|
  (-30..0).each do |day|
    # daily, do 3 projects 
    total_category = Category.count 
    categories = Category.all 
    offset_minutes = 0
    (1..3).each do |project|
      project = project_array[ rand(0..4) ]

      category = categories[ rand(0..(total_category-1) )]

      mins_multipliers = rand(1..6) # total worked hours, ranges from 30 mins to 3 hours
      number_of_minutes = 30*mins_multipliers

      start_datetime = make_date_mins(day, 0,offset_minutes )
      end_datetime = make_date_mins(day, 0,offset_minutes + number_of_minutes )
      work = Work.create_object({
        :project_id => project.id,
        :category_id => category.id,
        :start_datetime => start_datetime ,
        :end_datetime => end_datetime,
        :description => "Insert Description Here",
        :user_id => user.id
      })

      if work.errors.size != 0 
        work.errors.messages.each do |message|
          puts "The error: #{message}" 
          puts "start_datetme: #{work.start_datetime}"
          puts "end_datetime: #{work.end_datetime}"
        end
      end

      offset_minutes +=  number_of_minutes

    end
  end
end



