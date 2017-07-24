
window.onload=function()
{
	var oBanfpr=document.getElementById('ban-fpr');
	var oList=document.getElementById('list');
	var oDots=document.getElementById('dots').getElementsByTagName('span');
	var oPrev = document.getElementById('prev');
    var oNext = document.getElementById('next');
    var index=1;
    var animated=false;
    var time; //定时器

    function showDots()
    {
    	for (var i = 0; i < oDots.length; i++) {
    		if (oDots[i].className='on') 
    		{
    			oDots[i].className='';
    		}
    	}
		oDots[index-1].className='on';
    }

    function animate(offset)
    {
    	animated=true;
    	var newLeft=parseInt(oList.style.left)+offset;
		var timer=300;  /*位移总时间*/
		var interval=10;  //位移间隔时间
		var speed=offset/(timer/interval);  //每次位移量

		function go()
		{
			if ( (speed<0 && parseInt(oList.style.left)>newLeft)||
				 (speed>0 && parseInt(oList.style.left)<newLeft) ) 
			{
				oList.style.left=parseInt(oList.style.left)+speed+'px';
				setTimeout(go,interval);
			}
			else
			{
				animated=false;
				oList.style.left=newLeft+'px';
				if (newLeft>-730) 
				{
					oList.style.left=-5840+'px';
				}
				if (newLeft<-5840) 
				{
					oList.style.left=-730+'px';
				}
			}
		}
		go();
    }

    function play()
    {
		time=setInterval(function()
		{
			oNext.onclick();
		},3000)
    }

    function stop()
    {
    	clearInterval(time);
    }

    oNext.onclick=function()
    {
    	if (index==8) 
    	{
    		index=1;
    	}
    	else
    	{
    	index+=1;
	    }

    	showDots();
    	if (!animated) {
    		animate(-730);
    	}
    }
    oPrev.onclick=function()
    {
    	if (index==1) 
    	{
    		index=8;
    	}
    	else
    	{
    	index-=1;
	    }
    	showDots();
    	if (!animated) {
    		animate(730);
    	}
    	
    }

    for (var i = 0; i < oDots.length; i++) {
    	oDots[i].onclick=function()
    	{
    		var myIndex=parseInt(this.getAttribute('index'));
    		var offSet=-730*(myIndex-index);
    		
    		index=myIndex;
    		showDots();
    		if (!animated) {
    			animate(offSet);
    		}
    		
    	}
    }

    oBanfpr.onmouseover=stop;
    oBanfpr.onmouseout=play;

    play();

}
