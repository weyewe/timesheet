Ext.define('AM.view.Navigation', {
    extend: 'Ext.toolbar.Toolbar',
    alias : 'widget.navigation', 
   
		
		addPersonalReportButton: function(){
			this.items.push(
				{
					iconCls: 'tasks-delete-task',
					disabled: false,
					tooltip: 'Personal Report',
					xtype: 'button',
					text : "Report",
					action : "switchPersonalReport",
					pressed : false, 
					toggleGroup: this.id+'-nav-views' 
				}
			)
		},
		
		addWorkLogButton: function(){
			this.items.push(
				{
					iconCls: 'tasks-mark-complete',
					disabled: false,
					tooltip: 'Work Log',
					xtype: 'button',
					text : "Work Log",
					action : "switchWorkLog",
					pressed : true,
					toggleGroup: this.id+'-nav-views' 
				}
			)
		},
		
		addMasterButton: function(){
			this.items.push(
				{
					iconCls: 'tasks-mark-complete',
					disabled: false,
					tooltip: 'Bookings',
					xtype: 'button',
					text : "Master",
					action : "switchMaster",
					pressed : false,
					toggleGroup: this.id+'-nav-views',
					hidden : true  
				}
			)
		},
		
		addCommonButton: function(){
			this.items.push('->');
			
			this.items.push({
				text: "Options",
				itemId : 'optionsMenu',
				text : "The email", 
				menu: [
					{
						action: 'editPassword',
						text: "Ganti Password",
						listeners: {
							click: function() {
								var editPasswordWindow = Ext.widget("editPassword");
								editPasswordWindow.show();
							}
						}
					},
				]
			});
			
			this.items.push('-');
			this.items.push({
				text: 'Logout',
				action: 'logoutUser'  
			});
		},


		initComponent: function() {
			
			this.items = [];
			this.addPersonalReportButton();
			this.addWorkLogButton();
			this.addMasterButton();
			
			
			this.addCommonButton(); // password and logout 
			
			this.callParent(arguments);
		},
	 
});
