Ext.define('AM.store.Projects', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.Project'],
  	model: 'AM.model.Project',
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
