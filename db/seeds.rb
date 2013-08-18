role = {
  :system => {
    :administrator => true
  }
}

Role.create!(
:name        => ROLE_NAME[:admin],
:title       => 'Administrator',
:description => 'Role for administrator',
:the_role    => role.to_json
)

admin = User.create_main_user(  :name => "Admin", :email => "admin@gmail.com" ,:password => "willy1234", :password_confirmation => "willy1234") 
admin.set_as_main_user


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

5.times.each do |x|
  
  customer = customer_array[rand(0..3)]
  
   
  deadline_date = start_datetime = make_date( rand(1..30), 0)
  Project.create_object({
    :title => "Project #{x}",
    :description => "This is the description of #{x}",
    :deadline_date => deadline_date ,
    :customer_id => customer.id 
  })
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


