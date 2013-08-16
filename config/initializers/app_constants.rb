ROLE_NAME = {
  :admin => "admin",
  :manager => "manager",
  :data_entry => "dataentry"
}

 

# => TIMEZONE ( for 1 store deployment. For multitenant => different story) 
UTC_OFFSET = 7 
LOCAL_TIME_ZONE = "Jakarta" 

EXT_41_JS = 'https://s3.amazonaws.com/weyewe-extjs/41/ext-all.js'

EXTENSIBLE = 'https://s3.amazonaws.com/weyewe-extjs/extensible-all.js'

VIEW_VALUE = {
  :week => 0, 
  :month => 1, 
  :year => 2 
}

INCOME_CASE = {
  # booking related 
  :downpayment => 0 ,
  :remaining_payment => 1  
}