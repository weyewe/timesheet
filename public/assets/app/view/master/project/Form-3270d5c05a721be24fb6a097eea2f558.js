Ext.define('AM.view.master.project.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.projectform',

  title : 'Add / Edit Project',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
		var me = this; 
		
		var remoteJsonStoreCustomer = Ext.create(Ext.data.JsonStore, {
			storeId : 'customer_search',
			fields	: [
			 				{
						name : 'customer_name',
						mapping : "name"
					},
					{
						name : 'customer_bb_pin',
						mapping : 'bb_pin'
					},
					{
						name : 'customer_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_customers',
				reader : {
					type : 'json',
					root : 'records', 
					totalProperty  : 'total'
				}
			},
			autoLoad : false 
		});
		
		
    this.items = [{
      xtype: 'form',
			msgTarget	: 'side',
			border: false,
      bodyPadding: 10,
			fieldDefaults: {
          labelWidth: 165,
					anchor: '100%'
      },
      items: [
				{
	        xtype: 'hidden',
	        name : 'id',
	        fieldLabel: 'id'
	      },{
	        xtype: 'textfield',
	        name : 'title',
	        fieldLabel: 'Title'
				},{
					xtype: 'textfield',
					name : 'description',
					fieldLabel: 'Description'
				},{
					xtype: 'datefield',
					name : 'deadline_date',
					format: 'Y-m-d',
					fieldLabel : "Deadline"
				},
				{
					fieldLabel: 'Customer',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'customer_name',
					valueField : 'customer_id',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : remoteJsonStoreCustomer , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{customer_name}">' +  
													'<div class="combo-name">{customer_name}</div>' +  
													'<div class="combo-name">{customer_bb_pin}</div>' +  
							 					'</div>';
						}
					},
					name : 'customer_id' 
				},
			]
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);

		me.dateField = me.down("datefield");
		console.log("The datefield");
		console.log( me.dateField ) ;
  },

	setSelectedCustomer: function( customer_id ){
		var comboBox = this.down('form').getForm().findField('customer_id'); 
		var me = this; 
		var store = comboBox.store; 
		store.load({
			params: {
				selected_id : customer_id 
			},
			callback : function(records, options, success){
				me.setLoading(false);
				comboBox.setValue( customer_id );
			}
		});
	},

	setComboBoxData : function( record){
		var me = this; 
		me.setLoading(true);
		
		
		me.setSelectedCustomer( record.get("customer_id")  ) ;
		// me.setSelectedCalendar( record.get("calendar_id")  ) ;
	 
	}
});
