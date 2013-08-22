Ext.define('AM.view.personal.PersonalProcessList', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.personalProcessList',

    
    // title: 'Process List',
    rootVisible: false,
		cls: 'examples-list',
    lines: false,
    useArrows: true,

		store: 'Navigations'
});
