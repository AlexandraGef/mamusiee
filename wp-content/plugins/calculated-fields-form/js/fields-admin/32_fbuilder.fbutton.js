	$.fbuilder.typeList.push(
		{
			id:"fButton",
			name:"Button",
			control_category:1
		}
	);
	$.fbuilder.controls[ 'fButton' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'fButton' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			ftype:"fButton",
            sType:"button", // button, reset, calculate
            sValue:"button",
            sOnclick:"",
			userhelp:"A description of the section goes here.",
			display:function()
				{
					return '<div class="fields '+this.name+'" id="field'+this.form_identifier+'-'+this.index+'"><div class="arrow ui-icon ui-icon-play "></div><div title="Delete" class="remove ui-icon ui-icon-trash "></div><div title="Duplicate" class="copy ui-icon ui-icon-copy "></div><input type="button" disabled value="'+$.fbuilder.htmlEncode(this.sValue)+'"><span class="uh">'+this.userhelp+'</span><div class="clearer"></div></div>';
				},
			editItemEvents:function()
				{ 	
					var evt=[
						{s:"#sValue",e:"change keyup", l:"sValue"},
						{s:"#sOnclick",e:"change keyup", l:"sOnclick"},
						{s:"[name='sType']",e:"click", l:"sType"}
					];
					$.fbuilder.controls[ 'ffields' ].prototype.editItemEvents.call(this,evt);
				},
            showSpecialDataInstance: function()
                {
                    return this._showTypeSettings() + this._showValueSettings() + this._showOnclickSettings();
                },
            _showTypeSettings: function()
                {
                    var l = [ 'reset', 'button', 'calculate' ],
                        r  = "", v;
                    
                    for( var i = 0, h = l.length; i < h; i++ )
                    {
                        v = l[ i ];
                        r += '<label style="margin-right:10px;"><input type="radio" name="sType" value="' + v + '" ' + ( ( this.sType == v ) ? 'CHECKED' : '' ) + ' >' + v + '</label>';
                    }
                    return '<div><label>Select button type</label><br/>' + r + '</div>';
                },
            _showValueSettings: function()
                {
                    return '<label>Value</label><input type="text" class="large" name="sValue" id="sValue" value="'+$.fbuilder.htmlEncode(this.sValue)+'" />';
                },
            _showOnclickSettings: function()
                {
                    return '<label>OnClick event</label><textarea class="large" name="sOnclick" id="sOnclick">'+this.sOnclick+'</textarea>';
                },
            showTitle: function(){ return ''; },
            showShortLabel: function(){ return ''; }
	});