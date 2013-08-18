Ext.define('AM.model.NavigationProcess', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text', type: 'string'},
        {name: 'viewClass', type: 'string'}
    ],
		proxy: {
        type: 'memory'
    },
});