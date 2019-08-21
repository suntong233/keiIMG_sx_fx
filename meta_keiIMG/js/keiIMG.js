window.onload = function () {
    let count = 0;
    let flag;
    let spanDom = st('.root-topSpan');
    if (document.documentElement.clientWidth <= 640) {
        flag = true;
    } else {
        flag = false;
    }
    let main = st('.root-main'); //获取main div 插入图片的div
    window.addEventListener('resize', stFD(chooseRender, 300));
    function chooseRender() { //根据窗口大小选择渲染方式
        let windowWidth = document.documentElement.clientWidth; //获取可视宽高
        if (windowWidth <= 640) { //判断是不是移动端
            if (flag == false) {
                flag = true;
                main.innerHTML = '';
                location.reload() 
            }
        } else { //pc端
            if (flag == true) {
                flag = false;
                main.innerHTML = '';
                location.reload() 
            }
        }
    }

    function renderImgbox1() { // 渲染方式1 移动
        main.innerHTML = '';
        let domLeft = stCEI('div', '', 'domLeft');
        let domRight = stCEI('div', '', 'domRight');
        imgData.forEach((item, key) => {
            let imgDom = stCEI('img', '', 'imgAll');
            imgDom.title = item.title;
            imgDom.dataset.src = item.srcL;
            imgDom.dataset.tsrc = item.src;
            stCss(imgDom, {
                height: '200px',
                opacity: '0',
            })
            imgDom.alt = '';
            if (key % 2 == 0) {
                domLeft.appendChild(imgDom);
            } else {
                domRight.appendChild(imgDom);
            }
        })
        main.appendChild(domLeft);
        main.appendChild(domRight);
        opfineImg(main);
        lazyLoad();
    }

    function renderImgbox2() { // 渲染方式2 pc
        main.innerHTML = '';
        let dom1 = stCEI('div', '', 'domdiv');
        let dom2 = stCEI('div', '', 'domdiv');
        let dom3 = stCEI('div', '', 'domdiv');
        let dom4 = stCEI('div', '', 'domdiv');
        let renderDom = 1;
        imgData.forEach((item) => {
            let imgDom = stCEI('img', '', 'imgAll');
            imgDom.title = item.title;
            stCss(imgDom, {
                height: '500px',
                opacity: '0'
            })
            imgDom.dataset.src = item.srcL;
            imgDom.dataset.tsrc = item.src;
            imgDom.alt = '';
            switch (renderDom) {
                case 1:
                    dom1.appendChild(imgDom);
                    renderDom = 2;
                    break;
                case 2:
                    dom2.appendChild(imgDom);
                    renderDom = 3;
                    break;
                case 3:
                    dom3.appendChild(imgDom);
                    renderDom = 4;
                    break;
                case 4:
                    dom4.appendChild(imgDom);
                    renderDom = 1;
                    break;
            }
        })
        main.appendChild(dom1);
        main.appendChild(dom2);
        main.appendChild(dom3);
        main.appendChild(dom4);
        opfineImg(main);
        lazyLoad();
    }
    if (flag == true) {
        renderImgbox1();
    } else {
        renderImgbox2();
    }

    function lazyLoad() {
        let imgs = sts('.imgAll');
        loadImg(imgs);
        window.addEventListener('scroll', function () {
            loadImg(imgs);
        });

        function loadImg(arr) {
            arr.forEach((item) => {
                if (item.getBoundingClientRect().top < document.documentElement.clientHeight && !item.isLoad) {
                    item.isLoad = true;
                    count++;
                    spanDom.innerHTML = count;
                    let src = item.dataset.src;
                    setTimeout(function () {
                        aftLoadImg(item, src);
                    }, 10)
                }
            })
        }
    }

    function aftLoadImg(obj, src) {
        let oImg = new Image();
        oImg.onload = function () {
            stCss(obj, {
                animation: 'myImgLazy 1000ms linear',
            });
            obj.src = oImg.src;
        }
        stCss(obj, {
            height: 'auto',
            opacity: '1'
        })
        oImg.src = src;
    }
}

function opfineImg(dom) {
    dom.addEventListener('click', function (e) {
        if (e.target.tagName == 'IMG' && e.target.className == 'imgAll') {
            let newsrc = e.target.dataset.tsrc;
            createMotai(newsrc, dom);
        }
    })
}

function createMotai(newsrc, dom) {
    let mimg = stCEI('img','','ming');
    mimg.src = newsrc;
    let mOdiv = stCEI('div', '', 'mOdiv');
    mOdiv.appendChild(mimg);
    dom.appendChild(mOdiv);
    mOdiv.onclick = function(){
        dom.removeChild(mOdiv);
    }
}