elfDialog 一个简易对话框实现
==============================

##选项

###type
**dataType:**`String` 可选值有:`"dialog"	"alert"	"confirm"`	**default:**`"dialog"`

类型。不同的类型对话框会有不同的按钮和默认的行为

----

###width
**dataType:**`int`	**default:**`0`

宽度。

----

###height
**dataType:**`int`	**default:**`0`

高度。

----

###title
**dataType:**`String`	**default:**`""`

标题。

----

###value
**dataType:**`String`	**default:**`""`

内容。支持HTML文本

----

###submit
**dataType:**`Object`	**default:**

	{
		btnText : "知道了",
		callBack : function(){
			ElfDialog.close();
			return true;
		}
	}

`type=alert`时的确定按钮。`btnText`：按钮文本；`callBack`：按钮点击事件处理函数。




