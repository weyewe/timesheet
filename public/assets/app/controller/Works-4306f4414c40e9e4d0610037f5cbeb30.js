Ext.define('AM.controller.Works', {
  extend: 'Ext.app.Controller',

  stores: ['Works'],
  models: ['Work'],

  views: [
    'work.List',
    'work.Form',
		'Work'
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'worklist'
		},
		{
			ref : 'searchField',
			selector: 'worklist textfield[name=searchField]'
		},
		{
			ref : 'workProcess',
			selector : 'workProcess'
		}
	],

  init: function() {
    this.control({
      'worklist': {
        itemdblclick: this.editObject,
        selectionchange: this.selectionChange, 
				// afterrender : this.onAfterRender, 
				
      },
			'workProcess' : {
				activate : this.loadObjectList, 
				// activate : this.onWorkProcessActivated
			},
      'workform button[action=save]': {
        click: this.updateObject
      },
      'worklist button[action=addObject]': {
        click: this.addObject
      },
      'worklist button[action=editObject]': {
        click: this.editObject
      },
      'worklist button[action=deleteObject]': {
        click: this.deleteObject
      },
			'worklist textfield[name=searchField]': {
        change: this.liveSearch
      }
		
    });
  },
 
 
	liveSearch : function(grid, newValue, oldValue, options){
		var me = this;

		me.getWorksStore().getProxy().extraParams = {
		    livesearch: newValue
		};
	 
		me.getWorksStore().load();
	},
 

	loadObjectList : function(activeItem){
		// console.log("Wtf bro.. in the loadObjectList");
		var date = new Date();
		// console.log( date ) ;
		// console.log( arguments ) ;
		activeItem.down("worklist").getStore().load();
		// this.getStore().load();
	},

  addObject: function() {
    var view = Ext.widget('workform');
    view.show();
  },

  editObject: function() {
		var me = this; 
    var record = this.getList().getSelectedObject();
    var view = Ext.widget('workform');

		

    view.down('form').loadRecord(record);
		view.setComboBoxData(record); 
  },

  updateObject: function(button) {
		var me = this; 
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getWorksStore();
    var record = form.getRecord();
    var values = form.getValues();

		
		if( record ){
			record.set( values );
			 
			form.setLoading(true);
			record.save({
				success : function(record){
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					
					// store.getProxy().extraParams = {
					//     livesearch: ''
					// };
	 
					store.load();
					win.close();
				},
				failure : function(record,op ){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
				
			 
		}else{
			//  no record at all  => gonna create the new one 
			var me  = this; 
			var newObject = new AM.model.Work( values ) ;
			
			// learnt from here
			// http://www.sencha.com/forum/showthread.php?137580-ExtJS-4-Sync-and-success-failure-processing
			// form.mask("Loading....."); 
			form.setLoading(true);
			newObject.save({
				success: function(record){
	
					store.load();
					form.setLoading(false);
					win.close();
					
				},
				failure: function( record, op){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
		} 
  },

  deleteObject: function() {
    var record = this.getList().getSelectedObject();

    if (record) {
      var store = this.getWorksStore();
      store.remove(record);
      store.sync();
// to do refresh programmatically
			this.getList().query('pagingtoolbar')[0].doRefresh();
    }

  },

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();

    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }
  }

});
