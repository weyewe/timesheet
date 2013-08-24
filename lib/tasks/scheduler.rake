desc "This task is called by the Heroku cron add-on"
task :call_page => :environment do
  uri = URI.parse('http://mag-timesheet.herokuapp.com/')
  Net::HTTP.get(uri)
  puts "this is it"
end

 
