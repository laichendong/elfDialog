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
		overlay : false,
		overlayOpt : {
			opacity : 0.2,
			color : "#000",
			fadeIn : 300
		},
		autoClose : 0
	},
	_autoCloseTimer : null,
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
		//清除上一个dialog的负面影响
		$("body").find(".elfDialogMain, .elfDialogOverlay").remove();
		clearTimeout(this._autoCloseTimer);
		
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
			this._autoCloseTimer = window.setTimeout(function(){
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
		$("body").find(".elfDialogOverlay").fadeOut(this.settings.overlayOpt.fadeIn, function(){
				$(this).remove();
			}).end().find(".elfDialogMain").fadeOut(300,function(){
				$(this).remove();
			});
		var result = this.settings.afterClose();
		this.settings = {};//清空配置
		return result;
	},
	_createDomAsJq : function(){
		return $('<div class="elfDialogMain"><div class="elfDialog"><h4 class="elfDialogTitle clearfix"><p class="elfDialogTitleContent f_l"></P><a href="javascript:ElfDialog.close();" class="elfDialogCloser f_r">╳</a></h4><div class="elfDialogContent"></div><div class="elfDialogButtonBar"></div></div></div>');
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
			.height(elfDialog.outerHeight())
			.find(".elfDialogContent")
			.height(elfDialog.innerHeight()-$(".elfDialogButtonBar").outerHeight()-$(".elfDialogTitle").outerHeight()-11);

	},
	_setCenter : function(){
		var viewportW = $(window).width();
		var viewportH = $(window).height();
		var dialog = $("body").find(".elfDialogMain");
		dialog.offset({top : (viewportH - dialog.height() + window.pageYOffset) * 0.4, left : viewportW/2 - dialog.width()/2})  + window.pageXOffset;
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
			.height($(document).height())
            .click(function(){
                ElfDialog.close();
            });
		$(".elfDialogMain").before(elfDialogOverlay.hide());
		elfDialogOverlay.fadeIn(overlaySettings.fadeIn);
	}
};
$(function(){
	$(window).keyup(function(event){
		if(event.keyCode == 27 && $("body").find(".elfDialogMain").length > 0){
			ElfDialog.close();
		}
	});
	$('<style>.elfDialogMain * { margin:0; padding:0; z-index:888; } .elfDialogMain {background:#fff; float:left;/*为了产生“包裹”效果*/ display:none; border:0px solid #000; box-shadow:0 0 5px rgba(0, 0, 0, 0.4); border-radius:5px; position: fixed; left: 0px; top: 0px; padding:5px; background:rgba(0,0,0,0.5) } .elfDialog { width: 260px; min-height: 25px; background: #fff; border: 1px solid #666666;} .elfDialogContent{overflow:hidden; padding:5px; border-top: 1px solid #F2F2F2;} .elfDialogTitle { background: #f5f5f5; border-bottom: 1px solid #D9D9D9; } .elfDialogTitle .elfDialogTitleContent { text-indent: 1em; height: 26px; line-height: 26px; color: #2A2A2A; text-shadow:-1px -1px 0 #fff; } .elfDialogTitle .elfDialogCloser { display: block; cursor:pointer; width: 16px; height: 16px; font: bold 12px/16px Verdana; text-align: center; color: #ccc; text-decoration: none; margin:4px 8px 0 0; } .elfDialogTitle .elfDialogCloser:hover{ text-decoration: none; color: #999;} .elfDialogButtonBar{ text-align:right; padding:5px;} .f_l{float:left; _display:inline;} .f_r{float:right; _display:inline;} .clearfix:after {content:" "; display:block; clear:both; visibility:hidden; _line-height:0; height:0; } .clearfix {display: inline-block; } html[xmlns] .clearfix {display: block; }</style>').appendTo($("body"));
});