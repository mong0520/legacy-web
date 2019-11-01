// ALAPI ScrollArea
// Author: Matti Hultstrand matti@alapi.com
// Copyright 1998 Icon Medialab, Inc. All rights reserved.
// For documentation and more objects see www.alapi.com

//
//Scrollable Area library
//
//////

function ScrollArea(ObjName, layerObj, areaWidth, areaHeight, stepSize, fps) {

	this.layer = layerObj;

	//Public Properties
	this.stepSize = stepSize;
	this.speed = Math.round(1000/fps);
	
	this.endOfPage = false;
	this.topOfPage = true;
	this.areaWidth = areaWidth;
	this.areaHeight = areaHeight;
		

	this.timer=0;				//contain the thread handler
	this.me = ObjName;

	//Privates Methods
	this.incFunc  = new Function('val1', 'val2', "return Math.round((val1 / Math.abs(val2)) * this.stepSize)"); 
	
	this.stopScroll = stopScroll;
	this.scrollTo = scrollTo;

	if (navigator.appName == "Netscape") { 
		this.layer.clip.width= areaWidth;
		this.layer.clip.height= areaHeight;
		this.layer.width = areaWidth;
		this.layer.visibility = "show";
		this.jumpBy = nsJumpBy;	 				
		this.jumpTo = nsJumpTo;
		this.jumpByPage = nsJumpByPage;			
		this.jumpToPage = nsJumpToPage;	  				
		this.jumpToTop = nsJumpToTop;				
		this.jumpToBottom = nsJumpToBottom;		
		this.jumpToLeftMost = nsJumpToLeftMost;
		this.jumpToRightMost = nsJumpToRightMost;	
		this.scrollBy = nsScrollBy;				
		this.scrollByPage = nsScrollByPage;		
		this.scrollToPage = nsScrollToPage;		
		this.scrollToTop = nsScrollToTop;			
		this.scrollToBottom = nsScrollToBottom;	
		this.scrollToLeftMost = nsScrollToLeftMost;
		this.scrollToRightMost = nsScrollToRightMost; 
		this.setPos = nsSetPos;
		this.switchPage  = nsSwitchPage;
		
		this.leftC = "this.layer.clip.left";
		this.rightC = "this.layer.clip.right";
		this.topC = "this.layer.clip.top";
		this.bottomC = "this.layer.clip.bottom";


	} else {
		this.layer.style.pixelWidth= areaWidth;
		this.layer.style.pixelHeight= areaHeight;
		
		this.layer.style.clip = "rect(0 " +  areaWidth + " " + areaHeight +  " 0)";	
		this.layer.style.pixelWidth = areaWidth;
		this.leftClip = 0;
		this.rightClip = areaWidth;
		this.topClip = 0;
		this.bottomClip = areaHeight;
		this.layer.style.visibility = "visible";
		
		this.leftC = "this.leftClip";
		this.rightC = "this.rightClip";
		this.topC = "this.topClip";
		this.bottomC = "this.bottomClip";	

		this.jumpBy = ieJumpBy;	  				
		this.jumpTo = ieJumpTo;
		this.jumpByPage = ieJumpByPage;			
		this.jumpToPage = ieJumpToPage;	  				
		this.jumpToTop = ieJumpToTop;				
		this.jumpToBottom = ieJumpToBottom;		
		this.jumpToLeftMost = ieJumpToLeftMost;
		this.jumpToRightMost = ieJumpToRightMost;	
		this.scrollBy = ieScrollBy;				
		this.scrollByPage = ieScrollByPage;		
		this.scrollToPage = ieScrollToPage;		
		this.scrollToTop = ieScrollToTop;			
		this.scrollToBottom = ieScrollToBottom;	
		this.scrollToLeftMost = ieScrollToLeftMost;
		this.scrollToRightMost = ieScrollToRightMost; 
		this.setPos = ieSetPos;
		this.switchPage  = ieSwitchPage;
	}
}


//Implementation

function nsJumpBy(x,y) {
	this.stopScroll();
	this.layer.left -= x;				// Move the layer.
	this.layer.top -= y;				
										
	if (y > 0) {
		this.layer.clip.bottom += y;   	// Since you can´t set clip.top greater
		this.layer.clip.top += y;     	// than clip.bottom, you have to set the
	}								  	// clip.bottom value first. 
	else {							  									
		this.layer.clip.top += y;		
		this.layer.clip.bottom += y;	//Vice versa...
	}									
	if (x > 0) {
		this.layer.clip.right += x;
		this.layer.clip.left += x;
	}
	else {
		this.layer.clip.left += x;
		this.layer.clip.right += x;		
	}
	this.endOfPage = (this.layer.document.height <= this.layer.clip.bottom) ? true: false;
	this.topOfPage = (0 >= this.layer.clip.top) ? true: false;
}

function nsJumpTo(x,y) {
	this.jumpBy(x - this.layer.clip.left, y - this.layer.clip.top );
}


function nsJumpByPage(x, y) {
	this.jumpBy(x * this.layer.clip.width, y * this.layer.clip.height);
}


function nsJumpToPage(x, y) {
	this.jumpTo(x * this.layer.clip.width, y * this.layer.clip.height);
}

function nsJumpToTop() {
	this.jumpTo(this.layer.clip.left, 0); 
}

function nsJumpToBottom() {
	this.jumpTo(this.layer.clip.left, this.layer.document.height-this.layer.clip.height); 
}

function nsJumpToLeftMost() {
	this.jumpTo(0, this.layer.clip.top); 
}

function nsJumpToRightMost() {
	this.jumpTo(this.layer.document.width-this.layer.clip.width, this.layer.clip.top); 
}


function nsScrollBy(x, y) {
	var newXpos = this.layer.clip.left + x;
	var newYpos = this.layer.clip.top + y;
	this.scrollTo(newXpos, newYpos);
}	


function nsScrollByPage(x, y) {
	this.scrollBy(x * this.layer.clip.width, y * this.layer.clip.height);
}

function nsScrollToPage(x, y) {
	this.scrollTo(x * this.layer.clip.width, y * this.layer.clip.height);
}

function nsScrollToTop() {
	this.scrollTo(this.layer.clip.left, 0); 
}

function nsScrollToBottom() {
	this.scrollTo(this.layer.clip.left, this.layer.document.height-this.layer.clip.height); 
}

function nsScrollToLeftMost() {
	this.scrollTo(0, this.layer.clip.top); 
}

function nsScrollToRightMost() {
	this.scrollTo(this.layer.document.width-this.layer.clip.width, this.layer.clip.top); 
}


function nsSetPos(x,y) {
	this.layer.left = x;
	this.layer.top = y;
}	

function nsSwitchPage(layer) {
	var oldX =this.layer.left;
	var oldY =this.layer.top; 
	this.layer.visibility = "hide";
	this.layer = layer;
	this.layer.left = oldX;
	this.layer.top = oldY;		
	this.layer.clip.left = 0;
	this.layer.clip.right = this.areaWidth;
	this.layer.clip.top = 0;
	this.layer.clip.bottom = this.areaHeight;
	this.layer.visibility = "show";
}


function ieJumpBy(x,y) {
	this.stopScroll();
	this.layer.style.pixelLeft -= x;				// Move the layer.
	this.layer.style.pixelTop -= y;
					
	this.topClip += y; 
	this.rightClip += x;    										
	this.bottomClip += y;  	
	this.leftClip += x;

	this.layer.style.clip = "rect(" + this.topClip + " " +  this.rightClip + " " + this.bottomClip +  " " + this.leftClip +")";
	this.endOfPage = (this.layer.offsetHeight <= this.bottomClip) ? true: false;
	this.topOfPage = (0 >= this.topClip) ? true: false;
}


function ieJumpTo(x,y) {
	this.jumpBy(x - this.leftClip, y - this.topClip);
}


function ieJumpByPage(x, y) {
	this.jumpBy(x * (this.rightClip - this.leftClip) , y * (this.bottomClip - this.topClip));
}


function ieJumpToPage(x, y) {
	this.jumpTo(x * (this.rightClip -this.leftClip), y * (this.bottomClip - this.topClip));
}

function ieJumpToTop() {
	this.jumpTo(this.leftClip, 0); 
}

function ieJumpToBottom() {
	this.jumpTo(this.leftClip, this.layer.offsetHeight-(this.bottomClip - this.topClip)); 
}

function ieJumpToLeftMost() {
	this.jumpTo(0, this.topClip); 
}

function ieJumpToRightMost() {
	this.jumpTo(this.layer.offsetWidth-(this.rightClip -this.leftClip), this.topClip); 
}


function scrollTo(x, y) {
	var xinc,yinc;
	var xdiff = x - eval(this.leftC);  
	var ydiff = y - eval(this.topC);
	
	if (Math.abs(ydiff) > Math.abs(xdiff)) {
		xinc = this.incFunc(xdiff, ydiff);
		yinc  = (ydiff > 0) ? this.stepSize: -this.stepSize;
	}
	else {
		yinc = this.incFunc(ydiff, xdiff);
		xinc  = (xdiff > 0) ? this.stepSize: -this.stepSize;
	}

	if (Math.abs(ydiff) < this.stepSize -1 && Math.abs(xdiff) < this.stepSize -1) {
		this.stopScroll();
		this.jumpTo(x, y);
	}	
		
	else {	
		this.jumpBy(xinc, yinc);
		this.timer = setTimeout(this.me+".scrollTo(" + x + "," + y +")", this.speed);				
	}
}

function ieScrollBy(x, y) {
	var newXpos = this.leftClip + x;
	var newYpos = this.topClip + y;
	this.scrollTo(newXpos, newYpos);
}	

function ieScrollByPage(x, y) {
	this.scrollBy(x * (this.rightClip -this.leftClip) , y * (this.bottomClip - this.topClip));
}


function ieScrollToPage(x, y) {
	this.scrollTo(x * (this.rightClip -this.leftClip) , y * (this.bottomClip - this.topClip));
}

function ieScrollToTop() {
	this.scrollTo(this.leftClip, 0); 
}

function ieScrollToBottom() {
	this.scrollTo(this.leftClip, this.layer.offsetHeight -(this.bottomClip - this.topClip)); 
}

function ieScrollToLeftMost() {
	this.scrollTo(0, this.topClip); 
}

function ieScrollToRightMost() {
	this.scrollTo(this.layer.offsetWidth -(this.rightClip - this.leftClip), this.topClip); 
}

function ieSwitchPage(layer) {
	var oldX =this.layer.style.pixelLeft;
	var oldY =this.layer.style.pixelTop;
	this.layer.style.visibility = "hidden";
	this.layer = layer;
	this.layer.style.visibility = "visible";	
	this.layer.style.posTop = oldY;
	this.layer.style.posLeft = oldX;
	this.layer.style.pixelWidth = this.areaWidth;
	this.layer.style.pixelHeight = this.areaHeight;
	this.layer.style.clip = "rect(0 " +  this.areaWidth + " " + this.areaHeight +  " 0)";	

	this.leftClip = 0;
	this.rightClip = this.areaWidth;
	this.topClip = 0;
	this.bottomClip = this.areaHeight;	
}

function ieSetPos(x,y) {
	this.layer.style.pixelLeft = x;
	this.layer.style.pixelTop = y;
}	
function stopScroll() {
	if (this.timer !=0)
		clearTimeout(this.timer);
}
function ALAPI_ScrollArea(saName,layerObjNS,layerObjIE, areaWidth, areaHeight, stepSize, fps)  {
  if(navigator.appName == "Netscape") {
    eval('window.'+saName + '= new ScrollArea("' + saName + '",'+ layerObjNS +', '+ areaWidth +', '+ areaHeight +', '+ stepSize +', '+ fps +');');
  } else {
    eval('window.'+saName + '= new ScrollArea("' + saName + '",'+ layerObjIE +', '+ areaWidth +', '+ areaHeight +', '+ stepSize +', '+ fps +');');
  }
}
function ALAPI_SA_scrollToBottom(saName) { 
                eval('window.'+saName+'.scrollToBottom();'); 
}
function ALAPI_SA_ScrollToTop(saName) { 
                eval('window.'+saName+'.scrollToTop();'); 
}
function ALAPI_SA_jumpToPage(saName, xMove, yMove) { 
                eval("window."+saName+".jumpToPage("+xMove+", "+yMove+");"); 
}
function ALAPI_SA_scrollToPage(saName, xMove, yMove) { 
                eval("window."+saName+".scrollToPage("+xMove+", "+yMove+");"); 
}
function ALAPI_SA_stopScroll(saName) { 
                eval('window.'+saName+'.stopScroll();'); 
}