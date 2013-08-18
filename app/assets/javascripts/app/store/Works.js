Ext.define('AM.store.Works', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.Work'],
  	model: 'AM.model.Work',
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
