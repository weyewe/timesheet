Ext.define('AM.view.master.customer.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.customerlist',

  	store: 'Customers', 
 

	initComponent: function() {
		this.columns = [
			// { header: 'ID', dataIndex: 'id'},
			{ header: ' Nama',  dataIndex: 'name',  flex: 1 , sortable: false} ,
			{ header: ' BB Pin',  dataIndex: 'bb_pin',  flex: 1 , sortable: false} ,
			{ header: ' Nomor HP',  dataIndex: 'mobile_phone',  flex: 1 , sortable: false} ,
			{ header: ' Kontak Lain',  dataIndex: 'contact',  flex: 1 , sortable: false} 
	
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add Customer',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit Customer',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete Customer',
			action: 'deleteObject',
			disabled: true
		});
		
		// this.filler = new Ext.toolbar.FillView({});  
		
		this.searchField = new Ext.form.field.Text({
			name: 'searchField',
			hideLabel: true,
			width: 200,
			emptyText : "Search",
			checkChangeBuffer: 300
		}); 




		// this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton, '->', this.searchObjectButton ];
		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton,  this.searchField ];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable();
	}
});
