Ext.define('AM.store.Categories', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.Category'],
  	model: 'AM.model.Category',
  	// autoLoad: {start: 0, limit: this.pageSize},
		autoLoad : false, 
  	autoSync: false,
	// pageSize : 10, 
	
	
		
		
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	], 

	listeners: {

	} 
});
