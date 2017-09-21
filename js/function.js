/*マウスオーバー透過*/
jQuery(document).ready(
function(){
jQuery("#container a img,#footer a img").hover(

function(){jQuery(this).fadeTo("normal", 0.7);},

function(){jQuery(this).fadeTo("fast", 10.0);});
});

/*ロールオーバー*/
$(function()
{
var targetImgs = $('#header ul li a img');

targetImgs.each(function()
{
if(this.src.match('_off'))
{

this.rollOverImg = new Image();
this.rollOverImg.src = this.getAttribute("src").replace("_off", "_on");;
$(this.rollOverImg).css({position: 'absolute', opacity: 0});
$(this).before(this.rollOverImg);

$(this.rollOverImg).mousedown(function(){
$(this).stop().animate({opacity: 0}, {duration: 0, queue: false});
});

$(this.rollOverImg).hover(function(){
$(this).animate({opacity: 1}, {duration: 400, queue: false});
},
function(){
$(this).animate({opacity: 0}, {duration: 400, queue: false});
});

}
});
});



/*Heightline*/
new function(){
	
	function heightLine(){
	
		this.className="heightLine";
		this.parentClassName="heightLineParent"
		reg = new RegExp(this.className+"-([a-zA-Z0-9-_]+)", "i");
		objCN =new Array();
		var objAll = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all;
		for(var i = 0; i < objAll.length; i++) {
			var eltClass = objAll[i].className.split(/\s+/);
			for(var j = 0; j < eltClass.length; j++) {
				if(eltClass[j] == this.className) {
					if(!objCN["main CN"]) objCN["main CN"] = new Array();
					objCN["main CN"].push(objAll[i]);
					break;
				}else if(eltClass[j] == this.parentClassName){
					if(!objCN["parent CN"]) objCN["parent CN"] = new Array();
					objCN["parent CN"].push(objAll[i]);
					break;
				}else if(eltClass[j].match(reg)){
					var OCN = eltClass[j].match(reg)
					if(!objCN[OCN]) objCN[OCN]=new Array();
					objCN[OCN].push(objAll[i]);
					break;
				}
			}
		}
		
		//check font size
		var e = document.createElement("div");
		var s = document.createTextNode("S");
		e.appendChild(s);
		e.style.visibility="hidden"
		e.style.position="absolute"
		e.style.top="0"
		document.body.appendChild(e);
		var defHeight = e.offsetHeight;
		
		changeBoxSize = function(){
			for(var key in objCN){
				if (objCN.hasOwnProperty(key)) {
					//parent type
					if(key == "parent CN"){
						for(var i=0 ; i<objCN[key].length ; i++){
							var max_height=0;
							var CCN = objCN[key][i].childNodes;
							for(var j=0 ; j<CCN.length ; j++){
								if(CCN[j] && CCN[j].nodeType == 1){
									CCN[j].style.height="auto";
									max_height = max_height>CCN[j].offsetHeight?max_height:CCN[j].offsetHeight;
								}
							}
							for(var j=0 ; j<CCN.length ; j++){
								if(CCN[j].style){
									var stylea = CCN[j].currentStyle || document.defaultView.getComputedStyle(CCN[j], '');
									var newheight = max_height;
									if(stylea.paddingTop)newheight -= stylea.paddingTop.replace("px","");
									if(stylea.paddingBottom)newheight -= stylea.paddingBottom.replace("px","");
									if(stylea.borderTopWidth && stylea.borderTopWidth != "medium")newheight-= stylea.borderTopWidth.replace("px","");
									if(stylea.borderBottomWidth && stylea.borderBottomWidth != "medium")newheight-= stylea.borderBottomWidth.replace("px","");
									CCN[j].style.height =newheight+"px";
								}
							}
						}
					}else{
						var max_height=0;
						for(var i=0 ; i<objCN[key].length ; i++){
							objCN[key][i].style.height="auto";
							max_height = max_height>objCN[key][i].offsetHeight?max_height:objCN[key][i].offsetHeight;
						}
						for(var i=0 ; i<objCN[key].length ; i++){
							if(objCN[key][i].style){
								var stylea = objCN[key][i].currentStyle || document.defaultView.getComputedStyle(objCN[key][i], '');
									var newheight = max_height;
									if(stylea.paddingTop)newheight-= stylea.paddingTop.replace("px","");
									if(stylea.paddingBottom)newheight-= stylea.paddingBottom.replace("px","");
									if(stylea.borderTopWidth && stylea.borderTopWidth != "medium")newheight-= stylea.borderTopWidth.replace("px","")
									if(stylea.borderBottomWidth && stylea.borderBottomWidth != "medium")newheight-= stylea.borderBottomWidth.replace("px","");
									objCN[key][i].style.height =newheight+"px";
							}
						}
					}
				}
			}
		}
		
		checkBoxSize = function(){
			if(defHeight != e.offsetHeight){
				changeBoxSize();
				defHeight= e.offsetHeight;
			}
		}
		changeBoxSize();
		setInterval(checkBoxSize,1000)
		window.onresize=changeBoxSize;
	}
	
	function addEvent(elm,listener,fn){
		try{
			elm.addEventListener(listener,fn,false);
		}catch(e){
			elm.attachEvent("on"+listener,fn);
		}
	}
	addEvent(window,"load",heightLine);
}

/*--------------------------------------------------------------------------*
 *  
 *  SmoothScroll JavaScript Library V2
 *  
 *  MIT-style license. 
 *  
 *  2007-2011 Kazuma Nishihata 
 *  http://www.to-r.net
 *  
 *--------------------------------------------------------------------------*/
 
new function(){

	var attr ="data-tor-smoothScroll";//for html5 , if you can't use html5 , this value change "class"
	var attrPatt = /noSmooth/;
	var d = document;//document short cut
	
	/*
	 *add Event
	  -------------------------------------------------*/
	function addEvent(elm,listener,fn){
		try{ // IE
			elm.addEventListener(listener,fn,false);
		}catch(e){
			elm.attachEvent(
				"on"+listener
				,function(){
					fn.apply(elm,arguments)
				}
			);
		}
	}

	/*
	 *Start SmoothScroll
	  -------------------------------------------------*/
	function SmoothScroll(a){
		if(d.getElementById(a.rel.replace(/.*\#/,""))){
			var e = d.getElementById(a.rel.replace(/.*\#/,""));
		}else{
			return;
		}
		
		//Move point
		var end=e.offsetTop
		var docHeight = d.documentElement.scrollHeight;
		var winHeight = window.innerHeight || d.documentElement.clientHeight
		if(docHeight-winHeight<end){
			var end = docHeight-winHeight;
		}
		
		//Current Point
		var start=window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop || 0;
		
		
		var flag=(end<start)?"up":"down";

		function scrollMe(start,end,flag) {
			setTimeout(
				function(){
					if(flag=="up" && start >= end){
						start=start-(start-end)/20-1;
						window.scrollTo(0,start)
						scrollMe(start,end,flag);
					}else if(flag=="down" && start <= end){
						start=start+(end-start)/20+1;
						window.scrollTo(0,start)
						scrollMe(start,end,flag);
					}else{
						scrollTo(0,end);
					}
					return ;
				}
				,10
			);
			
		}

		scrollMe(start,end,flag);
		
	}

	/*
	 *Add SmoothScroll
	  -------------------------------------------------*/
	addEvent(window,"load",function(){
		var anchors = d.getElementsByTagName("a");
		for(var i = 0 ,len=anchors.length; i<len ; i++){
			if(!attrPatt.test(anchors[i].getAttribute(attr)) && 
				anchors[i].href.replace(/\#[a-zA-Z0-9_]+/,"") == location.href.replace(/\#[a-zA-Z0-9_]+/,"")){
				anchors[i].rel = anchors[i].href;
				anchors[i].href = "javascript:void(0)";
				anchors[i].onclick=function(){SmoothScroll(this)}
			}
		}
	});

}