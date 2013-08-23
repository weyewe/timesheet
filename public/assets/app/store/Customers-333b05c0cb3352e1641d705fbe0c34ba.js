Ext.define('AM.store.Customers', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.Customer'],
  	model: 'AM.model.Customer',
  	// autoLoad: {start: 0, limit: this.pageSize},
		autoLoad : false, 
  	autoSync: false,
	pageSize : 10, 
	
	
		
		
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	], 

	listeners: {

	} 
});
