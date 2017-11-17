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
			show:function()
				{
					return '<div class="fields '+this.csslayout+' cff-file-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input type="file" id="'+this.name+'" name="'+this.name+'[]" accept="'+this.accept+'" upload_size="'+this.upload_size+'" class="field '+this.size+((this.required)?" required":"")+'" '+( ( this.multiple ) ? 'multiple' : '' )+' /><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			after_show:function()
			{
				var me = this;
				
				$.validator.addMethod("accept", function(value, element, param) 
				{
					if( this.optional( element ) ) return true;
					else{
						param = typeof param === "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
						var regExpObj = new RegExp(".(" + param + ")$", "i");
						for( var i = 0, h = element.files.length; i < h; i++ )
							if( !element.files[ i ].name.match( regExpObj ) ) return false;
						return true;
					}	
				});
				
                $.validator.addMethod("upload_size", function(value, element,params) 
			    {
					if( this.optional( element ) ) return true;
					else{
						var total = 0;
						for( var i = 0, h = element.files.length; i < h; i++ )
							total += element.files[ i ].size/1024;
						return ( total <= params );
					}
				});
				
				$( '#'+me.name ).change( function(){
					$( this ).siblings( 'span.files-list' ).remove();
					if( this.files.length > 1 )
					{
						var filesList = [];
						for( var i = 0, h = this.files.length; i < h; i++ )
							filesList.push( this.files[ i ].name )
						$( this ).after( '<span class="files-list">'+filesList.join( ', ' )+'</span>' );
					}
				});
			}	  
		}         
	);            
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  