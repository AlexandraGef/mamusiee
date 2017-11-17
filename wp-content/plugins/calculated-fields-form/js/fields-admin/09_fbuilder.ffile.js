	$.fbuilder.typeList.push(
		{
			id:"ffile",
			name:"Upload File",
			control_category:1
		}
	);
	$.fbuilder.controls[ 'ffile' ] = function(){};
	$.extend(
		$.fbuilder.controls[ 'ffile' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Untitled",
			ftype:"ffile",
			required:false,
			size:"medium",
			accept:"",
			upload_size:"",
			multiple:false,
			display:function()
				{
					return '<div class="fields '+this.name+'" id="field'+this.form_identifier+'-'+this.index+'"><div class="arrow ui-icon ui-icon-play "></div><div title="Delete" class="remove ui-icon ui-icon-trash "></div><div title="Duplicate" class="copy ui-icon ui-icon-copy "></div><label>'+this.title+''+((this.required)?"*":"")+'</label><div class="dfield"><input type="file" disabled class="field '+this.size+'" /><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			editItemEvents:function()
				{
					var evt = [
							{s:"#sSize",e:"change", l:"size"},
							{s:"#sAccept",e:"change keyup", l:"accept"},
							{s:"#sUpload_size",e:"change keyup", l:"upload_size"},
							{s:"#sMultiple",e:"click", l:"multiple",f:function(el){return el.is(":checked");}}
						];
					$.fbuilder.controls[ 'ffields' ].prototype.editItemEvents.call(this,evt);
				},
			showSpecialDataInstance: function()
				{
					return '<div><label>Accept these file extensions [<a class="helpfbuilder" text="Extensions comma separated and without the dot.\n\nExample: jpg,png,gif,pdf">help?</a>]</label><br /><input name="sAccept" id="sAccept" value="'+$.fbuilder.htmlEncode(this.accept)+'" class="large"></div><div><label>Maximun upload size in kB [<a class="helpfbuilder" text="1024 kB = 1 MB.\n\nThe support for this HTML5 feature may be partially available or not available in some browsers.">help?</a>]</label><br /><input name="sUpload_size" id="sUpload_size" value="'+$.fbuilder.htmlEncode(this.upload_size)+'" class="large"></div><div><label><input type="checkbox" id="sMultiple" name="sMultiple" '+( ( typeof this.multiple != 'undefined' && this.multiple ) ? 'CHECKED' : '' )+' /> Upload multiple files</label></div><div class="clearer"></div>';
				}
	});