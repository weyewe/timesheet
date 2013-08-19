Ext.define('AM.controller.PersonalReports', {
  extend: 'Ext.app.Controller',

  // stores: ['PersonalReports'],
  // models: ['PersonalReport'],

  views: [
		'PersonalReportProcess'
  ],

	refs: [
		{
			ref : 'personalreportProcess',
			selector : 'personalreportProcess'
		}
	],

  init: function() {
		var me = this; 
    this.control({
      'personalreportProcess' : {
				activate : me.onPersonalReportActivated,
				deactivate : me.onPersonalReportDeActivated
			}
		
    });
  },
 
 	onPersonalReportActivated: function(){
		// console.log("personal report is activated");
		var me = this;
		var activeItem = me.getPersonalreportProcess();
		console.log("on personal reprot activated");
		
		// Ext.Ajax.request(
		// 	{
		// 		url: "api/work_reports",
		// 		method : "GET",
		// 		// scripts : true, 
		// 		success: function (xhr) {
		// 			try {
		// 
		// 
		// 				var decodedResponseText = Ext.decode( xhr.responseText );
		// 				var newComponent = Ext.Component.create( decodedResponseText['component_config']) ;
		// 
		// 
		//  
		// 				activeItem.add(  newComponent );
		// 
		// 			}
		// 			catch (ex) {
		// 				alert('Exception ' + ex);
		// 			}
		// 
		// 		} 
		// 	});
	},
 
	onPersonalReportDeActivated: function(){
		// console.log("personal report is de - activated");
		var me = this;
		var personalReport = me.getPersonalreportProcess();
		personalReport.removeAll();
	},

});
