Ext.define('AM.view.header.EditPassword', {

    extend: 'Ext.window.Window',
    // alias : 'widget.editPassword',
		alias : 'widget.editPassword',
    title: 'Edit Password',
    modal: true,
    layout: 'fit',
    height: 200,
    width: 500,

    initComponent: function() {
        var me = this;
             
        Ext.apply(Ext.form.field.VTypes, {
        
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },
        
            passwordText: 'Passwords tidak sama.'
        });

        Ext.applyIf(me, {
        
            items: [{
                xtype: 'form',
                url: 'api/update_password',
                border: false,
                bodyPadding: 10,
                fieldDefaults: {
                    msgTarget: 'side',
                    labelWidth: 165
                },
                items: [{
                    xtype: 'textfield',
                    allowBlank: false,
                    inputType: 'password',
                    fieldLabel: 'Password Lama',
                    name: 'user[current_password]',
                    anchor: '100%'
                }, {
                    xtype: 'textfield',
                    allowBlank: false,
                    inputType: 'password',
                    fieldLabel: 'Password Baru',
                    name: 'user[password]',
                    // id: 'pass',
                    anchor: '100%'
                }, {
                    xtype: 'textfield',
                    inputType: 'password',
                    fieldLabel: 'Ketik Ulang Password Baru',
                    name: 'user[password_confirmation]',
                    vtype: 'password',
                    // initialPassField: 'pass',
                    allowBlank: false,
                    anchor: '100%'
                }, {
                    xtype: 'container',
                    height: 10
                }, {
                    xtype: 'container',
                    height: 20,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [
        										{
                        xtype: 'container',
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: 'Simpan',
                        action: 'updatePassword',
                        listeners: {
                            click: function() {
                                var form = me.down('form');
                                if(form.getForm().isValid()) {
                                    
                                    form.getForm().waitMsgTarget = me.getEl();
                                    form.getForm().submit({
                                        method:'PUT',
                                        waitMsg: 'Updating Password..',
                                        success:function(f, a) {
                                            Ext.Msg.alert('Success', a.result.message, function(btn, text){
                                                form.getForm().reset();
                                            });
                                        },
                                        failure:function(form, action){
                                            Ext.MessageBox.show({
                                                title: 'Fail',
                                                msg: action.result?action.result.message:'Kesalahan sistem, ulangi lagi.',
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                            })
                                        }
                                    });
                                }
                            }
                        }
                    }, {
                        xtype: 'container',
                        width: 5
                    }, {
                        xtype: 'button',
                        height: 20,
                        width: 60,
                        text: 'Batal',
                        scope: this,
                        handler: this.close
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }    
});