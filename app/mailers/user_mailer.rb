class UserMailer < ActionMailer::Base
  default from: "bangjay.sm@gmail.com"  #bangjay1234
  
  def notify_new_user_registration( user , password ) 
    @password = password 
    @user = user 
    
    mail( :to  => user.email, 
    :subject => "booker | New User" ,
     :bcc => ["rajakuraemas@gmail.com"],
     :css => [:bootstrap_email] )
  end
  
  def notify_reset_password( employee, user , password ) 
    @reset_trigger = employee 
    @password      = password 
    @user          = user 

    
    mail( :to  => user.email, 
    :subject => "booker | Reset Password" ,
     :bcc => ["w.yunnal@gmail.com"],
     :css => [:bootstrap ] )
  end
end
