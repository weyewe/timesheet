Ext.define('AM.store.Navigations', {
		extend: 'Ext.data.TreeStore',
    model: 'AM.model.NavigationProcess',
    proxy: {
        type: 'memory'
    },
    folderSort: true
});