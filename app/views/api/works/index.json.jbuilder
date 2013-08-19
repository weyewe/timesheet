json.success true 
json.total @total
json.works @objects do |object|
	json.id 								object.id 

	json.start_datetime 			format_datetime_friendly(object.start_datetime)   
	json.end_datetime 			format_datetime_friendly(object.end_datetime)   
	json.category_id 				object.category_id
	json.category_name				object.category.name

	json.project_id   object.project_id 
	json.project_title  object.project.title

	json.duration object.duration
	json.description object.description 
	
end
