Ext.define('AM.view.booking.BookingProcessList', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.bookingProcessList',

    
    // title: 'Process List',
    rootVisible: false,
		cls: 'examples-list',
    lines: false,
    useArrows: true,

		store: 'Navigations'
});
