// JavaScript Document

//css(box,'width');获得指定属性
//css(box,'width',300);设置指定属性
function css()
{
	
	if(arguments.length == 3)
	{
		
		arguments[0].style[arguments[1]] = arguments[2] + 'px';
	
	}
	if(arguments.length == 2)
	{
		
		var text = getStyle(arguments[0],arguments[1]);
		alert(text)
		
	}
	
} 

//通过元素的class获取元素，obj参数是父节点，name是className，返回是一个数组形式
function getClass(obj,name)
{
	var arr = [];
	var i = 0;
   	var tag = obj.getElementsByTagName('*');
	
	for(i=0;i<tag.length;i++)
	{
	   if(tag[i].className == name)
	   {
		  arr.push(tag[i]);   
       }	
	}
	return arr;	
}


//节点元素运动，包括位置，大小，不透明度等样式缓冲的渐变
//obj是运动的元素  ，  json是目标样式 ， fn是回调函数
function move(obj,json,fn)
{	
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
	
		var iOpened = true;
		
		//循环json每一个的key
		for(key in json)
		{
			var iCur = 0;
			if(key == 'opacity')
			{
				iCur = parseInt( parseFloat( getStyle(obj,key) )*100 );
			}
			else
			{
				//获取当前的值
				iCur = parseInt(getStyle(obj,key));
			}
			//获取缓冲运动的速度
			var iSpeed = (json[key] - iCur)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed): Math.floor(iSpeed);
			//判断每个条件是否到达目标值
			if(json[key] != iCur)
			{
				iOpened = false;
			}
			//执行运动
			if(key == 'opacity')
			{
				obj.style.opacity = (iCur+iSpeed+10)/100;
				obj.style.filter = 'alpha(opacity:'+(iCur+iSpeed+10)+')';
			}
			else
			{
				//当前值+上速度
				obj.style[key] = iCur+iSpeed+'px';
			}
			
		}
		
		//所有条件都到达目标的时候清除定时器
		if(iOpened)
		{
			clearInterval(obj.timer);
			//判断如果有传入函数就执行函数
			if(fn)
			{
				fn();
			}
		}

		
		
	},30);
}

//获取元素的样式，含单位
//obj是目标节点对象，attr是要获取的样式名
function getStyle(obj,attr)
{
	//ie
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj,false)[attr];	
	}
}


//上下或者左右四个方向的缓冲运动
//obj是要运动的节点对象，attr是要变化的样式 ， 是要变化的样式的目标值，fn是回调函数
function bufferMove(obj,attr,target,fn)
	{          
		  clearInterval(obj.timer);
		  var speed = 10;
		  obj.timer = setInterval(function(){ 
		  
		     //获取当前值
		     var curr = parseInt(getStyle(obj,attr));
			 //计算速度 
			 speed += (target - curr)/5;
			 speed *= 0.7;                             
			 
			 //停止定时器的条件
			 if(Math.abs(speed) < 1 && Math.abs(curr - target)<1)  
			 {　
			    if(fn)
				{
					fn();
				}
			 　　clearInterval(obj.timer);
			 }
			
			 //还等什么，运动起来吧！
			 obj.style[attr] = curr + speed + 'px';        
			 
		  },30);
		  
		 
	}
	
	
	
//跨浏览器的事件处理程序
var tlcEvent = { 
 
    //为某个元素绑定事件处理程序
    addHander:function(obj,eventType,handler)
			  { 
				  	if(obj.addEventListener)
					{
					  //false表示在冒泡阶段调用处理程序，true表示在捕获阶段调用
					
					  obj.addEventListener(eventType,handler,false);
					}
					else if(obj.attachEvent)
					{ 
					  obj.attachEvent('on' + eventType,handler);
					}
					else
					{ 
					  obj['on' + eventType] = handler;
					} 
			  },
   
   
   //为某个元素移除事件处理程序
   removeHander:function(obj,eventType,handler)
			    { 
					 if(obj.removeEventListener)
					 { 
					    //false表示在冒泡阶段调用处理程序，true表示在捕获阶段调用
					    obj.removeEventListener(eventType,handler,false); 
					 }	
					 else if(obj.detachEvent)
					 { 
					    obj.detachEvent('on' + eventType,handler);
					 }
					 else
					 { 
					    obj['on' + eventType] = null;
					 }			
			    },
	
	//获得兼容的事件对象			
	getEvent:function(ev)
			 {
			    	return ev || window.event;
			 },
			 
	//获得事件对象目标
	getTarget:function(ev)
			  { 
			        return ev.target || ev.srcElement;
			  },
			  
	//获得相关元素的信息
	getRelatedTarget:function(ev)
	                 { 
					    if(ev.relatedTarget)
						{ 
						     return ev.relatedTarget;
						}
						else if(ev.toElement)
						{ 
						     return ev.toElement;
						}
						else if(ev.fromElement)
						{ 
						     return ev.fromElement;
						}
						else
						{ 
						     return null;
						} 
					 },
 			  
	//阻止进一步冒泡
	stopBubble:function(ev)
	           { 
			        if(ev.stopPropagation)
					{ 
					    ev.stopPropagation();
					}
					else
					{ 
					    ev.cancelBubble = true;  
					}  
			   },
	
	
	//获得鼠标点击按钮的事件
	getMouseBtn:function(ev)
	            { 
				     if(document.implementation.hasFeature('MouseEvents','2.0'))
					 { 
					      return ev.button;
					 }
					 else
					 { 
					      switch(ev.button) 
						  { 
						      case 0 : 
							  case 1 : 
							  case 3 : 
							  case 5 : 
							  case 7 : 
							      return 0 ;  //左键
							  case 2 :
							  case 6 : 
							      return 2 ;  //右键
							  case 4 :
							  　　 return 1 ;  //中间键
						  }
					 }
				},
				
		//兼容鼠标滚轮事件
		getWheelData:function(ev)
		              { 
					     if(ev.wheelDelta)
						 { 
						    return ev.wheelDelta;
						 }
						 else
						 { 
						   return -ev.detail * 40;
						 }      				 
					  }	
			
 }