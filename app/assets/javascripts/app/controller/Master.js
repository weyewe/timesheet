Ext.define("AM.controller.Master", {
	extend : "AM.controller.BaseTreeBuilder",
	views : [
		"master.MasterProcessList",
		'MasterProcessPanel',
		'Viewport'
	],

	 
	
	refs: [
		{
			ref: 'masterProcessPanel',
			selector: 'masterProcessPanel'
		} ,
		{
			ref: 'masterProcessList',
			selector: 'masterProcessList'
		}  
	],
	

	 
	init : function( application ) {
		var me = this; 
		 
		me.control({
			"masterProcessPanel" : {
				activate : this.onActiveProtectedContent,
				deactivate : this.onDeactivated
			} 
			
		});
		
	},
	
	onDeactivated: function(){
		// console.log("Master process panel is deactivated");
		var worksheetPanel = Ext.ComponentQuery.query("masterProcessPanel #worksheetPanel")[0];
		worksheetPanel.setTitle(false);
		worksheetPanel.removeAll();		 
		var defaultWorksheet = Ext.create( "AM.view.master.Default");
		worksheetPanel.add(defaultWorksheet); 
	},
	
	 

	managementFolder : {
		text 			: "Operation", 
		viewClass : '',
		iconCls		: 'text-folder', 
    expanded	: true,
		children 	: [
        
      { 
          text:'Customer', 
          viewClass:'AM.view.master.Customer', 
          leaf:true, 
          iconCls:'text',
 					conditions : [
						{
							controller : "customers",
							action  : 'index'
						}
					]
      },
      { 
				text:'Project', 
				viewClass:'AM.view.master.Project', 
				leaf:true, 
				iconCls:'text' ,
				conditions : [
					{
						controller : 'projects',
						action : 'index'
					}
				]
			}, 
    ]
	},
	
	inventoryFolder : {
		text:'Master Data', 
    viewClass:'Will', 
    iconCls:'text-folder', 
    expanded: true,
		children : [
	
			{ 
				text:'User', 
				viewClass:'AM.view.master.User', 
				leaf:true, 
				iconCls:'text',
				conditions : [
					{
						controller : 'users',
						action : 'index'
					}
				]
	     },
			{ 
				text:'Category', 
				viewClass:'AM.view.master.Category', 
				leaf:true, 
				iconCls:'text',
				conditions : [
					{
						controller : 'categories',
						action : 'category'
					}
				]
	     }
		]
	},
	
	reportFolder : {
		text:'Report', 
    viewClass:'Will', 
    iconCls:'text-folder', 
    expanded: true,
		children : [
			{ 
          text:'By Project', 
          viewClass:'AM.view.report.WorkProject', 
          leaf:true, 
          iconCls:'text' ,
					conditions : [
						{
							controller : 'works',
							action : 'reports'
						}
						
					]
      },
	
			{ 
          text:'By Category', 
          viewClass:'AM.view.report.WorkCategory', 
          leaf:true, 
          iconCls:'text' ,
					conditions : [
						{
							controller : 'works',
							action : 'reports'
						}
						
					]
      }
		]
		
	},
	
	factoryFolder : {
		text:'Report', 
    viewClass:'Will', 
    iconCls:'text-folder', 
    expanded: true,
		children : [
			{ 
          text:'Penerimaan Bahan Bubut', 
          viewClass:'AM.view.factory.ItemReceival', 
          leaf:true, 
          iconCls:'text' ,
					conditions : [
						{
							controller : 'item_receivals',
							action : 'index'
						}
						
					]
      },
      { 
          text:'Pengerjaan Pabrik', 
          viewClass:'AM.view.factory.TemplateSalesItem', 
          leaf:true, 
          iconCls:'text',
					conditions : [
						{
							controller : 'template_sales_items',
							action : 'index'
						}
					]
      }
		]
		
	},
	
	salesFolder : {
		text:'Sales', 
    viewClass:'Will', 
    iconCls:'text-folder', 
    expanded: true,
		children : [
			{ 
				text:'Customer', 
				viewClass:'AM.view.sales.Customer', 
				leaf:true, 
				iconCls:'text' ,
				conditions : [
					{
						controller : 'customers',
						action : 'index'
					}
				]
			},
			{ 
				text:'Penjualan', 
				viewClass:'AM.view.sales.SalesOrder', 
				leaf:true, 
				iconCls:'text' ,
				conditions : [
					{
						controller : 'sales_orders',
						action : 'index'
					}
				]
			},
			{ 
				text:'Pengiriman', 
				viewClass:'AM.view.sales.Delivery', 
				leaf:true, 
				iconCls:'text' ,
				conditions : [
					{
						controller : 'deliveries',
						action : 'index'
					}
				]
			},
			{ 
				text:'Sales Return', 
				viewClass:'AM.view.sales.SalesReturn', 
				leaf:true, 
				iconCls:'text' ,
				conditions : [
					{
						controller : 'sales_returns',
						action : 'index'
					}
				]
			},
			{ 
				text:'Guarantee Return', 
				viewClass:'AM.view.sales.GuaranteeReturn', 
				leaf:true, 
				iconCls:'text' ,
				conditions : [
					{
						controller : 'guarantee_returns',
						action : 'index'
					}
				]
			}
		]
		
	},
	
	paymentFolder : {
		text:'Payment', 
    viewClass:'Will', 
    iconCls:'text-folder', 
    expanded: true,
		children : [
			{ 
				text:'Invoice', 
				viewClass:'AM.view.payment.Invoice', 
				leaf:true, 
				iconCls:'text' ,
				conditions : [
					{
						controller : 'invoices',
						action : 'index'
					}
				]
			},
			{ 
				text:'Pembayaran', 
				viewClass:'AM.view.payment.Payment', 
				leaf:true, 
				iconCls:'text' ,
				conditions : [
					{
						controller : 'payments',
						action : 'index'
					}
				]
			}
		]
	},
	
	onActiveProtectedContent: function( panel, options) {
		var me  = this; 
		var currentUser = Ext.decode( localStorage.getItem('currentUser'));
		var email = currentUser['email'];
		
		me.folderList = [
			this.managementFolder,
			this.inventoryFolder,
			this.reportFolder
		];
		
		var processList = panel.down('masterProcessList');
		processList.setLoading(true);
	
		var treeStore = processList.getStore();
		treeStore.removeAll(); 
		
		treeStore.setRootNode( this.buildNavigation(currentUser) );
		processList.setLoading(false);
	},
});