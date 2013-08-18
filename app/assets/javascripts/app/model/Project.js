Ext.define('AM.model.Project', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'title', type: 'string' },
			{ name: 'description', type: 'string' } ,
			{ name: 'deadline_date', type: 'string' } ,
			{ name: 'customer_id', type: 'int' } ,
			{ name: 'customer_name', type: 'string' } ,
  	],

	 


   
  	idProperty: 'id' ,

		proxy: {
			url: 'api/projects',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'projects',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { project : record.data };
				}
			}
		}
	
  
});
