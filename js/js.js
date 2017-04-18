//封装一个$选择器
function $(el) {
	var a = document.querySelectorAll(el);
	if(a.length > 1) {
		return a;
	} else {
		return a[0];
	}
}

//声明歌曲数组
var musicArr = [
	{'SongCover':'1','music':'1','song':'Memories Of You','singer':'Approaching Nirvana'},
	{'SongCover':'2','music':'2','song':'The Ocean(Radio Edit)','singer':'Mike Perry'},
	{'SongCover':'3','music':'3','song':'Real','singer':'Capo Productions'},
	{'SongCover':'4','music':'4','song':'Photograph (Felix Jaehn Remix)','singer':'Ed Sheeran Felix Jaehn'},
	{'SongCover':'5','music':'5','song':'Vision','singer':'Elektronomia'}
]
for(var i=0; i<musicArr.length; i++){
	$('#musicCover').style.background = 'url(img/'+ (musicArr[0].SongCover) +'.jpg) no-repeat';
	$('#musicCover').style.backgroundSize = 'cover';
	$('#musicName').innerHTML = musicArr[0].song;
	$('#musicSinger').innerHTML = musicArr[0].singer;
}
var bofangB = true;

//点击显示/隐藏音量盒子
var yl = 0;
$('#yinliang_ico').addEventListener('click',function(){
	yl++;
	if(yl %2 == 1){
		$('#yinliangBox').style.display = 'block';
	}else{
		$('#yinliangBox').style.display = 'none';
	}
},false)



//封装随机换歌函数
function randomMusic(){
	for(var i=0,len = musicArr.length; i<len; i++){
		var t = ~~(Math.random()*len);
		$('#musicCover').style.background = 'url(img/'+ (musicArr[t].SongCover) +'.jpg) no-repeat';
		$('#musicCover').style.backgroundSize = 'cover';
		$('#musicName').innerHTML = musicArr[t].song;
		$('#musicSinger').innerHTML = musicArr[t].singer;
		$('#audio').src = 'music/'+musicArr[t].music+'.mp3';
		$('#playM').className = "icon-pause2";
	}
}

//点击随机播放/循环播放
$('#suijiM').addEventListener('click', function() {
	if($('#suijiM').className == "icon-pause2"){
		bofangB = false;
		randomMusic();
		$('#audio').play();
	}else{
		bofangB = true;
		randomMusic();
		$('#audio').play();
	}
}, false)


//点击播放图标开始播放歌曲并切换svg图标
$('#playM').addEventListener('click', function() {
	bofangB = !bofangB
	if(bofangB || $('#playM').className == "icon-pause2"){
		$('#audio').pause();
		$('#playM').className = "icon-play3";
	}else if(!bofangB || $('#playM').className == "icon-play3"){
		$('#playM').className = "icon-pause2";
		$('#audio').play();
	}
}, false)

//音量控制功能
$('#voluNode').onmousedown = function(e) {
	var ev = e || event;
	var voluY = ev.clientY - this.offsetTop;
	//console.log(voluY)
	document.onmousemove = function(e) {
		var ev = e || event;
		var needT = ev.clientY - voluY;
		var maxT = $('#volume').offsetHeight - $('#voluNode').offsetHeight;
		needT = needT < 0 ? 0 : needT;
		needT = needT > maxT ? maxT : needT;
		$('#voluNode').style.top = needT + 'px';
		$('#yl_lineTo').style.height = needT / maxT * 100 + '%';
		//console.log(yl_lineTo.style.height)
		$('#audio').volume = 1 - $('#voluNode').offsetTop / maxT;
	};
	document.onmouseup = function() {
		document.onmousemove = document.onmouseup = null;
	};
	return false;
}

//进度条播放时的当前进度
audio.addEventListener('timeupdate', function() {
	var maxW = $('#timeLine').offsetWidth - $('#lineNode').offsetWidth;
	var needW = audio.currentTime / audio.duration;
	$('#lineTo').style.width = needW * 100 + '%';
	$('#lineNode').style.left = maxW * needW + 'px';
}, false);

//进度条拖拽快进功能
$('#lineNode').onmousedown = function(e) {
	ev = e || event;
	var TimePoL = ev.clientX - $('#lineNode').offsetLeft;
	$('#audio').pause();
	//console.log(voluY)
	document.onmousemove = function(e) {
		ev = e || event;
		needL = ev.clientX - TimePoL;
		maxL = $('#timeLine').offsetWidth - $('#lineNode').offsetWidth;
		needL = needL < 0 ? 0 : needL;
		needL = needL > maxL ? maxL : needL;
		$('#audio').currentTime = $('#audio').duration * needL / maxL;
		$('#lineTo').style.width = needL / maxL * 100 + '%';
		$('#lineNode').style.left = needL + 'px';
	};
	document.onmouseup = function() {
		if(!bofangB) $('#audio').play();
		document.onmousemove = document.onmouseup = null;
	};
}

//进度条点击快进
$('#timeLine').addEventListener('click',function(e){
	var ev = e || event;
	var nowPoint = ev.clientX - music_box.offsetLeft - jindutiao.offsetLeft - timeLine.offsetLeft;
	$('#audio').currentTime = $('#audio').duration * nowPoint / timeLine.offsetWidth;
	lineTo.style.width = nowPoint / timeLine.offsetWidth * 100 + '%';
	lineNode.style.left = nowPoint + 'px';
	//console.log(nowPoint)
},false)

//封装下一首函数
function nextMusic(){
	index++;
	if(index == musicArr.length)index = 0;
	$('#audio').src = 'music/'+musicArr[index].music+'.mp3';
	$('#playM').className = "icon-pause2";
	$('#musicCover').style.background = 'url(img/'+ (musicArr[index].SongCover) +'.jpg) no-repeat';
	$('#musicCover').style.backgroundSize = 'cover';
	$('#musicName').innerHTML = musicArr[index].song;
	$('#musicSinger').innerHTML = musicArr[index].singer;
	$('#audio').play();
}

//点击下一首功能
var index = 0;
$('#nextM').addEventListener("click", function() {
	if($('#playM').className == "icon-pause2"){
		bofangB = false;
		nextMusic();
	}else{
		bofangB = true;
		nextMusic();
	}
}, false);

//封装上一首函数
function prevMusic(){
	if(index == 0)index = musicArr.length;
	index--;
	$('#audio').src = 'music/'+musicArr[index].music+'.mp3';
	$('#playM').className = "icon-pause2";
	$('#musicCover').style.background = 'url(img/'+ (musicArr[index].SongCover) +'.jpg) no-repeat';
	$('#musicCover').style.backgroundSize = 'cover';
	$('#musicName').innerHTML = musicArr[index].song;
	$('#musicSinger').innerHTML = musicArr[index].singer;
	$('#audio').play();
}

//点击上一首功能
$('#prevM').addEventListener("click", function() {
	if($('#playM').className == "icon-pause2"){
		bofangB = true;
		prevMusic();
	}else{
		bofangB = false;
		prevMusic();
	}
}, false);

//播放结束自动播放下一首功能
$('#audio').addEventListener("ended", function() {
	index++;
	if(index == musicArr.length)index = 0;
	$('#audio').src = 'music/'+musicArr[index].music+'.mp3';
	$('#playM').className = "icon-pause2";
	$('#musicCover').style.background = 'url(img/'+ (musicArr[index].SongCover) +'.jpg) no-repeat';
	$('#musicCover').style.backgroundSize = 'cover';
	$('#musicName').innerHTML = musicArr[index].song;
	$('#musicSinger').innerHTML = musicArr[index].singer;
	$('#audio').play();
}, false)





