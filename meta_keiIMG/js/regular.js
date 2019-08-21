function st(n) { // 获取单个dom元素
    return document.querySelector(n);
}

function sts(n) { //获取多个dom元素
    return document.querySelectorAll(n);
}

function stCE(n) { //创建一个dom
    return document.createElement(n);
}

function stCEI(n, c, s) { //创建一个dom并写出内容
    let dom = document.createElement(n);
    if (s) {
        dom.classList.add(s);
    }
    dom.innerHTML = c;
    return dom;
}

function stCss(stDom, stCss) { //修改一个节点的css  它接收一个对象
    let str = ''
    for (let i in stCss) {
        str = str + i + ': ' + stCss[i] + ';\n'
    }
    stDom.style.cssText += str;
}

function stFlex(stdom, col) { //添加flex垂直水平居中
    if (col) {
        stdom.style.cssText += 'display: flex;flex-direction: column;justify-content: space-evenly;align-items: center;';
        return
    }
    stdom.style.cssText += 'display:flex;justify-content:center;align-items:center;';
}

function stCopy(p){     //浅拷贝
    if(p.constructor == Array){
        var c = []
    }else{
        var c = {}
    }
    for (let i in p){
        c[i] = p[i];
    }
    c.uber = p;
    return c;
}

function stDeepC(p, c) {    //深拷贝
    var c = c || {};
    for (let i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            stDeepC(p[i], c[i])
        } else {
            c[i] = p[i];
        }
    }
    return c;
}

function stFD(fun, wait) { //防抖函数
    let timer = null;
    return function(){
        let that = this;
        let args = arguments;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            fun.apply(that, args);
        },wait);
    }
}