elfDialog 一个简易对话框实现
==============================


选项
----

**type**	*dataType:*`String` 可选值有:`"dialog"	"alert"	"confirm"`	*default:*`"dialog"`

类型。不同的类型对话框会有不同的按钮和默认的行为

----

**width**	*dataType:*`int`	*default:*`0`

宽度。

----

**height**	*dataType:*`int`	*default:*`0`

高度。

----

**title**	*dataType:*`String`	*default:*`""`

标题。

----

**value**	*dataType:*`String`	*default:*`""`

内容。支持HTML文本

----

**submit**	*dataType:*`Object`	*default:*

	{
		btnText : "知道了",
		callBack : function(){
			ElfDialog.close();
			return true;
		}
	}

对话框类型是`alert`时的确定按钮。`btnText`：按钮文本；`callBack`：按钮点击事件处理函数。

----

**confirm**	*dataType:*`Object`	*default:*

	{
		btnText : "确定",
		callBack : function(){
			ElfDialog.close();
			return true;
		}
	}

对话框类型是`confirm`时的确定按钮。`btnText`：按钮文本；`callBack`：按钮点击事件处理函数。

----

**cancel**	*dataType:*`Object`	*default:*

	{
		btnText : "取消",
		callBack : function(){
			ElfDialog.close();
			return false;
		}
	}

对话框类型是`confirm`时的取消按钮。`btnText`：按钮文本；`callBack`：按钮点击事件处理函数。

----

**afterClose**	*dataType:*`function`	*default:*`function(){}`

对话框关闭后的回调函数。

----

**buttons**	*dataType:*`Object`	*default:*`{}`

自定义按钮。例如：

	{
		"按钮文本1" : function(){
			// do something
			// 按钮点击事件处理函数
		},
		"按钮文本2" : function(){
			// do something
			// 按钮点击事件处理函数
		}
	}

----

**overlay**	*dataType:*`Boolean`	*default:*`false`

是否使用遮罩层。

----

**overlayOpt**	*dataType:*`Object`	*default:*

	{
		opacity : 0.2, 
		color : "#000",
		fadeIn : 300
	}

遮罩层配置。


----

**autoClose**	*dataType:*`int`	*default:*`0`

对话框自动关闭延迟时间。0表示不自动关闭。单位为毫秒。





