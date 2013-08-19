Ext.define('AM.view.work.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.worklist',

  	store: 'Works', 
 

	initComponent: function() {
		this.columns = [
			{
				xtype : 'templatecolumn',
				text : "Project",
				flex : 1,
				tpl : 'Project: <b>{project_title}</b>' + '<br />' + '<br />' +
							'Work Category:<br /> <b>{category_name}</b>'   
			},
			
			{ header: 'Description',  dataIndex: 'description',  flex: 1 , sortable: false} ,
			
			{
				xtype : 'templatecolumn',
				text : "Duration",
				flex : 1,
				tpl : 'Start:<br /> <b>{start_datetime}</b>' + '<br />' + '<br />' +
							'End:<br /> <b>{end_datetime}</b>'  + '<br />' + '<br />' +
							'Duration: <b>{duration}</b> mins' 
			},
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add Work',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit Work',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete Work',
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