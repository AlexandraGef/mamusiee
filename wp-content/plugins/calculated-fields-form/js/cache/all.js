fbuilderjQuery=(typeof fbuilderjQuery!='undefined')?fbuilderjQuery:jQuery;fbuilderjQuery(window).bind('pageshow',function(event){if(typeof event.originalEvent['persisted']!='undefined'&&event.originalEvent['persisted'])location.reload();});fbuilderjQuery(function(){(function($){$.fbuilder=$.fbuilder||{};$.fbuilder['objName']='fbuilderjQuery';;(function(root){var lib={};lib.cf_logical_version='0.1';lib.IF=function(_if,_then,_else){if(_if){return(typeof _then==='undefined')?true:_then;}else{return(typeof _else==='undefined')?false:_else;}};lib.AND=function(){for(var i=0,h=arguments.length;i<h;i++){if(!arguments[i]){return false;}}
return true;};lib.OR=function(){for(var i=0,h=arguments.length;i<h;i++){if(arguments[i]){return true;}}
return false;};lib.NOT=function(_term){return(typeof _term=='undefined')?true:!_term;};lib.IN=function(_term,_values){function _reduce(str){return String(str).replace(/^\s+/,'').replace(/\s+$/,'').replace(/\s+/,' ').toLowerCase();};_term=_reduce(_term);if(typeof _values=='string')return _reduce(_values).indexOf(_term)!=-1;else if(typeof _values=='object'&&_values.length){for(var i=0,h=_values.length;i<h;i++)if(_reduce(_values[i]).indexOf(_term)!=-1)return true;}
return false;};root.CF_LOGICAL=lib;})(this);fbuilderjQuery=(typeof fbuilderjQuery!='undefined')?fbuilderjQuery:jQuery;fbuilderjQuery['fbuilder']=fbuilderjQuery['fbuilder']||{};fbuilderjQuery['fbuilder']['modules']=fbuilderjQuery['fbuilder']['modules']||{};fbuilderjQuery['fbuilder']['modules']['default']={'prefix':'','callback':function()
{if(window.PREC==undefined)
{window.PREC=window.prec=function(num,pr)
{if(/^\d+$/.test(pr)&&/^[+-]?\d+(\.\d+)?$/.test(num))
{result=num.toFixed(pr);return result;}
return num;};}
if(window.CDATE==undefined)
{window.CDATE=window.cdate=function(num,format)
{format=(typeof format!='undefined')?format:((typeof window.DATETIMEFORMAT!='undefined')?window.DATETIMEFORMAT:'dd/mm/yyyy');if(isFinite(num*1))
{num=Math.round(num*86400000);var date=new Date(num),d=date.getDate(),m=date.getMonth()+1,y=date.getFullYear(),h=date.getHours(),i=date.getMinutes(),s=date.getSeconds(),a='';m=(m<10)?'0'+m:m;d=(d<10)?'0'+d:d;if(/a/.test(format))
{a=(h>=12)?'pm':'am';h=h%12;h=(h==0)?12:h;}
h=(h<10)?'0'+h:h;i=(i<10)?'0'+i:i;s=(s<10)?'0'+s:s;return format.replace(/y+/i,y).replace(/m+/i,m).replace(/d+/i,d).replace(/h+/i,h).replace(/i+/i,i).replace(/s+/i,s).replace(/a+/i,a);}
return num;};}
if(window.GCD==undefined)
{window.GCD=window.gcd=function(a,b)
{if(!b)return a;return GCD(b,a%b);};}
if(window.LOGAB==undefined)
{window.LOGAB=window.logab=function(a,b)
{return LOG(a)/LOG(b);};}
var math_prop=["LN10","PI","E","LOG10E","SQRT2","LOG2E","SQRT1_2","LN2","cos","pow","log","tan","sqrt","ceil","asin","abs","max","exp","atan2","random","round","floor","acos","atan","min","sin"];for(var i=0,h=math_prop.length;i<h;i++)
{if(!window[math_prop[i]])
{window[math_prop[i]]=window[math_prop[i].toUpperCase()]=Math[math_prop[i]];}}
fbuilderjQuery['fbuilder']['extend_window'](fbuilderjQuery['fbuilder']['modules']['default']['prefix'],CF_LOGICAL);},'validator':function(v)
{return(typeof v=='number')?isFinite(v):(typeof v!='undefined');}};$.fbuilder['controls']=(typeof $.fbuilder['controls']!='undefined')?$.fbuilder['controls']:{};$.fbuilder['forms']=(typeof $.fbuilder['forms']!='undefined')?$.fbuilder['forms']:{};$.fbuilder['htmlEncode']=function(value)
{value=$('<div/>').text(value).html()
value=value.replace(/"/g,"&quot;").replace(/&amp;lt;/g,'&lt;').replace(/&amp;gt;/g,'&gt;');return value;};$.fbuilder['htmlDecode']=function(value)
{if(/&(?:#x[a-f0-9]+|#[0-9]+|[a-z0-9]+);?/ig.test(value))value=$('<div/>').html(value).text();return value;};$.fbuilder['escape_symbol']=function(value)
{return value.replace(/([\^\$\-\.\,\[\]\(\)\/\\\*\?\+\!\{\}])/g,"\\$1");};$.fbuilder['parseValStr']=function(value)
{if(typeof value=='undefined'||value==null)value='';value=$.trim(value.replace(/'/g,"\\'").replace(/\$/g,'\\$').replace(/"/g,'\\"'));return(value==parseFloat(value))?value:'"'+value+'"';};$.fbuilder['parseVal']=function(value,thousandSeparator,decimalSymbol)
{if(typeof value=='undefined'||value==null||value=='')return 0;value=$.trim(value);if(/(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{4})|(\d{4}[\/\.\-]\d{1,2}[\/\.\-]\d{1,2})/.test(value))
return $.fbuilder['parseValStr'](value);thousandSeparator=$.fbuilder.escape_symbol((typeof thousandSeparator=='undefined')?',':thousandSeparator);decimalSymbol=(typeof decimalSymbol=='undefined'||/^\s*$/.test(decimalSymbol))?'.':decimalSymbol;var correction=new RegExp(((/^\s*$/.test(thousandSeparator))?',':thousandSeparator)+('\(\\d{1,2}\)$')),correctionReplacement=decimalSymbol+'$1';thousandSeparator=new RegExp(thousandSeparator,'g');decimalSymbol=new RegExp($.fbuilder.escape_symbol(decimalSymbol),'g');var t=value.replace(correction,correctionReplacement).replace(thousandSeparator,'').replace(decimalSymbol,'.').replace(/\s/g,''),p=/[+\-]?((\d+(\.\d+)?)|(\.\d+))(?:[eE][+\-]?\d+)?/.exec(t);return(p)?p[0]*1:$.fbuilder['parseValStr'](value);};$.fn.fbuilder=function(options){var opt=$.extend({},{pub:false,identifier:"",title:""},options,true);opt.messages=$.extend({previous:"Previous",next:"Next",pageof:"Page {0} of {0}",required:"This field is required.",email:"Please enter a valid email address.",datemmddyyyy:"Please enter a valid date with this format(mm/dd/yyyy)",dateddmmyyyy:"Please enter a valid date with this format(dd/mm/yyyy)",number:"Please enter a valid number.",digits:"Please enter only digits.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),equalTo:"Please enter the same value again.",max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},opt.messages);opt.messages.max=$.validator.format(opt.messages.max);opt.messages.min=$.validator.format(opt.messages.min);$.extend($.validator.messages,opt.messages);var items=[],reloadItemsPublic=function()
{var form_tag=$("#fieldlist"+opt.identifier).closest('form');form_tag.addClass(theForm.formtemplate);if(!opt.cached)
{$("#fieldlist"+opt.identifier).html("").addClass(theForm.formlayout);$("#formheader"+opt.identifier).html(theForm.show());var page=0;$("#fieldlist"+opt.identifier).append('<div class="pb'+page+' pbreak" page="'+page+'"></div>');for(var i=0;i<items.length;i++)
{items[i].index=i;if(items[i].ftype=="fPageBreak")
{page++;$("#fieldlist"+opt.identifier).append('<div class="pb'+page+' pbreak" page="'+page+'"></div>');}
else
{$("#fieldlist"+opt.identifier+" .pb"+page).append(items[i].show());if(items[i].predefinedClick)
{$("#fieldlist"+opt.identifier+" .pb"+page).find("#"+items[i].name).attr("placeholder",items[i].predefined);$("#fieldlist"+opt.identifier+" .pb"+page).find("#"+items[i].name).attr("value","");}
if(items[i].userhelpTooltip)
{var uh_t,uh=$("#fieldlist"+opt.identifier+" .pb"+page).find("#"+items[i].name).closest(".dfield");if(uh.length==0)
{uh=$("#fieldlist"+opt.identifier+" .pb"+page).find("#"+items[i].name).closest(".fields");}
uh_t=uh.find(".uh");if(uh_t.length&&uh_t.text()!="")
{uh.attr("uh",uh_t.text());uh_t.text("");}}}}}
else
{var page=form_tag.find('.pbreak').length,i=items.length;}
if(page>0)
{if(!opt.cached)
{$("#fieldlist"+opt.identifier+" .pb"+page).addClass("pbEnd");$("#fieldlist"+opt.identifier+" .pbreak").each(function(index){var code=$(this).html();var bSubmit='';if(index==page)
{if($("#cpcaptchalayer"+opt.identifier).length&&!/^\s*$/.test($("#cpcaptchalayer"+opt.identifier).html()))
{code+='<div class="captcha">'+$("#cpcaptchalayer"+opt.identifier).html()+'</div><div class="clearer"></div>';$("#cpcaptchalayer"+opt.identifier).html("");}
if($("#cp_subbtn"+opt.identifier).html())
{bSubmit='<div class="pbSubmit">'+$("#cp_subbtn"+opt.identifier).html()+'</div>';}}
$(this).html('<fieldset><legend>'+opt.messages.pageof.replace(/\{\s*\d+\s*\}/,(index+1)).replace(/\{\s*\d+\s*\}/,(page+1))+'</legend>'+code+'<div class="pbPrevious">'+opt.messages.previous+'</div><div class="pbNext">'+opt.messages.next+'</div>'+bSubmit+'<div class="clearer"></div></fieldset>');});}
$('#fieldlist'+opt.identifier).find(".pbPrevious,.pbNext").bind("click",{'identifier':opt.identifier},function(evt){var identifier=evt.data.identifier;if(($(this).hasClass("pbPrevious"))||(($(this).hasClass("pbNext"))&&$(this).closest("form").valid()))
{var page=parseInt($(this).parents(".pbreak").attr("page"));(($(this).hasClass("pbPrevious"))?page--:page++);$("#fieldlist"+identifier+" .pbreak").css("display","none");$("#fieldlist"+identifier+" .pbreak").find(".field").addClass("ignorepb");$("#fieldlist"+identifier+" .pb"+page).css("display","block");$("#fieldlist"+identifier+" .pb"+page).find(".field").removeClass("ignorepb");if($("#fieldlist"+identifier+" .pb"+page).find(".field").length>0)
{try
{var ffocusable=$("#fieldlist"+identifier+" .pb"+page).find(":focusable"),_wScrollTop=$(window).scrollTop(),_viewportHeight=$(window).height(),_scrollTop=$("#fieldlist"+identifier+" .pb"+page).closest('form').offset().top;if(ffocusable.length)
{ffocusable[0].focus();}
if(_scrollTop<_wScrollTop||(_wScrollTop+_viewportHeight)<_scrollTop)
{$('html, body').animate({scrollTop:_scrollTop},50);}}
catch(e){}}}
else
{$(this).closest("form").validate().focusInvalid();}
return false;});}
else
{if(!opt.cached)
{if($("#cpcaptchalayer"+opt.identifier).length&&!/^\s*$/.test($("#cpcaptchalayer"+opt.identifier).html()))
{$("#fieldlist"+opt.identifier+" .pb"+page).append('<div class="captcha">'+$("#cpcaptchalayer"+opt.identifier).html()+'</div>');$("#cpcaptchalayer"+opt.identifier).html("");}
if($("#cp_subbtn"+opt.identifier).html())
{$("#fieldlist"+opt.identifier+" .pb"+page).append('<div class="pbSubmit">'+$("#cp_subbtn"+opt.identifier).html()+'</div>');}}}
if(!opt.cached&&opt.setCache)
{var url=document.location.href,data={'cffaction':'cff_cache','cache':form_tag.html().replace(/\n+/g,''),'form':form_tag.find('[name="cp_calculatedfieldsf_id"]').val()};$.post(url,data,function(data){if(typeof console!='undefined')console.log(data);});}
$(document).on('click','#fbuilder .captcha img',function(){var e=$(this);e.attr('src',e.attr('src').replace(/&\d+$/,'')+'&'+Math.floor(Math.random()*1000));});$(form_tag).find('.captcha img').click();$('#fieldlist'+opt.identifier).find(".pbSubmit").bind("click",{'identifier':opt.identifier},function(evt)
{$(this).closest("form").submit();});if(i>0)
{theForm.after_show(opt.identifier);for(var i=0;i<items.length;i++)
{items[i].after_show();}
$.fbuilder.showHideDep({'formIdentifier':opt.identifier,'throwEvent':true});$('#fieldlist'+opt.identifier).find(".depItemSel,.depItem").bind("change",{'identifier':opt.identifier},function(evt)
{$.fbuilder.showHideDep({'formIdentifier':evt.data.identifier,'fieldItentifier':evt.target.id,'throwEvent':true});});try
{$("#fbuilder"+opt.identifier).tooltip({show:false,hide:false,tooltipClass:"uh-tooltip",position:{my:"left top",at:"left bottom+5",collision:"none"},items:"[uh]",content:function(){return $(this).attr("uh");},open:function(evt,ui){try{if(window.matchMedia("screen and (max-width: 640px)").matches)setTimeout(function(){$(ui.tooltip).hide('fade');},3000);}catch(err){}}});}catch(e){}}
$("#fieldlist"+opt.identifier+" .pbreak:not(.pb0)").find(".field").addClass("ignorepb");};var fform=function(){};$.extend(fform.prototype,{title:"Untitled Form",description:"This is my form. Please fill it out. It's awesome!",formlayout:"top_aligned",formtemplate:"",evalequations:1,autocomplete:1,show:function(){return'<div class="fform" id="field"><h2>'+this.title+'</h2><span>'+this.description+'</span></div>';},after_show:function(id){var form=$('#cp_calculatedfieldsf_pform'+id);if(typeof $.fn.fbuilder_localstorage!='undefined'&&form.hasClass('persist-form'))
{form.fbuilder_localstorage();}
form.attr('data-evalequations',this.evalequations).attr('autocomplete',((this.autocomplete)?'on':'off')).find('input,select').blur(function(){try{$(this).valid();}catch(e){};});}});var theForm,ffunct={toShow:{},toHide:{},hiddenByContainer:{},getItem:function(name)
{for(var i in items)
{if(items[i].name==name)
{return items[i];}}
return false;},getItems:function()
{return items;},loadData:function(f)
{var d=window[f];if(typeof d!='undefined')
{if(typeof d=='object'&&(typeof d.nodeType!=='undefined'||d instanceof jQuery)){d=jQuery.parseJSON(jQuery(d).val());}
else if(typeof d=='string'){d=jQuery.parseJSON(d);}
if(d.length==2)
{this.formId=d[1]['formid'];items=[];for(var i=0;i<d[0].length;i++)
{var obj=new $.fbuilder.controls[d[0][i].ftype]();obj=$.extend(true,{},obj,d[0][i]);obj.name=obj.name+opt.identifier;obj.form_identifier=opt.identifier;obj.init();items[items.length]=obj;}
theForm=new fform();theForm=$.extend(theForm,d[1][0]);opt.cached=(typeof d[1]['cached']!='undefined'&&d[1]['cached'])?true:false;opt.setCache=(!this.cached&&typeof d[1]['setCache']!='undefined'&&d[1]['setCache'])?true:false;reloadItemsPublic();}
$.fbuilder.cpcff_load_defaults(opt);}}};$.fbuilder['forms'][opt.identifier]=ffunct;this.fBuild=ffunct;return this;};$.fbuilder['showSettings']={formlayoutList:[{id:"top_aligned",name:"Top Aligned"},{id:"left_aligned",name:"Left Aligned"},{id:"right_aligned",name:"Right Aligned"}]};$.fbuilder.controls['ffields']=function(){};$.extend($.fbuilder.controls['ffields'].prototype,{form_identifier:"",name:"",shortlabel:"",index:-1,ftype:"",userhelp:"",userhelpTooltip:false,csslayout:"",init:function(){},show:function()
{return'Not available yet';},after_show:function(){},val:function(){var e=$("[id='"+this.name+"']:not(.ignore)");if(e.length)
{return $.fbuilder.parseVal($.trim(e.val()));}
return 0;},setVal:function(v)
{$("[id='"+this.name+"']").val(v);}});$.fbuilder['showHideDep']=function(configObj)
{var process_items=function(items,isNotFirstTime)
{for(var i=0,h=items.length;i<h;i++)
{if(typeof items[i]=='string')items[i]=$.fbuilder['forms'][identifier].getItem(items[i]);if(isNotFirstTime&&items[i]&&items[i].usedInEquations)$.fbuilder['calculator'].enqueueEquation(identifier,items[i].usedInEquations);if(typeof items[i]['showHideDep']!='undefined')
{var list=items[i]['showHideDep'](toShow,toHide,hiddenByContainer);if(typeof list!='undefined'&&list.length)
process_items(list,true);}}};if(typeof configObj['formIdentifier']!=='undefined')
{var identifier=configObj['formIdentifier'];if(typeof $.fbuilder['forms'][identifier]!='undefined')
{var toShow=$.fbuilder['forms'][identifier]['toShow'],toHide=$.fbuilder['forms'][identifier]['toHide'],hiddenByContainer=$.fbuilder['forms'][identifier]['hiddenByContainer'],items=(typeof configObj['fieldItentifier']!='undefined')?[$.fbuilder['forms'][identifier].getItem(configObj['fieldItentifier'])]:$.fbuilder['forms'][identifier].getItems();process_items(items);if(typeof configObj['throwEvent']=='undefined'||configObj['throwEvent'])
{$(document).trigger('showHideDepEvent',$.fbuilder['forms'][identifier]['formId']);}}}};$.fbuilder['cpcff_load_defaults']=function(o)
{var $=fbuilderjQuery,id,item,form_data,form_obj;if(typeof cpcff_default!='undefined')
{id=o.identifier.replace(/[^\d]/g,'');if(typeof cpcff_default[id]!='undefined')
{form_data=cpcff_default[id];id='_'+id;form_obj=$.fbuilder['forms'][id];for(var field_id in form_data)
{item=form_obj.getItem(field_id+id);if(typeof item['setVal']!='undefined')item.setVal(form_data[field_id]);}
$.fbuilder.showHideDep({'formIdentifier':o.identifier,'throwEvent':true});}}};$.fbuilder.controls['ftext']=function(){};$.extend($.fbuilder.controls['ftext'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Untitled",ftype:"ftext",predefined:"",predefinedClick:false,required:false,size:"medium",minlength:"",maxlength:"",equalTo:"",regExp:"",regExpMssg:"",show:function()
{return'<div class="fields '+this.csslayout+' cff-text-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" minlength="'+(this.minlength)+'" maxlength="'+$.fbuilder.htmlEncode(this.maxlength)+'" '+((this.equalTo!="")?"equalTo=\"#"+$.fbuilder.htmlEncode(this.equalTo+this.form_identifier)+"\"":"")+' class="field '+this.size+((this.required)?" required":"")+'" type="text" value="'+$.fbuilder.htmlEncode(this.predefined)+'" /><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},after_show:function()
{if(this.regExp!=""&&typeof $['validator']!='undefined')
{var parts=this.regExp.match(/(\/)(.*)(\/)([gimy]{0,4})$/i);this.regExp=(parts===null)?new RegExp(this.regExp):new RegExp(parts[2],parts[4].toLowerCase());$.validator.addMethod('pattern',function(value,element,param)
{try{return this.optional(element)||param.test(value);}
catch(err){return true;}});$('#'+this.name).rules('add',{'pattern':this.regExp,messages:{'pattern':this.regExpMssg}});}},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');if(e.length)return $.fbuilder.parseValStr(e.val());return 0;}});$.fbuilder.controls['fcurrency']=function(){};$.extend($.fbuilder.controls['fcurrency'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Currency",ftype:"fcurrency",predefined:"",predefinedClick:false,required:false,size:"small",readonly:false,currencyText:"USD",thousandSeparator:",",centSeparator:".",min:"",max:"",formatDynamically:false,getFormattedValue:function(value)
{this.centSeparator=$.trim(this.centSeparator);if(/^\s*$/.test(this.centSeparator))this.centSeparator='.';var v=$.trim(value),parts=[],counter=0,str='',s='';v=v.replace(new RegExp($.fbuilder['escape_symbol'](this.currencySymbol),'g'),'').replace(new RegExp($.fbuilder['escape_symbol'](this.currencyText),'g'),'');v=$.fbuilder.parseVal(v,this.thousandSeparator,this.centSeparator);if(!isNaN(v))
{if(v<0)s='-';v=ABS(v);parts=v.toString().split(".");if(!/^\s*$/.test(this.thousandSeparator))
{for(var i=parts[0].length-1;i>=0;i--){counter++;str=parts[0][i]+str;if(counter%3==0&&i!=0)str=this.thousandSeparator+str;}
parts[0]=str;}
if(typeof parts[1]!='undefined')
{if(parts[1].length==1)parts[1]+='0';}
else parts[1]='00';return this.currencySymbol+s+parts.join(this.centSeparator)+this.currencyText;}
else
{return value;}},show:function()
{return'<div class="fields '+this.csslayout+' cff-currency-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input '+((this.readonly)?'READONLY':'')+' id="'+this.name+'" name="'+this.name+'" class="field '+this.dformat+' '+this.size+((this.required)?" required":"")+'" type="text" value="'+$.fbuilder.htmlEncode(this.getFormattedValue(this.predefined))+'" '+((!/^\s*$/.test(this.min))?'min="'+$.fbuilder.parseVal(this.min,this.thousandSeparator,this.centSeparator)+'" ':'')+((!/^\s*$/.test(this.max))?' max="'+$.fbuilder.parseVal(this.max,this.thousandSeparator,this.centSeparator)+'" ':'')+' /><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},after_show:function()
{if(this.formatDynamically)
{var me=this;$(document).on('change','[name="'+me.name+'"]',function(){this.value=me.getFormattedValue(this.value);});}
if(typeof $['validator']!='undefined')
{$.validator.addMethod('min',function(value,element,param)
{var e=element;if(element.id.match(/_\d+$/))
{e=$.fbuilder['forms'][element.id.match(/_\d+$/)[0]].getItem(element.name)}
else if(typeof $.fbuilder['forms']!='undefined'&&typeof $.fbuilder['forms']['']!='undefined')
{e=$.fbuilder['forms'][''].getItem(element.name)}
var thousandSeparator=(typeof e.thousandSeparator!='undefined')?e.thousandSeparator:'',centSymbol=(typeof e.centSeparator!='undefined'&&$.trim(e.centSeparator))?e.centSeparator:'.';return this.optional(element)||$.fbuilder.parseVal(value,thousandSeparator,centSymbol)>=param;});$.validator.addMethod('max',function(value,element,param)
{var e=element;if(element.id.match(/_\d+$/))
{e=$.fbuilder['forms'][element.id.match(/_\d+$/)[0]].getItem(element.name)}
else if(typeof $.fbuilder['forms']!='undefined'&&typeof $.fbuilder['forms']['']!='undefined')
{e=$.fbuilder['forms'][''].getItem(element.name)}
var thousandSeparator=(typeof e.thousandSeparator!='undefined')?e.thousandSeparator:'',centSymbol=(typeof e.centSeparator!='undefined'&&$.trim(e.centSeparator))?e.centSeparator:'.';return this.optional(element)||$.fbuilder.parseVal(value,thousandSeparator,centSymbol)<=param;});}},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');if(e.length)
{var v=$.trim(e.val());v=v.replace(new RegExp($.fbuilder['escape_symbol'](this.currencySymbol),'g'),'').replace(new RegExp($.fbuilder['escape_symbol'](this.currencyText),'g'),'');return $.fbuilder.parseVal(v,this.thousandSeparator,this.centSeparator);}
return 0;}});$.fbuilder.controls['fnumber']=function(){};$.extend($.fbuilder.controls['fnumber'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Number",ftype:"fnumber",predefined:"",predefinedClick:false,required:false,size:"small",thousandSeparator:"",decimalSymbol:".",min:"",max:"",formatDynamically:false,dformat:"digits",formats:new Array("digits","number"),getFormattedValue:function(value)
{this.decimalSymbol=$.trim(this.decimalSymbol);if(/^\s*$/.test(this.decimalSymbol))this.decimalSymbol='.';var v=$.trim(value),s='',counter=0,str='',parts=[];v=$.fbuilder.parseVal(v,this.thousandSeparator,this.decimalSymbol);if(!isNaN(v))
{if(v<0)s='-';v=ABS(v);parts=v.toString().split(".");if(!/^\s*$/.test(this.thousandSeparator))
{for(var i=parts[0].length-1;i>=0;i--){counter++;str=parts[0][i]+str;if(counter%3==0&&i!=0)str=this.thousandSeparator+str;}
parts[0]=str;}
return s+parts.join(this.decimalSymbol);}
else
{return value;}},show:function()
{var _type=(this.dformat=='digits'||(/^\s*$/.test(this.thousandSeparator)&&/^\s*\.\s*$/.test(this.decimalSymbol)))?'number':'text';return'<div class="fields '+this.csslayout+' cff-number-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" '+((!/^\s*$/.test(this.min))?'min="'+$.fbuilder.parseVal(this.min,this.thousandSeparator,this.decimalSymbol)+'" ':'')+((!/^\s*$/.test(this.max))?' max="'+$.fbuilder.parseVal(this.max,this.thousandSeparator,this.decimalSymbol)+'" ':'')+' class="field '+this.dformat+' '+this.size+((this.required)?" required":"")+'" type="'+_type+'" value="'+$.fbuilder.htmlEncode(this.predefined)+'"/><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},after_show:function()
{if(this.formatDynamically&&this.dformat!='digits')
{var me=this;$(document).on('change','[name="'+me.name+'"]',function(){this.value=me.getFormattedValue(this.value);});}
if(typeof $['validator']!='undefined')
{$.validator.addMethod('number',function(value,element)
{var e=element;if(element.id.match(/_\d+$/))
{e=$.fbuilder['forms'][element.id.match(/_\d+$/)[0]].getItem(element.name)}
else if(typeof $.fbuilder['forms']!='undefined'&&typeof $.fbuilder['forms']['']!='undefined')
{e=$.fbuilder['forms'][''].getItem(element.name)}
var thousandSeparator=(typeof e.thousandSeparator!='undefined')?e.thousandSeparator:'',decimalSymbol=(typeof e.decimalSymbol!='undefined'&&$.trim(e.decimalSymbol))?e.decimalSymbol:'.';var regExp=new RegExp('^-?(?:\\d+|\\d{1,3}(?:'+$.fbuilder.escape_symbol(thousandSeparator)+'\\d{3})+)?(?:'+$.fbuilder.escape_symbol(decimalSymbol)+'\\d+)?$');return this.optional(element)||regExp.test(value)||$.isNumeric(value);});$.validator.addMethod('min',function(value,element,param)
{var e=element;if(element.id.match(/_\d+$/))
{e=$.fbuilder['forms'][element.id.match(/_\d+$/)[0]].getItem(element.name)}
else if(typeof $.fbuilder['forms']!='undefined'&&typeof $.fbuilder['forms']['']!='undefined')
{e=$.fbuilder['forms'][''].getItem(element.name)}
var thousandSeparator=(typeof e.thousandSeparator!='undefined')?e.thousandSeparator:'',decimalSymbol=(typeof e.decimalSymbol!='undefined'&&$.trim(e.decimalSymbol))?e.decimalSymbol:'.';return this.optional(element)||$.fbuilder.parseVal(value,thousandSeparator,decimalSymbol)>=param;});$.validator.addMethod('max',function(value,element,param)
{var e=element;if(element.id.match(/_\d+$/))
{e=$.fbuilder['forms'][element.id.match(/_\d+$/)[0]].getItem(element.name)}
else if(typeof $.fbuilder['forms']!='undefined'&&typeof $.fbuilder['forms']['']!='undefined')
{e=$.fbuilder['forms'][''].getItem(element.name)}
var thousandSeparator=(typeof e.thousandSeparator!='undefined')?e.thousandSeparator:'',decimalSymbol=(typeof e.decimalSymbol!='undefined'&&$.trim(e.decimalSymbol))?e.decimalSymbol:'.';return this.optional(element)||$.fbuilder.parseVal(value,thousandSeparator,decimalSymbol)<=param;});}},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');if(e.length)
{var v=$.trim(e.val());return $.fbuilder.parseVal(v,this.thousandSeparator,this.decimalSymbol);}
return 0;}});$.fbuilder.controls['fslider']=function(){};$.extend($.fbuilder.controls['fslider'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Slider",ftype:"fslider",predefined:"",predefinedMin:"",predefinedMax:"",predefinedClick:false,size:"small",thousandSeparator:",",centSeparator:".",min:0,max:100,step:1,range:false,minCaption:"",maxCaption:"",caption:"{0}",init:function()
{this.min=(/^\s*$/.test(this.min))?0:parseFloat($.trim(this.min));this.max=(/^\s*$/.test(this.max))?100:parseFloat($.trim(this.max));this.step=(/^\s*$/.test(this.step))?1:parseFloat($.trim(this.step));this.centSeparator=(/^\s*$/.test(this.centSeparator))?'.':$.trim(this.centSeparator);this.thousandSeparator=$.trim(this.thousandSeparator);this.predefinedMin=(/^\s*$/.test(this.predefinedMin))?this.min:Math.min(Math.max(parseFloat($.trim(this.predefinedMin)),this.min),this.max);this.predefinedMax=(/^\s*$/.test(this.predefinedMax))?this.max:Math.min(Math.max(parseFloat($.trim(this.predefinedMax)),this.min),this.max);this.predefined=(/^\s*$/.test(this.predefined))?this.min:parseFloat($.trim(this.predefined));},show:function()
{return'<div class="fields '+this.csslayout+' cff-slider-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+'</label><div class="dfield slider-container"><input id="'+this.name+'" name="'+this.name+'" class="field" type="hidden" value="'+$.fbuilder.htmlEncode($.trim(this.predefined))+'"/><div id="'+this.name+'_slider" class="slider '+this.size+'"></div><div class="corner_captions '+this.size+'"><span class="left-corner">'+this.minCaption+'</span><span class="right-corner" style="float:right;">'+this.maxCaption+'</span></div><div id="'+this.name+'_caption"></div><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},set_values:function()
{var me=this;function setThousandsSeparator(v)
{v=$.fbuilder.parseVal(v,me.thousandSeparator,me.centSeparator);if(!isNaN(v))
{v=v.toString();var parts=v.toString().split("."),counter=0,str='';if(!/^\s*$/.test(me.thousandSeparator))
{for(var i=parts[0].length-1;i>=0;i--)
{counter++;str=parts[0][i]+str;if(counter%3==0&&i!=0)str=me.thousandSeparator+str;}
parts[0]=str;}
if(typeof parts[1]!='undefined'&&parts[1].length==1)
{parts[1]+='0';}
return parts.join(me.centSeparator);}
else
{return v;}};if(me.range)
{var values=$('#'+me.name+'_slider').slider('values');$('#'+me.name).val('['+values[0]+','+values[1]+']');$('#'+me.name+'_caption').html(me.caption.replace(/\{\s*0\s*\}/,setThousandsSeparator(values[0])).replace(/\{\s*0\s*\}/,setThousandsSeparator(values[1])));}
else
{var value=$('#'+me.name+'_slider').slider('value');$('#'+me.name).val(value);$('#'+me.name+'_caption').html(me.caption.replace(/\{\s*0\s*\}/,setThousandsSeparator(value)));}
$('#'+me.name).change();},after_show:function()
{var me=this,opt={range:(me.range!=false)?me.range:"min",min:me.min,max:me.max,step:me.step};if(me.range)opt['values']=[me.predefinedMin,me.predefinedMax];else opt['value']=me.predefined;opt['slide']=opt['stop']=(function(e){return function(event,ui)
{if(typeof ui.value!='undefined')$(this).slider('value',ui.value);if(typeof ui.values!='undefined')$(this).slider('values',ui.values);e.set_values();}})(me);$('#'+this.name+'_slider').slider(opt);me.set_values();$('#cp_calculatedfieldsf_pform'+me.form_identifier).bind('reset',function(){$('#'+me.name+'_slider').slider(opt);me.set_values();});},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');return(e.length)?e.val():0;},setVal:function(v)
{try{v=JSON.parse(v);}
catch(err){}
try{$('[name="'+this.name+'"]').val(v);if($.isArray(v))
{this.predefinedMin=v[0];this.predefinedMax=v[1];}
else
{this.predefined=v;}
this.after_show();}catch(err){}}});$.fbuilder.controls['femail']=function(){};$.extend($.fbuilder.controls['femail'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Email",ftype:"femail",predefined:"",predefinedClick:false,required:false,size:"medium",equalTo:"",show:function()
{return'<div class="fields '+this.csslayout+' cff-email-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" '+((this.equalTo!="")?"equalTo=\"#"+$.fbuilder.htmlEncode(this.equalTo+this.form_identifier)+"\"":"")+' class="field email '+this.size+((this.required)?" required":"")+'" type="text" value="'+$.fbuilder.htmlEncode(this.predefined)+'"/><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');if(e.length)return $.fbuilder.parseValStr(e.val());return 0;}});$.fbuilder.controls['fdate']=function(){};$.extend($.fbuilder.controls['fdate'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Date",ftype:"fdate",predefined:"",predefinedClick:false,size:"medium",required:false,dformat:"mm/dd/yyyy",tformat:"24",showDropdown:false,dropdownRange:"-10:+10",minDate:"",maxDate:"",invalidDates:"",minHour:0,maxHour:23,minMinute:0,maxMinute:59,stepHour:1,stepMinute:1,showDatepicker:true,showTimepicker:false,defaultDate:"",defaultTime:"",working_dates:[true,true,true,true,true,true,true],formats:new Array("mm/dd/yyyy","dd/mm/yyyy"),init:function()
{function checkValue(v,min,max)
{v=parseInt(v);if(isNaN(v))v=max;else if(v<min)v=min;else if(v>max)v=max;return v;}
this.minHour=checkValue(this.minHour,0,23);this.maxHour=checkValue(this.maxHour,0,23);this.minMinute=checkValue(this.minMinute,0,59);this.maxMinute=checkValue(this.maxMinute,0,59);this.stepHour=checkValue(this.stepHour,1,Math.max(1,this.maxHour-this.minHour));this.stepMinute=checkValue(this.stepMinute,1,Math.max(1,this.maxMinute-this.minMinute));this.invalidDates=this.invalidDates.replace(/\s+/g,'');if(!/^\s*$/.test(this.invalidDates))
{var dateRegExp=new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/),counter=0,dates=this.invalidDates.split(',');this.invalidDates=[];for(var i=0,h=dates.length;i<h;i++)
{var range=dates[i].split('-');if(range.length==2&&range[0].match(dateRegExp)!=null&&range[1].match(dateRegExp)!=null)
{var fromD=new Date(range[0]),toD=new Date(range[1]);while(fromD<=toD)
{this.invalidDates[counter]=fromD;var tmp=new Date(fromD.valueOf());tmp.setDate(tmp.getDate()+1);fromD=tmp;counter++;}}
else
{for(var j=0,k=range.length;j<k;j++)
{if(range[j].match(dateRegExp)!=null)
{this.invalidDates[counter]=new Date(range[j]);counter++;}}}}}},get_hours:function()
{var str='',i=0,h,from=(this.tformat==12)?1:this.minHour,to=(this.tformat==12)?12:this.maxHour;while((h=from+this.stepHour*i)<=to)
{if(h<10)h='0'+''+h;str+='<option value="'+h+'">'+h+'</option>';i++;}
return'<select id="'+this.name+'_hours" name="'+this.name+'_hours">'+str+'</select>:';},get_minutes:function()
{var str='',i=0,m;while((m=this.minMinute+this.stepMinute*i)<=this.maxMinute)
{if(m<10)
{m='0'+''+m;}
str+='<option value="'+m+'">'+m+'</option>';i++;}
return'<select id="'+this.name+'_minutes" name="'+this.name+'_minutes">'+str+'</select>';},get_ampm:function()
{var str='';if(this.tformat==12)
{return'<select id="'+this.name+'_ampm"><option value="am">am</option><option value="pm">pm</option></select>';}
return str;},set_date_time:function()
{var str=$('#'+this.name+'_date').val();if(this.showTimepicker)
{var h=$('#'+this.name+'_hours').val()*1;str+=' ';if(this.tformat==12)
{h=(h==12)?0:h;if($('#'+this.name+'_ampm').val()=='pm')str+=(h+12);else str+=h;}
else str+=h;str+=':'+$('#'+this.name+'_minutes').val();}
$('#'+this.name).val(str).change();},show:function()
{var attr='value',format_label=[],date_tag_type='text',disabled='',date_tag_class='field date'+this.dformat.replace(/\//g,"")+' '+this.size+((this.required)?' required':'');if(this.predefinedClick)attr='placeholder';if(this.showDatepicker)format_label.push(this.dformat);else{date_tag_type='hidden';disabled='disabled';}
if(this.showTimepicker)format_label.push('HH:mm');return'<div class="fields '+this.csslayout+' cff-date-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+((format_label.length)?' <span class="dformat">('+format_label.join(' ')+')</span>':'')+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" type="hidden" value="'+$.fbuilder.htmlEncode(this.predefined)+'"/><input id="'+this.name+'_date" name="'+this.name+'_date" class="'+date_tag_class+'" type="'+date_tag_type+'" '+attr+'="'+$.fbuilder.htmlEncode(this.predefined)+'" '+disabled+' />'+((this.showTimepicker)?' '+this.get_hours()+this.get_minutes()+' '+this.get_ampm():'')+'<span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},setDefaultDate:function()
{var me=this,p={dateFormat:me.dformat.replace(/yyyy/g,"yy"),minDate:me.minDate,maxDate:me.maxDate},dp=$("#"+me.name+"_date"),dd=(me.defaultDate!="")?me.defaultDate:((me.predefined!="")?me.predefined:new Date());dp.click(function(){$(document).click();$(this).focus();});if(me.showDropdown)
{if(me.dropdownRange.indexOf(':')==-1)me.dropdownRange='-10:+10';p=$.extend(p,{changeMonth:true,changeYear:true,yearRange:me.dropdownRange});}
p=$.extend(p,{beforeShowDay:(function(w,i){return function(d){return me.validateDate(d,w,i);};})(me.working_dates,me.invalidDates)});dp.datepicker(p);if(!me.predefinedClick)dp.datepicker("setDate",dd);if(!me.validateDate(dp.datepicker("getDate"),me.working_dates,me.invalidDates)[0])
{dp.datepicker("setDate",'');}},setDefaultTime:function()
{function setValue(f,v,m)
{v=Math.min(v*1,m*1);v=(v<10)?0+''+v:v;$('#'+f+' [value="'+v+'"]').prop('selected',true);};if(this.showTimepicker)
{var parts,time={},tmp=0;if((parts=/(\d{1,2}):(\d{1,2})/g.exec(this.defaultTime))!=null)
{time['hour']=parts[1];time['minute']=parts[2];}
else
{var d=new Date();time['hour']=d.getHours();time['minute']=d.getMinutes();}
setValue(this.name+'_hours',(this.tformat==12)?((time['hour']>12)?time['hour']-12:((time['hour']==0)?12:time['hour'])):time['hour'],(this.tformat==12)?12:this.maxHour);setValue(this.name+'_minutes',time['minute'],this.maxMinute);$('#'+this.name+'_ampm'+' [value="'+((time['hour']<12)?'am':'pm')+'"]').prop('selected',true);}},setEvents:function()
{var me=this,f=function(){if(!me.after_show_flag)
$('#'+me.name+'_date').valid();me.set_date_time();};$(document).on('change','#'+me.name+'_date',function(){f();});$(document).on('change','#'+me.name+'_hours',function(){f();});$(document).on('change','#'+me.name+'_minutes',function(){f();});$(document).on('change','#'+me.name+'_ampm',function(){f();});$('#cp_calculatedfieldsf_pform'+me.form_identifier).bind('reset',function(){setTimeout(function(){me.setDefaultDate();me.setDefaultTime();me.set_date_time();},500);});},validateDate:function(d,w,i)
{try{if(d===null)return[false,""];if(!w[d.getDay()])return[false,""];if(i!==null)
{for(var j=0,h=i.length;j<h;j++)
{if(d.getDate()==i[j].getDate()&&d.getMonth()==i[j].getMonth()&&d.getFullYear()==i[j].getFullYear())return[false,""];}}}
catch(_err){}
return[true,""];},validateTime:function(e,i)
{if(i.showTimepicker)
{var base=e.name.replace('_date',''),h=$('#'+base+'_hours').val(),m=$('#'+base+'_minutes').val();if(i.tformat==12)
{if($('#'+base+'_ampm').val()=='pm'&&h!=12)h=h*1+12;if($('#'+base+'_ampm').val()=='am'&&h==12)h=0;}
if(h<i.minHour||h>i.maxHour)return false;}
return true;},after_show:function()
{var me=this;me.after_show_flag=true;me.setEvents();me.setDefaultDate();me.setDefaultTime();$('#'+this.name+'_date').change();me.after_show_flag=false;var validator=function(v,e)
{try
{var _dp=$.datepicker,_fb=$.fbuilder,p=e.name.replace('_date','').split('_'),_index=(p.length>1)?'_'+p[1]:'',item=(typeof _fb['forms']!='undefined'&&typeof _fb['forms'][_index]!='undefined')?_fb['forms'][_index].getItem(p[0]+'_'+p[1]):null,inst=_dp._getInst(e),minDate=_dp._determineDate(inst,_dp._get(inst,'minDate'),null),maxDate=_dp._determineDate(inst,_dp._get(inst,'maxDate'),null),dateFormat=_dp._get(inst,'dateFormat'),date=_dp.parseDate(dateFormat,v,_dp._getFormatConfig(inst));if(item!=null)
{return this.optional(e)||((minDate==null||date>=minDate)&&(maxDate==null||date<=maxDate)&&me.validateDate($(e).datepicker('getDate'),item.working_dates,item.invalidDates)[0]&&me.validateTime(e,item));}
return true;}
catch(er)
{return false;}};$.validator.addMethod("dateddmmyyyy",validator);$.validator.addMethod("datemmddyyyy",validator);},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');if(e.length)
{var rt;if(this.dformat=='yyyy/mm/dd'||this.dformat=='yyyy/dd/mm')
rt='(\\d{4})[\\/\\-\\.](\\d{1,2})[\\/\\-\\.](\\d{1,2})';else
rt='(\\d{1,2})[\\/\\-\\.](\\d{1,2})[\\/\\-\\.](\\d{4})';var v=$.trim(e.val()),re=new RegExp(rt+'(\\s(\\d{1,2})[:\\.](\\d{1,2}))?'),d=re.exec(v),h=0,m=0,date;if(d)
{if(typeof d[5]!='undefined')h=d[5];if(typeof d[6]!='undefined')m=d[6];switch(this.dformat)
{case'yyyy/dd/mm':date=new Date(d[1],(d[3]*1-1),d[2],h,m,0,0);break;case'yyyy/mm/dd':date=new Date(d[1],(d[2]*1-1),d[3],h,m,0,0);break;case'dd/mm/yyyy':date=new Date(d[3],(d[2]*1-1),d[1],h,m,0,0);break;case'mm/dd/yyyy':date=new Date(d[3],(d[1]*1-1),d[2],h,m,0,0);break;}
if(this.showTimepicker)
{return date.valueOf()/86400000;}
else
{return Math.ceil(date.valueOf()/86400000);}}}
return 0;},setVal:function(v)
{try
{$('[name="'+this.name+'"]').val(v);if(v.length)
{v=v.replace(/\s+/g,' ').split(' ');this.defaultDate=v[0];this.setDefaultDate();if(v.length==2)
{this.defaultTime=v[1];this.setDefaultTime();}}}catch(err){}}});$.fbuilder.controls['ftextarea']=function(){};$.extend($.fbuilder.controls['ftextarea'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Untitled",ftype:"ftextarea",predefined:"",predefinedClick:false,required:false,size:"medium",minlength:"",maxlength:"",rows:4,show:function()
{return'<div class="fields '+this.csslayout+' cff-textarea-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><textarea '+((!/^\s*$/.test(this.rows))?'rows='+this.rows:'')+' id="'+this.name+'" name="'+this.name+'" minlength="'+(this.minlength)+'" maxlength="'+$.fbuilder.htmlEncode(this.maxlength)+'" class="field '+this.size+((this.required)?" required":"")+'">'+((!this.predefinedClick)?this.predefined:'')+'</textarea><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');if(e.length)return $.fbuilder.parseValStr(e.val().replace(/[\n\r]+/g,' '));return 0;}});$.fbuilder.controls['fcheck']=function(){};$.extend($.fbuilder.controls['fcheck'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Check All That Apply",ftype:"fcheck",layout:"one_column",required:false,toSubmit:"text",showDep:false,show:function()
{this.choicesVal=((typeof(this.choicesVal)!="undefined"&&this.choicesVal!==null)?this.choicesVal:this.choices);var str="",classDep;if(typeof this.choicesDep=="undefined"||this.choicesDep==null)
this.choicesDep=new Array();for(var i=0,h=this.choices.length;i<h;i++)
{if(typeof this.choicesDep[i]!='undefined')
this.choicesDep[i]=$.grep(this.choicesDep[i],function(n){return n!="";});else
this.choicesDep[i]=[];classDep=(this.choicesDep[i].length)?'depItem':'';str+='<div class="'+this.layout+'"><label><input name="'+this.name+'[]" id="'+this.name+'" class="field '+classDep+' group '+((this.required)?" required":"")+'" value="'+$.fbuilder.htmlEncode(this.choicesVal[i])+'" vt="'+$.fbuilder.htmlEncode((this.toSubmit=='text')?this.choices[i]:this.choicesVal[i])+'" type="checkbox" '+((this.choiceSelected[i])?"checked":"")+'/> <span>'+$.fbuilder.htmlDecode(this.choices[i])+'</span></label></div>';}
return'<div class="fields '+this.csslayout+' cff-checkbox-field" id="field'+this.form_identifier+'-'+this.index+'"><label>'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield">'+str+'<span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},showHideDep:function(toShow,toHide,hiddenByContainer)
{var me=this,item=$('[id="'+me.name+'"]'),form_identifier=me.form_identifier,isHidden=(typeof toHide[me.name]!='undefined'||typeof hiddenByContainer[me.name]!='undefined'),result=[];try
{item.each(function(i,e){if(typeof me.choicesDep[i]!='undefined'&&me.choicesDep[i].length)
{var checked=e.checked;for(var j=0,k=me.choicesDep[i].length;j<k;j++)
{var dep=me.choicesDep[i][j]+form_identifier;if(isHidden||!checked)
{if(typeof toShow[dep]!='undefined')
{delete toShow[dep]['ref'][me.name+'_'+i];if($.isEmptyObject(toShow[dep]['ref']))
delete toShow[dep];}}
if(checked&&!isHidden)
{if(typeof toShow[dep]=='undefined')
{$('#'+dep).closest('.fields').show();$('[id*="'+dep+'"].ignore').removeClass('ignore');toShow[dep]={'ref':{}};}
toShow[dep]['ref'][me.name+'_'+i]=1;if(typeof toHide[dep]!='undefined')
{result.push(dep);delete toHide[dep];}}
else
{if(typeof toShow[dep]=='undefined')
{$('#'+dep).closest('.fields').hide();$('[id*="'+dep+'"]:not(.ignore)').addClass('ignore');if(typeof toHide[dep]=='undefined')result.push(dep);toHide[dep]={};}}}}});}
catch(e){}
return result;},val:function()
{var e=$('[id="'+this.name+'"]:checked:not(.ignore)'),v,me=this;if(e.length)
{e.each(function(){var t=$.fbuilder.parseVal(this.value);if(!$.isNumeric(t))t=t.replace(/^"/,'').replace(/"$/,'');v=(v)?v+t:t;});}
return(v)?(($.isNumeric(v))?v:'"'+v+'"'):0;},setVal:function(v)
{var t,n=this.name;if(!$.isArray(v))v=[v];$('[id="'+n+'"]').prop('checked',false);for(var i in v)
{t=(new String(v[i])).replace(/(['"])/g,"\\$1");$('[id="'+n+'"][vt="'+t+'"],[id="'+n+'"][value="'+t+'"]').prop('checked',true);}
$('[id="'+n+'"]').change();}});$.fbuilder.controls['fradio']=function(){};$.extend($.fbuilder.controls['fradio'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Select a Choice",ftype:"fradio",layout:"one_column",required:false,toSubmit:"text",choiceSelected:"",showDep:false,show:function()
{this.choicesVal=((typeof(this.choicesVal)!="undefined"&&this.choicesVal!==null)?this.choicesVal:this.choices);var l=this.choices.length,str="",classDep="";if(typeof this.choicesDep=="undefined"||this.choicesDep==null)
this.choicesDep=new Array();for(var i=0;i<l;i++)
{if(typeof this.choicesDep[i]!='undefined')
this.choicesDep[i]=$.grep(this.choicesDep[i],function(n){return n!="";});else
this.choicesDep[i]=[];if(this.choicesDep[i].length)
classDep='depItem';}
for(var i=0;i<l;i++)
{str+='<div class="'+this.layout+' cff-radiobutton-field"><label><input name="'+this.name+'" id="'+this.name+'" class="field '+classDep+' group '+((this.required)?" required":"")+'" value="'+$.fbuilder.htmlEncode(this.choicesVal[i])+'" vt="'+$.fbuilder.htmlEncode((this.toSubmit=='text')?this.choices[i]:this.choicesVal[i])+'" type="radio" '+((this.choices[i]+' - '+this.choicesVal[i]==this.choiceSelected)?"checked":"")+'/> <span>'+$.fbuilder.htmlDecode(this.choices[i])+'</span></label></div>';}
return'<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label>'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield">'+str+'<span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},showHideDep:function(toShow,toHide,hiddenByContainer)
{var me=this,item=$('[id="'+me.name+'"]'),form_identifier=me.form_identifier,isHidden=(typeof toHide[me.name]!='undefined'||typeof hiddenByContainer[me.name]!='undefined'),result=[];try
{item.each(function(i,e){if(typeof me.choicesDep[i]!='undefined'&&me.choicesDep[i].length)
{var checked=e.checked;for(var j=0,k=me.choicesDep[i].length;j<k;j++)
{var dep=me.choicesDep[i][j]+form_identifier;if(isHidden||!checked)
{if(typeof toShow[dep]!='undefined')
{delete toShow[dep]['ref'][me.name+'_'+i];if($.isEmptyObject(toShow[dep]['ref']))
delete toShow[dep];}}
if(checked&&!isHidden)
{if(typeof toShow[dep]=='undefined')
{$('#'+dep).closest('.fields').show();$('[id*="'+dep+'"].ignore').removeClass('ignore');toShow[dep]={'ref':{}};}
toShow[dep]['ref'][me.name+'_'+i]=1;if(typeof toHide[dep]!='undefined')
{result.push(dep);delete toHide[dep];}}
else
{if(typeof toShow[dep]=='undefined')
{$('#'+dep).closest('.fields').hide();$('[id*="'+dep+'"]:not(.ignore)').addClass('ignore');if(typeof toHide[dep]=='undefined')result.push(dep);toHide[dep]={};}}}}});}
catch(e){}
return result;},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore):checked');if(e.length)return $.fbuilder.parseValStr(e.val());return 0;},setVal:function(v)
{var t=(new String(v)).replace(/(['"])/g,"\\$1"),n=this.name;$('[id="'+n+'"]').prop('checked',false);$('[id="'+n+'"][vt="'+t+'"],[id="'+n+'"][value="'+t+'"]').prop('checked',true);$('[id="'+n+'"]').change();}});$.fbuilder.controls['fdropdown']=function(){};$.extend($.fbuilder.controls['fdropdown'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Select a Choice",ftype:"fdropdown",size:"medium",required:false,toSubmit:"text",choiceSelected:"",showDep:false,show:function()
{this.choicesVal=((typeof(this.choicesVal)!="undefined"&&this.choicesVal!==null)?this.choicesVal:this.choices)
var c=this.choices,cv=this.choicesVal,l=c.length,classDep='',str='';if(typeof this.choicesDep=="undefined"||this.choicesDep==null)
this.choicesDep=new Array();for(var i=0;i<l;i++)
{if(typeof this.choicesDep[i]!='undefined')
this.choicesDep[i]=$.grep(this.choicesDep[i],function(n){return n!="";});else
this.choicesDep[i]=[];if(this.choicesDep[i].length)
classDep='depItem';}
for(var i=0;i<l;i++)
{str+='<option '+((this.choiceSelected==c[i]+' - '+cv[i])?"selected":"")+' '+((classDep!='')?'class="'+classDep+'"':'')+' value="'+$.fbuilder.htmlEncode(cv[i])+'" vt="'+$.fbuilder.htmlEncode((this.toSubmit=='text')?c[i]:cv[i])+'" >'+c[i]+'</option>';}
return'<div class="fields '+this.csslayout+' cff-dropdown-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><select id="'+this.name+'" name="'+this.name+'" class="field '+((classDep!='')?' depItemSel ':'')+this.size+((this.required)?" required":"")+'" >'+str+'</select><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div><div class="clearer"></div></div>';},showHideDep:function(toShow,toHide,hiddenByContainer)
{var me=this,item=$('#'+me.name+'.depItemSel'),form_identifier=me.form_identifier,isHidden=(typeof toHide[me.name]!='undefined'||typeof hiddenByContainer[me.name]!='undefined'),result=[];try
{if(item.length)
{var selected=item[0].selectedIndex;for(var i=0,h=me.choices.length;i<h;i++)
{if(typeof me.choicesDep[i]!='undefined'&&me.choicesDep[i].length)
{for(var j=0,k=me.choicesDep[i].length;j<k;j++)
{var dep=me.choicesDep[i][j]+form_identifier;if(isHidden||selected!=i)
{if(typeof toShow[dep]!='undefined')
{delete toShow[dep]['ref'][me.name+'_'+i];if($.isEmptyObject(toShow[dep]['ref']))
delete toShow[dep];}}
if(selected==i&&!isHidden)
{if(typeof toShow[dep]=='undefined')
{$('#'+dep).closest('.fields').show();$('[id*="'+dep+'"].ignore').removeClass('ignore');toShow[dep]={'ref':{}};}
toShow[dep]['ref'][me.name+'_'+i]=1;if(typeof toHide[dep]!='undefined')
{result.push(dep);delete toHide[dep];}}
else
{if(typeof toShow[dep]=='undefined')
{$('#'+dep).closest('.fields').hide();$('[id*="'+dep+'"]:not(.ignore)').addClass('ignore');if(typeof toHide[dep]=='undefined')result.push(dep);toHide[dep]={};}}}}}}}
catch(e){}
return result;},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');if(e.length)return $.fbuilder.parseValStr(e.val());return 0;},setVal:function(v)
{var t=(new String(v)).replace(/(['"])/g,"\\$1"),n=this.name;$('[id="'+n+'"] OPTION[vt="'+t+'"],[id="'+n+'"] OPTION[value="'+t+'"]').prop('selected',true);$('[id="'+n+'"]').change();}});$.fbuilder.controls['ffile']=function(){};$.extend($.fbuilder.controls['ffile'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Untitled",ftype:"ffile",required:false,size:"medium",accept:"",upload_size:"",multiple:false,show:function()
{return'<div class="fields '+this.csslayout+' cff-file-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input type="file" id="'+this.name+'" name="'+this.name+'[]" accept="'+this.accept+'" upload_size="'+this.upload_size+'" class="field '+this.size+((this.required)?" required":"")+'" '+((this.multiple)?'multiple':'')+' /><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},after_show:function()
{var me=this;$.validator.addMethod("accept",function(value,element,param)
{if(this.optional(element))return true;else{param=typeof param==="string"?param.replace(/,/g,'|'):"png|jpe?g|gif";var regExpObj=new RegExp(".("+param+")$","i");for(var i=0,h=element.files.length;i<h;i++)
if(!element.files[i].name.match(regExpObj))return false;return true;}});$.validator.addMethod("upload_size",function(value,element,params)
{if(this.optional(element))return true;else{var total=0;for(var i=0,h=element.files.length;i<h;i++)
total+=element.files[i].size/1024;return(total<=params);}});$('#'+me.name).change(function(){$(this).siblings('span.files-list').remove();if(this.files.length>1)
{var filesList=[];for(var i=0,h=this.files.length;i<h;i++)
filesList.push(this.files[i].name)
$(this).after('<span class="files-list">'+filesList.join(', ')+'</span>');}});}});$.fbuilder.controls['fpassword']=function(){};$.extend($.fbuilder.controls['fpassword'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Untitled",ftype:"fpassword",predefined:"",predefinedClick:false,required:false,size:"medium",minlength:"",maxlength:"",equalTo:"",show:function()
{return'<div class="fields '+this.csslayout+' cff-password-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" minlength="'+(this.minlength)+'" maxlength="'+$.fbuilder.htmlEncode(this.maxlength)+'" '+((this.equalTo!="")?"equalTo=\"#"+$.fbuilder.htmlEncode(this.equalTo+this.form_identifier)+"\"":"")+' class="field '+this.size+((this.required)?" required":"")+'" type="password" value="'+$.fbuilder.htmlEncode(this.predefined)+'"/><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');if(e.length)return $.fbuilder.parseValStr(e.val());return 0;}});$.fbuilder.controls['fPhone']=function(){};$.extend($.fbuilder.controls['fPhone'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Phone",ftype:"fPhone",required:false,dformat:"### ### ####",predefined:"888 888 8888",show:function()
{var me=this,str="",tmp=this.dformat.split(' '),tmpv=this.predefined.split(' '),attr=(typeof this.predefinedClick!='undefined'&&this.predefinedClick)?'placeholder':'value';for(var i=0;i<tmpv.length;i++)
{if($.trim(tmpv[i])=="")
{tmpv.splice(i,1);}}
for(var i=0;i<tmp.length;i++)
{if($.trim(tmp[i])!="")
{str+='<div class="uh_phone" ><input type="text" id="'+this.name+'_'+i+'" name="'+this.name+'_'+i+'" class="field digits '+((this.required)?" required":"")+'" size="'+$.trim(tmp[i]).length+'" '+attr+'="'+((tmpv[i])?tmpv[i]:"")+'" maxlength="'+$.trim(tmp[i]).length+'" minlength="'+$.trim(tmp[i]).length+'"/><div class="l">'+$.trim(tmp[i])+'</div></div>';}}
return'<div class="fields '+this.csslayout+' cff-phone-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input type="hidden" id="'+this.name+'" name="'+this.name+'" class="field " />'+str+'<span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';},after_show:function()
{var me=this,tmp=me.dformat.split(' ');for(var i=0,h=tmp.length;i<h;i++)
{$('#'+me.name+'_'+i).bind('change',function(){var v='';for(var i=0;i<tmp.length;i++)
{v+=$('#'+me.name+'_'+i).val();}
$('#'+me.name).val(v).change();});if(i+1<h)
{$('#'+me.name+'_'+i).bind('keyup',{'next':i+1},function(evt){var e=$(this);if(e.val().length==e.attr('maxlength'))
{e.change();$('#'+me.name+'_'+evt.data.next).focus();}});}}},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');if(e.length)return $.fbuilder.parseValStr(e.val());return 0;},setVal:function(v)
{$('[name="'+this.name+'"]').val(v);v=$.trim(v).replace(/[^\d]/g,' ').split(' ');for(var i in v)$('[id="'+this.name+'_'+i+'"]').val(v[i]);}});$.fbuilder.controls['fCommentArea']=function(){};$.extend($.fbuilder.controls['fCommentArea'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Comments here",ftype:"fCommentArea",userhelp:"A description of the section goes here.",show:function()
{return'<div class="fields '+this.csslayout+' comment_area" id="field'+this.form_identifier+'-'+this.index+'"><label id="'+this.name+'">'+this.title+'</label><span class="uh">'+this.userhelp+'</span><div class="clearer"></div></div>';}});$.fbuilder.controls['fhidden']=function(){};$.extend($.fbuilder.controls['fhidden'].prototype,$.fbuilder.controls['ffields'].prototype,{ftype:"fhidden",title:"",predefined:"",show:function()
{return'<div class="fields '+this.csslayout+' cff-hidden-field" id="field'+this.form_identifier+'-'+this.index+'" style="padding:0;margin:0;border:0;width:0;height:0;overflow:hidden;"><label for="'+this.name+'">'+this.title+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" type="hidden" value="'+$.fbuilder.htmlEncode(this.predefined)+'" class="field" /></div></div>';}});$.fbuilder.controls['fSectionBreak']=function(){};$.extend($.fbuilder.controls['fSectionBreak'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Section Break",ftype:"fSectionBreak",userhelp:"A description of the section goes here.",show:function()
{return'<div class="fields '+this.csslayout+' section_breaks" id="field'+this.form_identifier+'-'+this.index+'"><div class="section_break" id="'+this.name+'" ></div><label>'+this.title+'</label><span class="uh">'+this.userhelp+'</span><div class="clearer"></div></div>';}});$.fbuilder.controls['fPageBreak']=function(){};$.extend($.fbuilder.controls['fPageBreak'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Page Break",ftype:"fPageBreak",show:function()
{return'<div class="fields '+this.csslayout+' section_breaks" id="field'+this.form_identifier+'-'+this.index+'"><div class="section_break" id="'+this.name+'" ></div><label>'+this.title+'</label><span class="uh">'+this.userhelp+'</span><div class="clearer"></div></div>';}});$.fbuilder.controls['fsummary']=function(){};$.extend($.fbuilder.controls['fsummary'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Summary",ftype:"fsummary",fields:"",titleClassname:"summary-field-title",valueClassname:"summary-field-value",fieldsArray:[],show:function()
{var me=this,p=$.trim(me.fields.replace(/\,+/g,',')).split(','),l=p.length;if(l)
{var str='<div class="fields '+me.csslayout+' cff-summary-field" id="field'+me.form_identifier+'-'+me.index+'">'+((!/^\s*$/.test(me.title))?'<h2>'+me.title+'</h2>':'')+'<div id="'+me.name+'">';for(var i=0;i<l;i++)
{if(!/^\s*$/.test(p[i]))
{p[i]=$.trim(p[i]);str+='<div ref="'+p[i]+me.form_identifier+'" class="cff-summary-item"><span class="'+me.titleClassname+' cff-summary-title"></span><span class="'+me.valueClassname+' cff-summary-value"></span></div>';}}
str+='</div></div>';return str;}},after_show:function(){var me=this,p=$.trim(me.fields.replace(/\,+/g,',')).split(','),l=p.length;if(l)
{for(var i=0;i<l;i++)
{if(!/^\s*$/.test(p[i]))
{p[i]=$.trim(p[i]);me.fieldsArray.push(p[i]+me.form_identifier);$(document).on('change','#'+p[i]+me.form_identifier,function(){me.update();});}}
$(document).on('showHideDepEvent',function(evt,form_identifier)
{me.update();});$('#cp_calculatedfieldsf_pform'+me.form_identifier).bind('reset',function(){setTimeout(function(){me.update();},10);});}},update:function()
{for(var j=0,k=this.fieldsArray.length;j<k;j++)
{var i=this.fieldsArray[j],e=$('[id="'+i+'"]'),tt=$('[ref="'+i+'"]');if(e.length&&tt.length)
{var t=$('#'+i).closest('.fields').find('label:first').text(),v=[];e.each(function(){var e=$(this);if(/(checkbox|radio)/i.test(e.attr('type'))&&!e.is(':checked'))
{return;}
else if(e[0].tagName=='SELECT')
{v.push($(e[0].options[e[0].selectedIndex]).attr('vt'));}
else
{if(e.attr('vt'))
{v.push(e.attr('vt'));}
else
{var c=$('[id="'+i+'_caption"]');v.push((c.length&&!/^\s*$/.test(c.html()))?c.html():e.val());}}});tt.find('.cff-summary-title').html((/^\s*$/.test(t))?'':t);tt.find('.cff-summary-value').html(v.join(', '));if(e.hasClass('ignore'))
{tt.hide();}
else
{tt.show();}}}}});$.fbuilder.controls['fcontainer']=function(){};$.fbuilder.controls['fcontainer'].prototype={fields:[],columns:1,after_show:function()
{var e=$('#'+this.name),f;for(var i=0,h=this.fields.length;i<h;i++)
{f=$('#'+this.fields[i]+this.form_identifier).closest('.fields').detach();if(this.columns>1)
{f.addClass('column'+this.columns);if(i%this.columns==0)f.css('clear','left');}
f.appendTo(e);}},showHideDep:function(toShow,toHide,hiddenByContainer)
{var me=this,isHidden=(typeof toHide[me.name]!='undefined'||typeof hiddenByContainer[me.name]!='undefined'),fId,result=[];for(var i=0,h=me.fields.length;i<h;i++)
{fId=me.fields[i]+me.form_identifier;if(isHidden)
{if(typeof hiddenByContainer[fId]=='undefined')hiddenByContainer[fId]={};if(typeof hiddenByContainer[fId][me.name]=='undefined')
{hiddenByContainer[fId][me.name]={};if(typeof toHide[fId]=='undefined')
{$('#'+fId).closest('.fields').hide();$('[id*="'+fId+'"]:not(.ignore)').addClass('ignore');result.push(fId);}}}
else
{if(typeof hiddenByContainer[fId]!='undefined')
{delete hiddenByContainer[fId][me.name];if($.isEmptyObject(hiddenByContainer[fId]))
{delete hiddenByContainer[fId];if(typeof toHide[fId]=='undefined')
{$('#'+fId).closest('.fields').show();$('[id*="'+fId+'"].ignore').removeClass('ignore');result.push(fId);}}}}}
return result;}};$.fbuilder.controls['ffieldset']=function(){};$.extend($.fbuilder.controls['ffieldset'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Untitled",ftype:"ffieldset",fields:[],columns:1,show:function()
{return'<div class="fields '+this.csslayout+' cff-container-field" id="field'+this.form_identifier+'-'+this.index+'"><FIELDSET id="'+this.name+'">'+((!/^\s*$/.test(this.title))?'<LEGEND>'+this.title+'</LEGEND>':'')+'</FIELDSET><div class="clearer"></div></div>';},after_show:function()
{$.fbuilder.controls['fcontainer'].prototype.after_show.call(this);},showHideDep:function(toShow,toHide,hiddenByContainer)
{return $.fbuilder.controls['fcontainer'].prototype.showHideDep.call(this,toShow,toHide,hiddenByContainer);}});$.fbuilder.controls['fdiv']=function(){};$.extend($.fbuilder.controls['fdiv'].prototype,$.fbuilder.controls['ffields'].prototype,{ftype:"fdiv",fields:[],columns:1,show:function()
{return'<div class="fields '+this.csslayout+' cff-container-field" id="field'+this.form_identifier+'-'+this.index+'"><div id="'+this.name+'"></div><div class="clearer"></div></div>';},after_show:function()
{$.fbuilder.controls['fcontainer'].prototype.after_show.call(this);},showHideDep:function(toShow,toHide,hiddenByContainer)
{return $.fbuilder.controls['fcontainer'].prototype.showHideDep.call(this,toShow,toHide,hiddenByContainer);}});$.fbuilder.controls['fMedia']=function(){};$.extend($.fbuilder.controls['fMedia'].prototype,$.fbuilder.controls['ffields'].prototype,{ftype:"fMedia",sMediaType:"image",data:{image:{sWidth:"",sHeight:"",sSrc:"",sAlt:"",sLink:"",sTarget:"",sFigcaption:""},audio:{sWidth:"",sSrc:"",sSrcAlt:"",sControls:1,sLoop:0,sAutoplay:0,sMuted:0,sPreload:"auto",sFallback:"",sFigcaption:""},video:{sWidth:"",sHeight:"",sSrc:"",sSrcAlt:"",sPoster:"",sControls:1,sLoop:0,sAutoplay:0,sMuted:0,sPreload:"auto",sFallback:"",sFigcaption:""}},_show_image:function()
{var d=this.data.image,esc=$.fbuilder.htmlEncode,a=[],l=[],r='';if($.trim(d.sWidth))a.push('width="'+esc(d.sWidth)+'"');if($.trim(d.sHeight))a.push('height="'+esc(d.sHeight)+'"');if($.trim(d.sSrc))a.push('src="'+esc(d.sSrc)+'"');if($.trim(d.sAlt))a.push('alt="'+esc(d.sAlt)+'"');if($.trim(d.sLink))
{l.push('href="'+esc(d.sLink)+'"');if($.trim(d.sTarget))l.push('target="'+esc(d.sTarget)+'"');r='<a '+l.join(' ')+' ><img '+a.join(' ')+' /></a>';}
else
{r='<img '+a.join(' ')+' />';}
return r;},_show_audio_video:function(d,isV)
{var esc=$.fbuilder.htmlEncode,a=[],t=(isV)?'video':'audio';if($.trim(d.sWidth))a.push('width="'+esc(d.sWidth)+'"');if(isV&&$.trim(d.sHeight))a.push('height="'+esc(d.sHeight)+'"');if(isV&&$.trim(d.sPoster))a.push('poster="'+esc(d.sPoster)+'"');if($.trim(d.sSrc))a.push('src="'+esc(d.sSrc)+'"');if(d.sAutoplay)a.push('autoplay');if(d.sControls)a.push('controls');if(d.sLoop)a.push('loop');if(d.sMuted)a.push('muted');a.push('preload="'+esc(d.sPreload)+'"');return'<'+t+' '+a.join(' ')+'>'+(($.trim(d.sSrcAlt))?'<source src="'+esc(d.sSrcAlt)+'" />':'')+'<p>'+d.sFallback+'</p></'+t+'>';},_show_audio:function()
{return this._show_audio_video(this.data.audio,false);},_show_video:function()
{return this._show_audio_video(this.data.video,true);},show:function()
{return'<div class="fields '+this.csslayout+' cff-media-field" id="field'+this.form_identifier+'-'+this.index+'"><div class="clearer"><div class="field" id="'+this.name+'">'+this['_show_'+this.sMediaType]()+'</div></div><span class="uh">'+this.data[this.sMediaType].sFigcaption+'</span><div class="clearer"></div></div>';}});$.fbuilder.controls['fButton']=function(){};$.extend($.fbuilder.controls['fButton'].prototype,$.fbuilder.controls['ffields'].prototype,{ftype:"fButton",sType:"button",sValue:"button",sOnclick:"",userhelp:"A description of the section goes here.",show:function()
{var esc=function(v){v=v.replace(/&lt/g,'&amp;').replace(/"/g,"&quot;").replace(/\n+/g,' ');return v;},type=this.sType,clss='';if(this.sType=='calculate')
{type='button';clss='calculate-button';}
else if(this.sType=='reset')
{clss='reset-button';}
return'<div class="fields '+this.csslayout+' cff-button-field" id="field'+this.form_identifier+'-'+this.index+'"><input id="'+this.name+'" type="'+type+'" value="'+esc(this.sValue)+'" class="field '+clss+'" onclick="'+esc(this.sOnclick)+'" /><span class="uh">'+this.userhelp+'</span><div class="clearer"></div></div>';},after_show:function()
{$('#'+this.name).click(function()
{var e=$(this);if(e.hasClass('calculate-button'))
{var suffix=e.attr('id').match(/_\d+$/)[0],items=$.fbuilder['forms'][suffix].getItems();$.fbuilder['calculator'].defaultCalc('#'+e.closest('form').attr('id'));for(var i=0,h=items.length;i<h;i++)
{if(items[i].ftype=='fsummary')
{items[i].update();}}}
if(e.hasClass('reset-button'))
{setTimeout(function()
{var identifier=e.closest('form').attr('id').replace(/cp_calculatedfieldsf_pform/,'');$.fbuilder['showHideDep']({'formIdentifier':identifier});var page=parseInt(e.closest('.pbreak').attr('page'));if(page)
{$("#fieldlist"+identifier+" .pbreak").css("display","none");$("#fieldlist"+identifier+" .pbreak").find(".field").addClass("ignorepb");$("#fieldlist"+identifier+" .pb0").css("display","block");if($("#fieldlist"+identifier+" .pb0").find(".field").length>0)
{$("#fieldlist"+identifier+" .pb0").find(".field").removeClass("ignorepb");try
{$("#fieldlist"+identifier+" .pb0").find(".field")[0].focus();}
catch(e){}}}},50);}});}});$.fbuilder.controls['fhtml']=function(){};$.extend($.fbuilder.controls['fhtml'].prototype,$.fbuilder.controls['ffields'].prototype,{ftype:"fhtml",fcontent:"",show:function()
{return'<div class="fields '+this.csslayout+' cff-html-field" id="field'+this.form_identifier+'-'+this.index+'"><div id="'+this.name+'" class="dfield">'+$('<div/>').html(this.fcontent).html()+'</div><div class="clearer"></div></div>';}});$.fbuilder.controls['fCalculated']=function(){};$.extend($.fbuilder.controls['fCalculated'].prototype,$.fbuilder.controls['ffields'].prototype,{title:"Untitled",ftype:"fCalculated",predefined:"",required:false,size:"medium",eq:"",suffix:"",prefix:"",decimalsymbol:".",groupingsymbol:"",dependencies:[{'rule':'','complex':false,'fields':['']}],readonly:true,hidefield:false,show:function()
{return'<div class="fields '+this.csslayout+' cff-calculated-field" id="field'+this.form_identifier+'-'+this.index+'" style="'+((this.hidefield)?'padding:0;margin:0;border:0;opacity:0;width:0;height:0;overflow:hidden;':'')+'"><label>'+this.title+''+((this.required)?'<span class="r">*</span>':'')+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" '+((this.readonly)?' readonly ':'')+' class="codepeoplecalculatedfield field '+this.size+((this.required)?" required":"")+'" type="'+((this.hidefield)?'hidden':'text')+'" value="'+this.predefined+'"/>'+((!this.hidefield)?'<span class="uh">'+this.userhelp+'</span>':'')+'</div><div class="clearer"></div></div>';},after_show:function()
{var me=this,configuration={"suffix":me.suffix,"prefix":me.prefix,"groupingsymbol":me.groupingsymbol,"decimalsymbol":me.decimalsymbol},dependencies=[];$.each(me.dependencies,function(i,d)
{d.rule=d.rule.replace(/^\s+/,'').replace(/\s+$/,'');if(d.rule!=''&&d.fields.length){var fields=[];$.each(d.fields,function(j,f){if(f!='')
{fields.push(f);}});if(fields.length){dependencies.push({'rule':d.rule,'fields':fields});}}});me.dependencies=dependencies;var eq=me.eq;eq=eq.replace(/\n/g,' ').replace(/fieldname(\d+)/g,"fieldname$1"+me.form_identifier).replace(/form_identifier/g,'\''+this['form_identifier']+'\'').replace(/;\s*\)/g,')').replace(/;\s*$/,'');if(!/^\s*$/.test(eq))
{$.fbuilder.calculator.addEquation(me.name,eq,configuration,dependencies,me.form_identifier);}
var e=$('[id="'+me.name+'"]');e.bind('calcualtedfield_changed',{obj:me},function(evt){if($.fbuilder['calculator'].getDepList(evt.data.obj.name,evt.data.obj.val(),evt.data.obj.dependencies))
{$.fbuilder.showHideDep({'formIdentifier':evt.data.obj.form_identifier,'fieldIdentifier':evt.data.obj.name,'throwEvent':false});}});},showHideDep:function(toShow,toHide,hiddenByContainer)
{var me=this,result=[];if($.fbuilder['calculator'].getDepList(me.name,me.val(),me.dependencies))
{var item=$('#'+me.name),identifier=me.form_identifier,isHidden=(typeof toHide[me.name]!='undefined'||typeof hiddenByContainer[me.name]!='undefined'),d,dep,clearRef=function(id){if(typeof toShow[id]!='undefined')
{delete toShow[id]['ref'][me.name];if($.isEmptyObject(toShow[id]['ref']))
delete toShow[id];}},hideField=function(id){$('#'+id).closest('.fields').hide();$('[id*="'+id+'"]:not(.ignore)').addClass('ignore');toHide[id]={};};try
{d=item.attr('dep');if(typeof d!='undefined'&&!/^\s*$/.test(d))
{d=d.split(',');for(i=0;i<d.length;i++)
{dep=d[i]+identifier;if(isHidden)clearRef(dep);if(typeof toShow[dep]=='undefined')
{if(!isHidden)
{$('#'+dep).closest('.fields').show();$('[id*="'+dep+'"].ignore').removeClass('ignore');toShow[dep]={'ref':{}};toShow[dep]['ref'][me.name]=1;if(typeof toHide[dep]!='undefined')
{result.push(dep);delete toHide[dep];}}
else if(typeof toHide[dep]=='undefined')
{hideField(dep);result.push(dep);}}}}
d=item.attr('notdep');if(typeof d!='undefined'&&!/^\s*$/.test(d))
{d=d.split(',');for(i=0;i<d.length;i++)
{dep=d[i]+identifier;clearRef(dep);if(typeof toShow[dep]=='undefined'&&typeof toHide[dep]=='undefined')
{hideField(dep);result.push(dep);}}}}
catch(e){}}
return result;},val:function()
{var e=$('[id="'+this.name+'"]:not(.ignore)');if(e.length)
{var v=$.trim(e.val());v=v.replace(new RegExp($.fbuilder['escape_symbol'](this.prefix),'g'),'').replace(new RegExp($.fbuilder['escape_symbol'](this.suffix),'g'),'');return $.fbuilder.parseVal(v,this.groupingsymbol,this.decimalsymbol);}
return 0;}});$.fbuilder['extend_window']=function(prefix,obj)
{for(method in obj)
{window[prefix+method]=(function(m)
{return function()
{return m.obj[m.method_name].apply(m.obj,arguments);};})({"method_name":method,'obj':obj});}};$.fbuilder['calculator']=(function()
{var validators=[];if(typeof $.fbuilder['modules']!='undefined')
{var modules=$.fbuilder['modules'];for(var module in modules)
{if(typeof modules[module]['callback']!='undefined')
{modules[module]['callback']();}
if(typeof modules[module]['validator']!='undefined')
{validators.push(modules[module]['validator']);}}}
_validate_result=function(v)
{if(validators.length)
{var h=validators.length;while(h--)
{if(validators[h](v))
{return true;}}}
else
{return true;}
return false;};_calculate=function(eq,suffix,__ME__)
{var _match,field_regexp=new RegExp('(fieldname\\d+'+suffix+')([\\D\\b])'),__ME__=(__ME__)?$.fbuilder['forms'][suffix].getItem(__ME__).val():'';eq='('+eq+')';while(_match=field_regexp.exec(eq))
{var field=$.fbuilder['forms'][suffix].getItem(_match[1]),v='';if(field)
{v=field.val();if($.isNumeric(v))v='('+v+')';else if(typeof v=='object'&&typeof window.JSON!='undefined')v=JSON.stringify(v);}
eq=eq.replace(_match[0],v+''+_match[2]);}
try
{var r=eval(eq.replace(/^\(/,'').replace(/\)$/,'').replace(/\b__ME__\b/g,__ME__));return(typeof r!='undefined'&&_validate_result(r))?r:false;}
catch(e)
{return false;}};_checkValueThrowingEquation=function(t)
{if(typeof t.attr('data-timeout')!='undefined')clearTimeout(t.attr('data-timeout'));if(typeof t.attr('data-previousvalue')=='undefined')t.attr('data-previousvalue',t.val());else
{if(t.val()==t.attr('data-previousvalue'))
{t.removeAttr('data-timeout');obj.Calculate(t[0]);return;}
t.attr('data-previousvalue',t.val());}
t.attr('data-timeout',setTimeout(_checkValueThrowingEquation,500,t));};var CalcFieldClss=function(){};CalcFieldClss.prototype={processing_queue:false,queued_equations:{},addEquation:function(calculated_field,equation,configuration,dependencies,form_identifier)
{var equation_result=$('[id="'+calculated_field+'"]');if(equation_result.length)
{var form=equation_result[0].form,equationObj,field,regexp=new RegExp('(fieldname\\d+)_'),match;if(typeof form.equations=='undefined')form['equations']=[];var i,j=-1,h=form.equations.length;for(i=0;i<h;i++)
{if(form.equations[i].result==calculated_field)break;if(form.equations[i].equation.match(calculated_field)){j=i;break;}}
if(i==h||j!=-1)
{equationObj={'result':calculated_field,'equation':equation,'conf':configuration,'dep':dependencies,'identifier':form_identifier};form.equations.splice(i,0,equationObj);while(match=regexp.exec(equation))
{field=$.fbuilder['forms'][form_identifier].getItem(match[1]+form_identifier);if(field)
{if(typeof field.usedInEquations=='undefined')field.usedInEquations=[];field.usedInEquations.push(equationObj);}
equation=equation.replace(new RegExp(match[0],'g'),'');}}}},enqueueEquation:function(form_identifier,equations)
{if(typeof this.queued_equations[form_identifier]=='undefined')
this.queued_equations[form_identifier]=[];var queue=this.queued_equations[form_identifier],f;for(var i=0,h=equations.length;i<h;i++)
{f=-1;for(var j=0,k=queue.length;j<k;j++)
{if(queue[j].result==equations[i].result)break;if(queue[j].equation.match(equations[i].result)){f=j;break;}}
if(j==k||f!=-1)
{queue.splice(j,0,equations[i]);}}},getDepList:function(calculated_field,value,dependencies)
{var list=[],list_h=[];if(value!==false&&dependencies.length)
{for(var i=0,h=dependencies.length;i<h;i++)
{try
{var rule=eval(dependencies[i].rule.replace(/value/gi,value));$.each(dependencies[i].fields,function(j,e)
{if(e!='')
{if(rule)
{var k=$.inArray(e,list_h);if(k!=-1)list_h.splice(k,1);if($.inArray(e,list)==-1)list.push(e);}
else
{if($.inArray(e,list)==-1)list_h.push(e);}}});}
catch(e)
{continue;}}}
$('[id="'+calculated_field+'"]').attr('dep',list.join(',')).attr('notdep',list_h.join(','));return list.length||list_h.length;},defaultCalc:function(form_identifier,recalculate)
{var form=$(form_identifier),fSec=form_identifier.match(/_\d+$/)[0],dep=false;if(form.length)
{if(typeof form[0].equations!='undefined')
{this.queued_equations[fSec]=form[0].equations.slice(0);this.processQueue(fSec);}
$(form).trigger('cpcff_default_calc');}},Calculate:function(field)
{if(field.id==undefined)return;var id=field.id,fSec=id.match(/(_\d+)?_\d+$/),item,me=this;if(fSec)
{fSec=(typeof fSec[1]!='undefined')?fSec[1]:fSec[0];item=$.fbuilder['forms'][fSec].getItem(id);if(item&&typeof item['usedInEquations']!='undefined')
{me.enqueueEquation(fSec,item.usedInEquations);me.processQueue(fSec);}}},processQueue:function(fSec)
{if(this.processing_queue)return;this.processing_queue=true;if(typeof this.queued_equations[fSec]!='undefined')
{var queue=this.queued_equations[fSec],eq_obj;while(queue.length)
{eq_obj=queue.shift();var field=$('[id="'+eq_obj.result+'"]'),result=_calculate(eq_obj.equation,eq_obj.identifier,eq_obj.result),bk=field.data('bk');field.val((result!==false)?this.format(result,eq_obj.conf):'');if(bk!=field.val())
{field.trigger('calcualtedfield_changed');field.change();}
field.data('bk',field.val());}}
this.processing_queue=false;},format:function(value,config)
{if(!/^\s*$/.test(value))
{if($.isNumeric(value)&&!/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)/.test(value))
{var symbol=(value<0)?'-':'',parts=value.toString().replace("-","").split("."),counter=0,str='';if(config.groupingsymbol)
{for(var i=parts[0].length-1;i>=0;i--){counter++;str=parts[0][i]+str;if(counter%3==0&&i!=0)str=config.groupingsymbol+str;}
parts[0]=str;}
value=symbol+parts.join(config.decimalsymbol);}
if(config.prefix)
{value=config.prefix+value;}
if(config.suffix)
{value+=config.suffix;}}
return value;},unformat:function(field)
{var escape_symbol=$.fbuilder.escape_symbol;var eq=field[0].form.equations,v=field.val();for(var i=0,h=eq.length;i<h;i++)
{if(eq[i].result==field[0].id)
{var c=eq[i].conf;if(c.prefix&&!/^\s*$/.test(c.prefix))
{v=v.replace(new RegExp("^"+escape_symbol(c.prefix)),'');}
if(c.suffix&&!/^\s*$/.test(c.suffix))
{v=v.replace(new RegExp(escape_symbol(c.suffix)+"$"),'');}
if(!/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)/.test(v))
{if(c.groupingsymbol&&!/^\s*$/.test(c.groupingsymbol))
{v=v.replace(new RegExp(escape_symbol(c.groupingsymbol),'g'),'');}
if(c.decimalsymbol&&!/^\s*$/.test(c.decimalsymbol))
{v=v.replace(new RegExp(escape_symbol(c.decimalsymbol),'g'),'.');}}}}
return v;}};var obj=new CalcFieldClss();$(document).bind('keyup change blur',function(evt)
{var evalequations=$(evt.target).closest('form').attr('data-evalequations'),t=$(evt.target);if(typeof evalequations!='undefined'&&evalequations*1==0&&!(t.hasClass('codepeoplecalculatedfield')&&evt.type=='change'))
{return;}
if(evt.type=='keyup')
{if(evt.keyCode&&(evt.keyCode>=33&&evt.keyCode<=40))return;_checkValueThrowingEquation(t);}
else
{if(t.hasClass('depItem')||(t.prop('tagName')=='INPUT'&&t.attr('type').toLowerCase()=='text'&&evt.type!='change'))
{return;}
obj.Calculate(t[0]);}});$(document).bind('showHideDepEvent',function(evt,form_identifier)
{var fId='#'+form_identifier,evalequations=$(fId).attr('data-evalequations');if(typeof evalequations=='undefined'||evalequations*1==1)obj.defaultCalc(fId);});return obj;})();try{!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);}catch(err){}if(typeof $.fn['fbuilder_serializeObject']=='undefined')
{$.fn.fbuilder_serializeObject=function()
{var o={},a=this.serializeArray();$.each(a,function(){if(/^fieldname\d+_\d+(\[\])?$/.test(this.name))this.name=this.name.match(/fieldname\d+/)[0];else return;if(o[this.name]){if(!o[this.name].push){o[this.name]=[o[this.name]];}
o[this.name].push(this.value||'');}else{o[this.name]=this.value||'';}});return o;};}
$.fn.fbuilder_localstorage=function(){var form=this,id=form.attr('id'),sq=(typeof id=='undefined')?1:id.replace(/[^\d]/g,''),localStore_obj,fields;if(sq=='')sq=1;localStore_obj=new $.fbuilder_localstorage(form,true);$(document).on('change','#'+id+' *',function(evt){if(typeof this['id']!='undefined'&&/^fieldname\d+_\d+$/i.test(this.id)&&typeof this['value']!='undefined')
{localStore_obj.set_fields();}});form.on('submit',function(){localStore_obj.clear_fields();});fields=localStore_obj.get_fields();if(!$.isEmptyObject(fields))
{if(typeof cpcff_default=='undefined')cpcff_default={};if(typeof cpcff_default[sq]=='undefined')cpcff_default[sq]={};cpcff_default[sq]=$.extend(cpcff_default[sq],fields);}
return this;}
$.fbuilder_localstorage=function(form,debug){this.form=form;this.id=form.attr('id')+'_'+form.find('[name="cp_calculatedfieldsf_id"]').val();this.debug=(typeof debug!='undefined'&&debug)?true:false;};$.fbuilder_localstorage.prototype=(function(){var is_available;function _log(mssg)
{if(typeof console!='undefined')console.log(mssg);};return{is_available:function(){if(typeof is_available!='undefined')return is_available;try{var storage=window['localStorage'],x='__storage_test__';storage.setItem(x,x);storage.removeItem(x);is_available=true;return true;}
catch(e){if(this.debug)_log('localStorage object is not available');is_available=false;return e instanceof DOMException&&(e.code===22||e.code===1014||e.name==='QuotaExceededError'||e.name==='NS_ERROR_DOM_QUOTA_REACHED')&&storage.length!==0;}},get_fields:function(){try{if(typeof this.fields=='undefined')this.fields=JSON.parse(localStorage.getItem(this.id));return this.fields;}catch(err){_log('Error reading the fields.');_log(err);}},set_fields:function(){try{this.fields=this.form.fbuilder_serializeObject();localStorage.setItem(this.id,JSON.stringify(this.fields));}catch(err){_log('Error saving the fields.');_log(err);}},clear_fields:function(){try{localStorage.removeItem(this.id);}catch(err){_log('Error deleting the fields.');_log(err);}}};})();var fcount=1;var fnum="_"+fcount;while(typeof window["cp_calculatedfieldsf_fbuilder_config"+fnum]!='undefined'||fcount<10)
{try{var cp_calculatedfieldsf_fbuilder_config=window["cp_calculatedfieldsf_fbuilder_config"+fnum];var f=$("#fbuilder"+fnum).fbuilder((typeof cp_calculatedfieldsf_fbuilder_config.obj=='string')?$.parseJSON(cp_calculatedfieldsf_fbuilder_config.obj):cp_calculatedfieldsf_fbuilder_config.obj);$("#cp_calculatedfieldsf_pform"+fnum).validate({ignore:".ignore,.ignorepb",errorElement:"div",errorPlacement:function(e,element)
{var _parent=element.closest('.dfield'),_uh=_parent.find('span.uh:visible');if(_uh.length)
e.appendTo(_uh);else
e.insertAfter(_parent);e.addClass('message').css('position','absolute');}});f.fBuild.loadData("form_structure"+fnum);}catch(e){}
fcount++;fnum="_"+fcount;}})(fbuilderjQuery);});