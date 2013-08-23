Ext.define("AM.controller.Personal", {
	extend : "AM.controller.BaseTreeBuilder",
	views : [
		"personal.PersonalProcessList",
		'PersonalProcessPanel',
		'Viewport'
	],

	 
	
	refs: [
		{
			ref: 'personalProcessPanel',
			selector: 'personalProcessPanel'
		} ,
		{
			ref: 'personalProcessList',
			selector: 'personalProcessList'
		}  
	],
	

	 
	init : function( application ) {
		var me = this; 
		 
		me.control({
			"personalProcessPanel" : {
				activate : this.onActiveProtectedContent,
				deactivate : this.onDeactivated
			} 
			
		});
		
	},
	
	onDeactivated: function(){
		// console.log("Personal process panel is deactivated");
		var worksheetPanel = Ext.ComponentQuery.query("personalProcessPanel #personal-worksheetPanel")[0];
		worksheetPanel.setTitle(false);
		worksheetPanel.removeAll();		 
		var defaultWorksheet = Ext.create( "AM.view.personal.Default");
		worksheetPanel.add(defaultWorksheet); 
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
							action : 'project_reports'
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
							action : 'category_reports'
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
			this.reportFolder
		];
		
		var processList = panel.down('personalProcessList');
		processList.setLoading(true);
	
		var treeStore = processList.getStore();
		treeStore.removeAll(); 
		
		treeStore.setRootNode( this.buildNavigation(currentUser) );
		processList.setLoading(false);
	},
});