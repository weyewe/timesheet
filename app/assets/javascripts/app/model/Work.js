Ext.define('AM.model.Work', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'project_id', type: 'int' },
			{ name: 'project_title', type: 'string' } ,
			
			{ name: 'start_datetime', type: 'string' } ,
			{ name: 'end_datetime', type: 'string' } ,
			{ name: 'category_id', type: 'int' } ,
			{ name: 'category_name', type: 'string' } ,
			{ name: 'duration', type: 'int' } ,
			{ name: 'description', type: 'string' } ,
  	],

	 


   
  	idProperty: 'id' ,

		proxy: {
			url: 'api/works',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'works',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { work : record.data };
				}
			}
		},
		 
	
	
		
  
});
