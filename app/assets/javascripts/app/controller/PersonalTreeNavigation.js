/*
	Control the personalProcessList.
	
	For the personal reporting, we want to extract script from the server and execute it. 
*/
Ext.define("AM.controller.PersonalTreeNavigation", {
	extend : "Ext.app.Controller",
	views : [
		"personal.PersonalProcessList"
	],

	 
	
	refs: [
		{
			ref: 'personalProcessList',
			selector: 'personalProcessList'
		} ,
		{
			ref : 'worksheetPanel',
			selector : '#personal-worksheetPanel'
		}
	],
	 
	init : function( application ) {
		var me = this; 
		
		 
		me.control({
			"personalProcessList" : {
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