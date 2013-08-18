Ext.define('AM.view.CustomDateTimeField', {
    extend: 'Ext.form.FieldContainer',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    alias: 'widget.customdatetimefield',
    layout: 'hbox',
    width: 200,
    height: 22,
    combineErrors: true,
    msgTarget: 'side',
    submitFormat: 'Y-m-d H:i:s',

    dateCfg: null,
    timeCfg: null,

    initComponent: function () {
        var me = this;
        if (!me.dateCfg) me.dateCfg = {};
        if (!me.timeCfg) me.timeCfg = {};
        me.buildField();
        me.callParent();
        me.dateField = me.down('datefield')
        me.timeField = me.down('timefield')

        me.initField();
    },

    //@private
    buildField: function () {
        var me = this;
        me.items = [
        Ext.apply({
            xtype: 'datefield',
            submitValue: false,
            format: 'd.m.Y',
            width: 100,
            flex: 2
        }, me.dateCfg),
        Ext.apply({
            xtype: 'timefield',
            submitValue: false,
            format: 'H:i',
            width: 80,
            flex: 1 
        }, me.timeCfg)]
    },


		markInvalid: function(err_msg){
			// console.log("The shite is called!! yippiee");
			// console.log("The message: " ) ; 
			// console.log( err_msg ) ;
			var dateField = this.down("datefield");
			var timeField = this.down("timefield");
			// console.log("The dateField");
			// console.log( dateField ) ; 
			dateField.markInvalid( err_msg ) ;
			// console.log("The timefield");
			// console.log( timeField ) ;
			timeField.markInvalid( err_msg ) ;
		},
		
    getValue: function () {
        var me = this,
            value,
            date = me.dateField.getSubmitValue(),
            dateFormat = me.dateField.format,
            time = me.timeField.getSubmitValue(),
            timeFormat = me.timeField.format;
        if (date) {
            if (time) {
                value = Ext.Date.parse(date + ' ' + time, me.getFormat());
            } else {
                value = me.dateField.getValue();
            }
        }
        return value;
    },

		parseDate : function(value){
			if(value=== undefined){
				return new Date();
			}
			date_array = value.split(" ")[0];
			time_array = value.split(" ")[1];
			
			date_array = date_array.split("-");
			time_array = time_array.split(":");
			// console.log("The date_array");
			// 			console.log( date_array ) ;
			// 			
			// 			console.log("The time_array");
			// 			console.log( time_array ) ;
			
			return new Date( parseInt( date_array[0] ) , 
												parseInt( date_array[1] ) - 1,  // month is indexed from 0
												parseInt( date_array[2] ), 
									parseInt( time_array[0] ), 
									parseInt( time_array[1] ), 
									parseInt( time_array[2] ) )
		},

    setValue: function (value) {
        var me = this;
				// console.log("The dateField");
				// console.log( me.dateField) ;
				// console.log( me.dateField.setValue ) ;
				// console.log("The value to be set to datetime");
				// console.log( value ) ;
				
				var start = new Date() ; 
				
				value = me.parseDate( value ) ;
				// console.log("Proposed value into the timeField: " + value ) ;
				// console.log("Proposed value into the dateField: " + value ) ;
				// 
				// new Date(year, month, day, hours, minutes, seconds, milliseconds)
				 // 07/08/2013 00:24:59 
				
				
				me.timeField.setValue(value);
        me.dateField.setValue(value);
				
				// console.log("The value set into timeField: " + me.timeField.getValue() );
				// console.log("The value set into dateField: " + me.dateField.getValue () );
				//         
    },

    getSubmitData: function () {
        var me = this,
            data = null;
        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
            data = {},
            value = me.getValue(),
            data[me.getName()] = '' + value ? Ext.Date.format(value, me.submitFormat) : null;
        }
        return data;
    },

    getFormat: function () {
        var me = this;
        return (me.dateField.submitFormat || me.dateField.format) + " " + (me.timeField.submitFormat || me.timeField.format)
    }
});