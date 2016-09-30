// JavaScript Document

//0.初始化main的高度，等于第一个切换页面iLi0的高度
	 
  
 //  1.导航条的特效
  var navList = document.getElementById('nav').getElementsByTagName('li');
  var navBg = document.getElementById("navBg");
  for( var i = 0;i<navList.length;i++)
  { 
		navList[i].onmouseover = function() 
		{    
			   for(var i = 0;i<navList.length;i++)
			   { 
				  navList[i].className = '';
			   }
			   
			   this.className = 'active';
			   navBg.style.width = this.offsetWidth+ 'px';
			   
			   bufferMove(navBg,'left',this.offsetLeft,function(){ 
				this.className = 'active';
			   });
		}
		
  }
  
  

  //  2.轮播图的特效
  
	  var Carousel = document.getElementById('Carousel');
	  var calList = Carousel.getElementsByTagName('li');
	  var imgList = Carousel.getElementsByTagName('img');
	  var calTimer = null;
	  var calArr = [];
	  
	  for(var j= 0; j<calList.length; j++) 
	  {
			calArr.push({ 
						  left:parseInt(getStyle(calList[j],'left')),
						  top:parseInt(getStyle(calList[j],'top')),
						  width:parseInt(getStyle(calList[j],'width')),
						  height:parseInt(getStyle(calList[j],'height')),
						  zIndex:parseInt(getStyle(calList[j],'zIndex'))
			            });
	  }
	   
	  calTimer = setInterval(rotate,4000);
	  
	  function rotate()
	  {     
			  calArr.unshift(calArr[calArr.length-1]);
			  calArr.pop();
			  for(var i = 0; i<calList.length;i++)
			  { 
					calList[i].style.zIndex = calArr[i].zIndex;
					move(calList[i],{left:calArr[i].left,
									 top:calArr[i].top,
									 width:calArr[i].width,
									 height:calArr[i].height
									 });
					move(imgList[i],{
									 width:calArr[i].width,
									 height:calArr[i].height
									 });
			  }
	  }
	  
 
   
  
  //3.各个页面的切换
   var mainList = document.getElementById('mainList');
   var aLi = mainList.getElementsByTagName('li');
   var oMain = document.getElementById('main');
   var target = 0;
   for( var i = 0;i<navList.length;i++)
   { 
        navList[i].index = i;
		navList[i].onclick = function()
		{
			   iNow = this.index;
			   
			   
			   //根据当前的li高度设置main的高度
			   var iLi = ('iLi'+iNow).toString();
			   var setLi = document.getElementById(iLi);
			   oMain.style.height = setLi.offsetHeight + 'px';
			   
			   //移动饿目标位置target
			   target = - aLi[0].offsetWidth * this.index;     
			   
			   move(mainList,{left:target},function(){ 
			       
			      //判断如果到达就开始顺序显示相片
				  if( target== -aLi[0].offsetWidth * 2)
				  { 
					loadTimer = setInterval(showPic,200);
				  }
			   });	
		}
		
		navList[i].onmouseout = function()
		{ 
				this.className = '';
				navBg.style.width = navList[iNow].offsetWidth+ 'px';
				navList[iNow].className = 'active';
				bufferMove(navBg,'left',navList[iNow].offsetLeft,function(){ 
					this.className = 'active';
				   });
		}
   }
   
   
  
   
   
  //4.弹出框
  var keyWord = document.getElementById("keyWord");
  var keyList = keyWord.getElementsByTagName('li');
  var keyIndex = 20;
  var sWidth = document.body.clientWidth; 
 
  for(var i = 0;i<keyList.length;i++)
  { 
     keyList[i].index = i;
     keyList[i].onclick = function()
	 { 
		   var num = 'web'+ this.index;
		   var obj = document.getElementById(num);
		   obj.style.display = 'block';
		   
		   var childP = obj.getElementsByTagName('p');  
		   var closeBtn = obj.getElementsByTagName('input')
		   obj.style.zIndex = keyIndex++;
		   
		   //创建一个遮罩层
		   var oCover = document.createElement('div');
		   oCover.className = 'cover';
		   oCover.style.height = document.body.offsetHeight + 15 + 'px';
		   oCover.style.width = document.documentElement.offsetWidth + 'px'; 
		   document.body.appendChild(oCover);
		   
		   //弹出窗口 	   
		   move(obj,{width:550,marginLeft:-275},function(){
			 childP[0].style.display = 'block'; 
			 childP[0].style.opacity = 0;
			 childP[0].style.filter = 'alpha(opacity=0)';
			 var thisHeight = childP[0].offsetHeight;
			 if(thisHeight%2 == 0)
			 {
				  thisHeight = thisHeight;
			 }
			 else
			 { 
			     thisHeight ++;
			 } 
			 move(obj,{height:thisHeight,marginTop:-thisHeight/2},function(){ 
             childP[0].style.opacity = 1;
			 childP[0].style.filter = 'alpha(opacity=100)';
			 closeBtn[0].style.display = 'block';
			 });
		   });
	   
		   closeBtn[0].onclick = function()
		   { 
				 var parent = this.parentNode;
				 var allChild = parent.children;
				 for(var  i =0; i<allChild.length;i++)
				 { 
					 allChild[i].style.display = 'none'; 
				 }
			     //关闭窗口
				 move(parent,{height:0,marginTop:0},function(){ 
					move(parent,{width:0,marginLeft:0},function(){ 
					  parent.style.display = 'none';
					  //移除遮罩层
					  document.body.removeChild(oCover);
					});
				 });
				 
				 
				 
		   }
	 }
  }
  
  
  
  //5.头像说明
  var photo = document.getElementById("photo");
  var movePhoto = document.getElementById("photo-details");
  
  photo.onmouseover = function()
  { 
     move(movePhoto,{bottom:4})
  }
  
  photo.onmouseout = function()
  { 
     move(movePhoto,{bottom:-52})
  }
  
  
  
  //6.图片延时顺序显示
      var loadPic = document.getElementById("load-list");
	  var picList = loadPic.getElementsByTagName('li');
	  var loadA = 0;
	  var loadTimer = null;
	  
	  function showPic()
	  {
			move(picList[loadA],{opacity:100})
			loadA++;
	   
			if(loadA>=picList.length)
			{ 
				  clearInterval(loadTimer);
				  loadA = 0;	
			}
		  
	   }
   
   
  //7.相册图片基于多个中心的展开
     var picIndex = 5;
    for(var i=0;i<picList.length;i++) 
	{ 
	        picList[i].style.left = picList[i].offsetLeft + 'px';
			picList[i].style.top = picList[i].offsetTop + 'px';
			
	}
	
	for(var i=0;i<picList.length;i++) 
	{ 
	        picList[i].style.position = 'absolute'; 
		    picList[i].style.margin = 0;
			picList[i].onmouseover = function() 
		    { 
			   this.style.zIndex = picIndex++;
			   move(this,{width:310,height:270,marginLeft:-45,marginTop:-25});
			   move(this.children[0],{width:296,height:220,marginLeft:-148,marginTop:2});
			   move(this.children[1],{fontSize:22,lineHeight:34});
			}
			picList[i].onmouseout = function() 
		    { 
			   this.style.zIndex = 5;
			    move(this,{width:220,height:180,marginLeft:0,marginTop:0});
			    move(this.children[0],{width:210,height:150,marginLeft:-105,marginTop:0});
				move(this.children[1],{fontSize:14,lineHeight:22});
			}
	}
	
	
 //8.通过键盘的左右键进行页面的切换
   
   var iNow = 0;
   document.onkeydown = function(ev)
   { 
     var oEvent = ev||event;
     switch(oEvent.keyCode)
	 { 
	    case 37 : iNow -= 1;break;
		case 39 : iNow += 1;;break;
		default : break;
	 }
	 if(iNow <= 0)
	 { 
	    iNow = 0;
	 }
	 if(iNow >= 5 )
	 { 
	    iNow = 5;
	 }
	 var moveTarget = -aLi[0].offsetWidth * iNow;
	  //根据当前的li高度设置main的高度
	   var iLi = ('iLi'+iNow).toString();
	   var setLi = document.getElementById(iLi);
	   oMain.style.height = setLi.offsetHeight + 'px';
			   
			   
	 move(mainList,{left:moveTarget},function(){ 
	   //判断如果到达在‘相册’就开始顺序显示相片
	     if( moveTarget== -aLi[0].offsetWidth * 2)
				  { 
					loadTimer = setInterval(showPic,200);
				  }
				  
	 });

	 <!--这是是导航条的背景跟着移动-->
	  for(var i = 0;i<navList.length;i++)
			   { 
				  navList[i].className = '';
			   }
			   
			   navList[iNow].className = 'active';
			   navBg.style.width = navList[iNow].offsetWidth+ 'px';
			   
			   bufferMove(navBg,'left',navList[iNow].offsetLeft,function(){ 
				navList[iNow].className = 'active';
			   });
		  
   };
   
