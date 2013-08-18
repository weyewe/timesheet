Ext.define('AM.store.Users', {
	extend: 'Ext.data.Store',
	require : ['AM.model.User'],
	model: 'AM.model.User',
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
