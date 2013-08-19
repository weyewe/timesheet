/*
	Control the masterProcessList.
	
	For the personal reporting, we want to extract script from the server and execute it. 
*/
Ext.define("AM.controller.MasterTreeNavigation", {
	extend : "Ext.app.Controller",
	views : [
		"master.MasterProcessList"
	],

	 
	
	refs: [
		{
			ref: 'masterProcessList',
			selector: 'masterProcessList'
		} ,
		{
			ref : 'worksheetPanel',
			selector : '#worksheetPanel'
		}
	],
	 
	init : function( application ) {
		var me = this; 
		
		 
		me.control({
			"masterProcessList" : {
				'select' : this.onTreeRecordSelected
			} 
			
		});
		
	},
	
	onTreeRecordSelected : function( me, record, item, index, e ){
		if (!record.isLeaf()) {
			return;
		}

		this.setActiveExample( record.get('viewClass'), record.get('text'));
	},
	
	setActiveExample: function(className, title) {
      var worksheetPanel = this.getWorksheetPanel();
      
      worksheetPanel.setTitle(title);

      worksheet = Ext.create(className);
      worksheetPanel.removeAll();

      worksheetPanel.add(worksheet);
  }
});