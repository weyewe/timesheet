json.success true 
json.total @total
json.projects @objects do |object|
	json.id 								object.id 
	json.deadline_date 			format_date_friendly(object.deadline_date)    
	json.title 							object.title 
	json.description				object.description 
	
	json.customer_id				object.customer.id 
	
	json.customer_name				object.customer.name 

	
end
