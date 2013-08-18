Ext.define('AM.view.work.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.workform',

  title : 'Add / Edit Work',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
		var me = this; 
		
		var remoteJsonStoreProject = Ext.create(Ext.data.JsonStore, {
			storeId : 'project_search',
			fields	: [
			 				{
						name : 'project_title',
						mapping : "title"
					} ,
					{
						name : 'project_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_projects',
				reader : {
					type : 'json',
					root : 'records', 
					totalProperty  : 'total'
				}
			},
			autoLoad : false 
		});
		
		var remoteJsonStoreCategory = Ext.create(Ext.data.JsonStore, {
			storeId : 'category_search',
			fields	: [
			 				{
						name : 'category_name',
						mapping : "name"
					} ,
					{
						name : 'category_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_categories',
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
	      },
				{
					fieldLabel: 'Project',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'project_title',
					valueField : 'project_id',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : remoteJsonStoreProject , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{project_title}">' +  
													'<div class="combo-name">{project_title}</div>' +  
							 					'</div>';
						}
					},
					name : 'project_id' 
				},
				
				{
					fieldLabel: 'Category',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'category_name',
					valueField : 'category_id',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : remoteJsonStoreCategory , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{category_name}">' +  
													'<div class="combo-name">{category_name}</div>' +  
							 					'</div>';
						}
					},
					name : 'category_id' 
				},
				{
					xtype :'customdatetimefield',
					name : 'start_datetime',
					fieldLabel : "Waktu Mulai",
					dateCfg : {
						format: 'Y-m-d',
					},
					timeCfg : {
						increment : 5
					}
				},
				{
					xtype :'customdatetimefield',
					name : 'end_datetime',
					fieldLabel : "Waktu Selesai",
					dateCfg : {
						format: 'Y-m-d',
					},
					timeCfg : {
						increment : 5
					}
				},
				{
					xtype :'textfield',
					name : 'description',
					fieldLabel : "Deskripsi"
				}
				
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
	
	setSelectedCategory: function( category_id ){
		var comboBox = this.down('form').getForm().findField('category_id'); 
		var me = this; 
		var store = comboBox.store; 
		store.load({
			params: {
				selected_id : category_id 
			},
			callback : function(records, options, success){
				me.setLoading(false);
				comboBox.setValue( category_id );
			}
		});
	},

	setComboBoxData : function( record){
		var me = this; 
		me.setLoading(true);
		
		me.setSelectedProject( record.get("project_id")  ) ;
		me.setSelectedCategory( record.get("category_id")  ) ;
	}
});
