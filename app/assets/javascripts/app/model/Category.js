Ext.define('AM.model.Category', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'name', type: 'string' },
			{ name: 'is_billable', type: 'boolean' }  
  	],

	 


   
  	idProperty: 'id' ,

		proxy: {
			url: 'api/categories',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'categories',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { category : record.data };
				}
			}
		}
	
  
});
