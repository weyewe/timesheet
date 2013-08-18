Ext.define("AM.controller.TreePanelNavigation", {
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
		// console.log("onTreeRecordSelected. hahaha");
		// console.log("the me: " ) ;
		// console.log(me);
		// console.log("The record:"  ) ;
		// console.log( record ) ;
		// console.log("The item: " );
		// console.log( item ) ;
		if (!record.isLeaf()) {
		        return;
		    }
		
		// console.log("The record");
		// console.log( record ) ;
		// console.log("the className: " + record.get('viewClass') );
		this.setActiveExample( record.get('viewClass'), record.get('text'));
	},
	setActiveExample: function(className, title) {
			// console.log("Gonna set active example");
			
      var worksheetPanel = this.getWorksheetPanel();
      
      // console.log("Gonna set title");
      worksheetPanel.setTitle(title);
      
      // console.log("gonna create the worksheet with className: "  +className );
      worksheet = Ext.create(className);
        
			// if(worksheet){
			// 	console.log( "worksheet presents");
			// }else{
			// 	console.log(" !!!!!!!!!!!!!!!! worksheet is not created");
			// }

			// console.log("Gonna remove all shite");
      worksheetPanel.removeAll();
			// console.log("gonna add the newly created worksheet");
      worksheetPanel.add(worksheet);
			// console.log("done adding worksheet");
 
  }
});