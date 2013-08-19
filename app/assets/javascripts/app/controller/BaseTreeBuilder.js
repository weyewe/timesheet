Ext.define("AM.controller.BaseTreeBuilder", {
	extend : "Ext.app.Controller",

	 
	   
	buildNavigation: function( currentUser ) {
		var me = this; 
		
		
		// console.log("The length of folderList: " + folderList.length );
		var composedFolders = []; 
		// me.folderList is entered @the instance class.
		
		for(var i = 0 ; i < me.folderList.length ; i++){
			var folder = me.folderList[i];
			
			// console.log("Gonna build the folder");
			var composedFolder = me.buildFolder( currentUser, folder ); 
			if( composedFolder !== null ){
				composedFolders.push( composedFolder );
			}
		}
		
		var data = {
			text : 'text root',
			children : composedFolders
		}
		
		return data; 
	},
	
	buildFolder : function( currentUser, folder ){
		var me = this; 
		// console.log("Inside the build folder");
		var processList = [];
		// console.log("The length of folder['children']: " + folder['children'].length );
		for( var i =0 ; i < folder['children'].length; i++ ){
			var processTemplate = folder['children'][i];
			var process = me.buildProcess( currentUser, processTemplate );
			if( process !== null){
				processList.push( process );
			}
		}
		
		// console.log("The processList length: "   + processList.length);
		// for(var i = 0 ; i < processList.length; i++ ) {
		// 	console.log(processList[i]);
		// }
		
		if( processList.length !== 0 ){
			return {
				text: 			folder['text'], 
				viewClass: 	folder['viewClass'], 
				iconCls: 		folder['iconCls'], 
				expanded: 	folder['expanded'],
				children: 	processList 
			};
		}else{
			return null; 
		}
	},
	
	buildProcess : function(currentUser, processTemplate){
		
		if( !currentUser || !currentUser['role']){
			return null; 
		}
		
		var process = {
			text 			: processTemplate['text'],
			viewClass : processTemplate['viewClass'],
			leaf 			: processTemplate['leaf'],
			iconCls 	: processTemplate['iconCls']
		}
		// console.log("Inside buildProcess");
		// console.log( process );
		
		for( var i =0 ; i < processTemplate['conditions'].length; i++ ){
			var condition = processTemplate['conditions'][i];
			var controller = condition['controller'];
			var action = condition['action'];
			
			if( 
					(
						currentUser['role']['system'] &&
						currentUser['role']['system']['administrator']  
					) || 
					(
							currentUser['role'][controller] && 
							currentUser['role'][controller][action]  
					) ){
				
				// console.log("returning the process");
				return process; 
			}
		}
	 
		// console.log("returning null in the buildProcess");
		return null; 
	}
	
});