var dft = $('dft'),
	bft = $('bft'),
	dfs = $('dfs'),
	bfs = $('bfs'),
	root = $('level1'),
	input = $('input'),
	timer,
	lock = false,
	flag = false,     //标记查询时是否找到
	divs = [],        //渲染的顺序数组
	queue = [];       //广度优先遍历的队列
	

function $(id){
	return document.getElementById(id);
}

//事件绑定，浏览器兼容
function addEvent(ele,type,handler){
	if(ele.addEventListener){
		ele.addEventListener(type,handler,false);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+type,handler);
	}
	else{
		ele["on"+type] = handler;
	}
}

//深度优先遍历
function dftFun(node){
	divs.push(node);
	for(var i=0;i<node.children.length;i++){
		if(node.children[i]){
			dftFun(node.children[i]);
		}
	}
}

//广度优先遍历
function bftFun(node){  
	queue = [];  
	var v;    
	queue.push(node);
	divs.push(node);
	while(queue.length > 0){
		v = queue.shift();
		for(var i=0;i<v.children.length;i++){
			queue.push(v.children[i]);
			divs.push(v.children[i]);
		}
	}
}

//清除所有颜色
function clearAll(){
	for(var i=0;i<divs.length;i++){
		divs[i].style.background = "#ffffff";
	}
}

//清除颜色，保留匹配查询内容的div颜色
function clearColor(num,value){
	for(var i=0;i<num;i++){
		if(isSearch(divs[i],value)){
			divs[i].style.background = "#00dd00";
		}else{
			divs[i].style.background = "#ffffff";
		}
	}
}

//判断是否是查询的内容
function isSearch(node,value){
	if(node.firstChild.nodeValue.trim()==value){
		flag = true;
		return true;
	}else{
		return false;
	}
}
//渲染
function render(value){
	lock = true;
	clearAll();
	var i = 0;
	timer = setInterval(change, 500);
	function change(){
		clearColor(i,value);
		if(i<divs.length){
			if(isSearch(divs[i])){
				divs[i].style.background = "#00dd00";
			}else{
				divs[i].style.background = "#ff0000";
			}
			i++;
		}else{
			if(value!='' && !flag){
				alert("对不起，没找到");
			}
			clearInterval(timer);
			divs = [];
			flag = false;
			lock = false;
		}
	}
}

//初始化
function init(){
	addEvent(dft,"click",function(){
		if(lock){
			alert("正在遍历中，请稍后再试！");
		}else{
			dftFun(root);
			render("");
		}
	});
	addEvent(bft,"click",function(){
		if(lock){
			alert("正在遍历中，请稍后再试！");
		}else{
			bftFun(root);
			render("");		}
	});
	addEvent(dfs,"click",function(){
		if(lock){
			alert("正在遍历中，请稍后再试！");
		}else{
			if(!input.value){
				alert("请输入要搜索的内容！");
				return;
			}else{
				dftFun(root);
				render(input.value.trim());
			}
		}
	});
	addEvent(bfs,"click",function(){
		if(lock){
			alert("正在遍历中，请稍后再试！");
		}else{
			if(!input.value){
				alert("请输入要搜索的内容！");
				return;
			}else{
				bftFun(root);
				render(input.value.trim());
			}
		}
	});
}

init();