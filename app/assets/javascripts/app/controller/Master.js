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
		// worksheetPanel.setHeader(false);
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
		text:'Employee Report', 
    viewClass:'Will', 
    iconCls:'text-folder', 
    expanded: true,
		children : [
			
	
			{ 
          text:'By Category', 
          viewClass:'AM.view.master.report.employee.WorkCategory', 
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