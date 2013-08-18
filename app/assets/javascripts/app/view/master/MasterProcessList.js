Ext.define('AM.view.master.MasterProcessList', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.masterProcessList',

    
    // title: 'Process List',
    rootVisible: false,
		cls: 'examples-list',
    lines: false,
    useArrows: true,

		store: 'Navigations'
});
