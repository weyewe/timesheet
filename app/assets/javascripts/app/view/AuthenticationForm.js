Ext.define("AM.view.AuthenticationForm", {
	extend : "Ext.form.Panel",
	alias : 'widget.authform',
	
	layout : {
		align : 'center',
		pack : 'center',
		type : 'hbox'
	},
	
	items : [
		{
			xtype : 'fieldset',
			width : 300,
			title : "Log in",
			items : [
				{
					xtype : 'textfield',
					anchor : '100%',
					fieldLabel : "Email Anda",
					name : 'email'
				},
				{
					xtype : 'textfield',
					anchor : '100%',
					inputType : 'password',
					fieldLabel : "Password",
					name : 'password'
				},
				{
					xtype : "button",
					anchor : "100%",
					itemId : 'loginBtn',
					text : 'Log in'
				}
			]
		}
	]
});