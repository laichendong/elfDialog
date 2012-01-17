var ElfDialog = {
	_option : {
		type : "dialog",//alert,confirm,dialog
		width : 0,
		height : 0,
		title : "",
		value : "",
		submit : {
			btnText : "知道了",
			callBack : function(){
				ElfDialog.close();
				return true;
			}
		},
		confirm : {
			btnText : "确定",
			callBack : function(){
				ElfDialog.close();
				return true;
			} 
		},
		cancel : {
			btnText : "取消",
			callBack : function(){
				ElfDialog.close();
				return false;
			}
		},
		afterClose : function(){},
		buttons : {},
		overlay : true,
		overlayOpt : {
			opacity : 0.2,
			color : "#000",
			fadeIn : 300
		},
		autoClose : 0
	},
	settings : {},
	pop : function(value,title){
		if(title){
			return this.dialog({
				"value":value,
				"title":title,
				width:250
			});
		}else{
			return this.dialog({
				"value":value,
				"title":title,
				"autoClose":3000,
				width:250
			});
		}
	},
	alert : function(value,title,submitCallBack){
		return this.dialog({
			type : "alert",
			"value" : value,
			"title" : title,
			submit : {
				callBack : submitCallBack
			}
		});
	},
	confirm : function(value,title,confirmCallBack,cancelCallBack){
		return this.dialog({
			type : "confirm",
			"value" : value,
			"title" : title,
			confirm : {
				callBack : confirmCallBack
			},
			cancel : {
				callBack : cancelCallBack
			}
		});
	},
	dialog : function(options){
		
		this.settings = $.extend(true, {}, this._option, options); 
		var dialog = $("body").append(this._createDomAsJq()).find(".elfDialogMain");
		
		//标题栏
		if(this.settings.title){
			dialog.find(".elfDialogTitleContent").append(this.settings.title);
		}else{
			dialog.find(".elfDialogTitle").remove();
		}
		//内容
		dialog.find(".elfDialogContent").append(this.settings.value);
		//类型
		if(this.settings.type == "dialog" && !this.settings.buttons){
			dialog.find(".elfDialogButtonBar").remove();
		}else if(this.settings.type == "alert"){
			$('<button type="button"></button>')
				.text(this.settings.submit.btnText)
				.click(this.settings.submit.callBack)
				.appendTo(dialog.find(".elfDialogButtonBar"));
		}else if(this.settings.type == "confirm"){
			$('<button type="button"></button>')
				.text(this.settings.confirm.btnText)
				.click(this.settings.confirm.callBack)
				.appendTo(dialog.find(".elfDialogButtonBar"));
			$('<button type="button"></button>')
				.text(this.settings.cancel.btnText)
				.click(this.settings.cancel.callBack)
				.appendTo(dialog.find(".elfDialogButtonBar"));
		}
		//自定义按钮
		if(this.settings.buttons){
			$.each(this.settings.buttons,function(name,fn){
				$('<button type="button"></button>')
					.text(name)
					.click(fn)
					.appendTo(dialog.find(".elfDialogButtonBar"));
			});
		}
		//自动关闭
		if(this.settings.autoClose){
			window.setTimeout(function(){
				ElfDialog.close();
			},this.settings.autoClose);
		}
		//遮罩层
		if(this.settings.overlay){
			this._overlay(this.settings.overlayOpt);
		}
		//显示
		dialog.fadeIn(300);
		//设置高宽
		this._setSize(this.settings.width,this.settings.height);
		//居中
		this._setCenter();//要在dialog显示之后设置居中，否则在chrome下不能正确居中
		return dialog;
	},
	close : function(){
		$("body").find(".elfDialogOverlay").remove()
			.end().find(".elfDialogWarpper").fadeOut(300,function(){
				$(this).remove();
			});
		var result = this.settings.afterClose();
		this.settings = {};//清空配置
		return result;
	},
	_createDomAsJq : function(){
		return $('<div class="elfDialogWarpper"><div class="elfDialogMain"><div class="elfDialog"><h4 class="elfDialogTitle clearfix"><p class="elfDialogTitleContent f_l"></P><a href="javascript:ElfDialog.close();" class="elfDialogCloser f_r">X</a></h4><div class="elfDialogContent"></div><div class="elfDialogButtonBar"></div></div></div></div>');
	},
	_setSize : function(width, height){
		var elfDialog = $("body").find(".elfDialog");
		if(width){
			elfDialog.width(width);
		}
		if(height){
			elfDialog.height(height);
		}
		$("body").find(".elfDialogMain")
			.width(elfDialog.outerWidth())
			.height(elfDialog.outerHeight());

		//修正buttonBar的位置
//		if($("body").find(".elfDialogButtonBar :button").length > 0){
//			$("body").find(".elfDialog").css({
//				"height" : "53px"
//			}).end().find(".elfDialogButtonBar").css({
//				"position" : "absolute",
//				"bottom" : 0,
//				"right" : 0
//			});
//		}
	},
	_setCenter : function(){
		var viewportW = $(window).width();
		var viewportH = $(window).height();
		var dialog = $("body").find(".elfDialogMain");
		dialog.offset({top : viewportH/2 - dialog.height()/2 + window.pageYOffset, left : viewportW/2 - dialog.width()/2})  + window.pageXOffset;
	},
	_overlay : function(overlaySettings){
		var elfDialogOverlay = $('<div class="elfDialogOverlay"></div>')
			.css({
				"position" : "absolute",
				"top" : 0,
				"left" : 0,
				"background" : overlaySettings.color,
				"opacity" : overlaySettings.opacity
			})
			.width($(document).width())
			.height($(document).height());
		$("body").append(elfDialogOverlay.hide());
		//检查遮盖层进入方式
		if(this.settings.fadeIn){
			elfDialogOverlay.fadeIn(overlaySettings.fadeIn);
		}else{
			elfDialogOverlay.show();
		}
	}
};
$(function(){
	$(window).keyup(function(event){
		if(event.keyCode == 27 && $("body").find(".elfDialogMain").length > 0){
			ElfDialog.close();
		}
	});
	$('<style>.elfDialogWarpper { 	width: 100%; 	height: 100%; 	z-index: 888; 	position: absolute; 	top: 0; 	left: 0; }  .elfDialogWarpper * { 	margin:0; padding:0;}	.elfDialogMain { 	float:left;/*为了产生“包裹”效果*/ 	display:none; 	border:5px solid transparent; box-shadow:0 0 20px rgba(0, 0, 0, 0.4);	border-radius:6px; 	position: fixed; 	left: 0px; 	top: 0px; }  .elfDialog { 	width: 260px; 	min-height: 25px;	   padding:5px; 	background: #fff; 	background: rgba(255, 255, 255, 0.9); 	border-radius: 6px; 	-moz-border-radius: 6px; 	-webkit-border-radius: 6px; }  .elfDialogContent{overflow:hidden;}  .elfDialogTitle { 	background: #0066AA; 	border: none; 	border-radius: 5px; 	-moz-border-radius: 5px; 	-webkit-border-radius: 5px; 	border-bottom-left-radius: 0; 	-moz-border-radius-bottomleft: 0; 	-webkit-border-bottom-left-radius: 0; 	border-bottom-right-radius: 0; 	-moz-border-radius-bottomright: 0; 	-webkit-border-bottom-right-radius: 0; }  .elfDialogTitle .elfDialogTitleContent { 	text-indent: 1em; 	height: 26px; 	line-height: 26px; 	color: #fff; 	text-shadow:-1px -1px 0 #000; }  .elfDialogTitle .elfDialogCloser { 	display: block; 	cursor:pointer; 	width: 16px; 	height: 16px; 	border: 1px solid #A7190F; 	font: bold 12px/16px "lucida Grande", Verdana; 	text-align: center; 	color: #fff; 	text-decoration: none; 	background: #DC4835; 	margin:4px 8px 0 0; 	border-radius: 3px; 	-moz-border-radius: 3px; 	-webkit-border-radius: 3px; } .elfDialogTitle .elfDialogCloser:hover{ 	text-decoration: none; 	background:#EA7759; 	box-shadow: 0px 0px 3px #fff; 	-moz-box-shadow: 0px 0px 3px #fff; 	-webkit-box-shadow: 0px 0px 3px #fff; }  .elfDialogButtonBar{ 	text-align:right; }  .f_l{float:left; _display:inline;} .f_r{float:right; _display:inline;} .clearfix:after {content:" "; display:block; clear:both; visibility:hidden; _line-height:0; height:0; } .clearfix {display: inline-block; } html[xmlns] .clearfix {display: block; }</style>').appendTo($("body"));
});
