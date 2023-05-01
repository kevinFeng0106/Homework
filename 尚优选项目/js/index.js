// 等待全部加载完毕
window.onload = () => {
    // 路径导航数据渲染
    navPathDataBind();
    function navPathDataBind() {
        let navPath = document.getElementById('navPath');
        console.log(navPath);
        // 因为已经在html文件中引入了data.js，所以可以直接用
        // 获取数据 
        let path = goodData.path;
        console.log(path);

        for (let i = 0; i < path.length - 1; i++) {
            let aNode = document.createElement('a');
            aNode.href = path[i].url;
            aNode.innerHTML = path[i].title;

            let iNode = document.createElement('i');
            iNode.innerHTML = '/';

            navPath.appendChild(aNode);
            navPath.appendChild(iNode);
        }
        let aLastNode = document.createElement('a');
        // 最后一个a不添加href
        aLastNode.innerHTML = path[path.length - 1].title;
        navPath.appendChild(aLastNode);
    }

    // 放大镜移入移出效果
    bigClassBind();
    function bigClassBind() {
        let smallPic = document.getElementById('smallPic');
        let mask = document.querySelector('.mask');
        let bigPic = document.getElementById('bigPic');
        let leftTop = document.getElementById('leftTop');
        console.log(smallPic);
        console.log(mask);
        console.log(bigPic);
        console.log(leftTop);

        smallPic.addEventListener('mouseenter', function () {
            mask.style.display = 'block';
            bigPic.style.display = 'block';
            smallPic.addEventListener('mousemove', move);
        })

        smallPic.addEventListener('mouseleave', function () {
            mask.style.display = 'none';
            bigPic.style.display = 'none';
            smallPic.removeEventListener('mousemove', move);
        })

        // 鼠标移动函数
        function move(e) {
            let x = e.clientX - smallPic.getBoundingClientRect().left - mask.offsetWidth / 2;
            let y = e.clientY - smallPic.getBoundingClientRect().top - mask.offsetHeight / 2;

            // 控制边界
            if (x <= 0) {
                x = 0;
            }
            if (x >= smallPic.clientWidth - mask.offsetWidth) {
                x = smallPic.clientWidth - mask.offsetWidth;
            }
            if (y <= 0) {
                y = 0;
            }
            if (y >= smallPic.clientHeight - mask.offsetHeight) {
                y = smallPic.clientHeight - mask.offsetHeight;
            }
            mask.style.left = x + 'px';
            mask.style.top = y + 'px';

            let bigImg = document.querySelector('#bigPic img');
            //console.log(bigImg);
            let smallScale = smallPic.clientWidth - mask.offsetWidth;
            let bigScale = bigImg.offsetWidth - bigPic.clientWidth;
            // 大图与蒙版的可移动距离之比是1：2
            let scale = smallScale / bigScale;
            bigImg.style.left = -x / scale + 'px';
            bigImg.style.top = -y / scale + 'px';
        }
    }

    // 缩略图动态渲染
    thumbnailData();
    function thumbnailData() {
        let ul = document.querySelector('#piclist ul');
        console.log(ul);
        let imagessrc = goodData.imagessrc;
        console.log(imagessrc);

        // 动态添加图片
        for (let i = 0; i < imagessrc.length; i++) {
            let newLi = document.createElement('li');
            let smallImg = document.createElement('img');
            smallImg.src = imagessrc[i].s;
            newLi.appendChild(smallImg);
            ul.appendChild(newLi);
        }
    }

    // 大小图切换效果
    thumbnailClick();
    function thumbnailClick() {
        let smallPic = document.querySelector('#smallPic img');
        let bigPic = document.querySelector('#bigPic img');
        console.log(smallPic);
        console.log(bigPic);
        let thumbnail = document.querySelectorAll('#piclist ul li img');
        console.log(thumbnail);

        // 小图框中的初始图片必须与缩略图第一张一致
        smallPic.src = thumbnail[0].src;
        bigPic.src = goodData.imagessrc[0].b;

        // 给每张小图增加点击事件
        for (let i = 0; i < thumbnail.length; i++) {
            thumbnail[i].addEventListener('click', function () {
                smallPic.src = this.src;
                bigPic.src = goodData.imagessrc[i].b;
            })
        }
    }

    // 缩略图的起始位置
    let pos = 0;

    // 左右箭头点击轮播
    thumbnailArrowClick();
    function thumbnailArrowClick() {
        let prev = document.querySelector('#leftBottom .prev');
        let next = document.querySelector('#leftBottom .next');
        console.log(prev);
        console.log(next);
        let piclist = document.querySelector('#piclist');
        let ul = document.querySelector('#piclist ul');
        let liNodes = document.querySelectorAll('#piclist ul li');
        console.log(piclist);
        console.log(ul);
        console.log(liNodes);

        // 步长
        let step = (liNodes[0].offsetWidth + 20) - 0.5;

        // 可移动距离
        let endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20);

        next.addEventListener('click', function () {
            pos += step;
            if (pos > endPosition) {
                pos = endPosition;
            }
            ul.style.left = -pos + 'px';
        })

        prev.addEventListener('click', function () {
            pos -= step;
            if (pos < 0) {
                pos = 0;
            }
            ul.style.left = -pos + 'px';
        })
    }

    // 商品详情数据渲染
    rightTopData();
    function rightTopData() {
        let goodsDetail = goodData.goodsDetail;
        console.log(goodsDetail);
        let rightTop = document.querySelector('.rightTop');
        console.log(rightTop);

        // 字符串搭建页面结构
        let str = `<h3>${goodsDetail.title}</h3>
        <p>推荐选择下方[移动优惠购],手机套餐齐搞定,不用换号,每月还有花费返</p>
        <!-- 红色区域价格部分 -->
        <div class="priceWrap">
            <!-- 价格 -->
            <div class="priceTop">
                <!-- 左边 -->
                <span>价&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                <div class="price">
                    <span>￥</span>
                    <p>${goodsDetail.price}</p>
                    <i>降价通知</i>
                </div>
                <!-- 右边 -->
                <p>
                    <span>累计评价</span>
                    <span>${goodsDetail.evaluateNum}</span>
                </p>
            </div>
            <!-- 促销 -->
            <div class="priceBottom">
                <span>促&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <p>
                    <span>${goodsDetail.promoteSales.type}</span>
                    <span>${goodsDetail.promoteSales.content}</span>

                </p>
            </div>
        </div>
        <div class="support">
            <span>支&nbsp;&nbsp;&nbsp;&nbsp;持</span>
            <p>${goodsDetail.support}</p>
        </div>
        <div class="address">
            <span>配&nbsp;送&nbsp;至</span>
            <p>${goodsDetail.address}</p>
        </div>`;

        rightTop.innerHTML = str;
    }

    // 商品参数动态渲染
    rightBottomData();
    function rightBottomData() {
        let crumbData = goodData.goodsDetail.crumbData;
        let chooseWrap = document.querySelector('.chooseWrap');
        console.log(chooseWrap);
        console.log(crumbData);

        for (let i = 0; i < crumbData.length; i++) {
            let dl = document.createElement('dl');
            let dt = document.createElement('dt');
            dt.innerHTML = crumbData[i].title;
            dl.appendChild(dt);

            // 生成每个dd
            for (let j = 0; j < crumbData[i].data.length; j++) {
                let dd = document.createElement('dd');
                dd.innerHTML = crumbData[i].data[j].type;
                dd.price = crumbData[i].data[j].changePrice;
                console.log(dd.price);
                dl.appendChild(dd);
            }

            chooseWrap.appendChild(dl);
        }
    }

    // 点击排他效果
    clickBind();
    function clickBind() {
        let dlNodes = document.querySelectorAll('.chooseWrap dl');
        console.log(dlNodes);
        let choose = document.querySelector('.choose');
        console.log(choose);

        // 创建一个容纳商品参数的容器
        let arr = new Array(dlNodes.length);
        arr.fill(0);
        console.log(arr);

        // 遍历所有dl
        for (let i = 0; i < dlNodes.length; i++) {
            let ddNodes = dlNodes[i].querySelectorAll('dd');
            console.log(ddNodes);

            // 遍历每个dl中的所有dd
            for (let j = 0; j < ddNodes.length; j++) {
                ddNodes[j].addEventListener('click', function () {
                    // 排他
                    for (let j = 0; j < ddNodes.length; j++) {
                        ddNodes[j].style.color = '#666';
                    }
                    // 最后修改自己的样式
                    this.style.color = '#e1251b';

                    // 对应的dl下标填入数据
                    arr[i] = this;

                    // 调用价格变动函数
                    changePriceBind(arr);

                    // 动态创建元素
                    choose.innerHTML = '';
                    arr.forEach(function (value, index) {
                        if (value !== 0) {
                            let mark = document.createElement('div');
                            mark.id = 'mark';
                            let aNode = document.createElement('a');
                            aNode.href = 'javascript:;';
                            // 对a进行下标标识
                            aNode.index = index;
                            aNode.innerText = 'X';
                            mark.innerText = value.innerText;

                            mark.appendChild(aNode);
                            choose.appendChild(mark);
                        }
                    })

                    // 删除商品参数操作
                    // 必须要写在创建的时候的里面，否则写在外面的话在a没有生成时会出错
                    let aNodes = document.querySelectorAll('#mark a');
                    console.log(aNodes);

                    for (let k = 0; k < aNodes.length; k++) {
                        aNodes[k].addEventListener('click', function () {
                            // 获取对应dlNode中的所有ddNodes
                            let ddNodes = dlNodes[this.index].querySelectorAll('dd');
                            // 取消选择参数的颜色
                            for (let n = 0; n < ddNodes.length; n++) {
                                ddNodes[n].style.color = '#666';
                            }
                            // 清除arr中对应的内容
                            arr[this.index] = 0;
                            console.log(arr);

                            changePriceBind(arr);

                            // 删除choose中对应的mark
                            choose.removeChild(this.parentNode);
                        })
                    }
                })
            }
        }
    }

    // 价格变动效果
    function changePriceBind(arr) {
        let oldPrice = document.querySelector('.priceTop .price p');
        console.log(oldPrice);
        let defaultPrice = goodData.goodsDetail.price;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== 0) {
                defaultPrice += arr[i].price;
            }
        }
        oldPrice.innerText = defaultPrice;

        // 将变化后的价格写到套餐联动中
        let totalPrice = document.querySelector('.chooseBox .right i');
        console.log(totalPrice);
        let basePrice = document.querySelector('.listWrap .left p');
        console.log(basePrice);
        let checkboxs = document.querySelectorAll('.chooseBox .middle input');
        console.log(checkboxs);
        let leftPrice = document.querySelectorAll('.chooseBox .middle li div span');
        console.log(leftPrice);
        basePrice.innerText = '￥' + defaultPrice;

        // 同时还要判断复选框，防止顺序错乱导致错误
        for (let i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].checked) {
                defaultPrice += Number(leftPrice[i].innerText);
            }
        }
        totalPrice.innerText = '￥' + defaultPrice;
    }

    // 选择搭配套餐联动效果
    choosePrice();
    function choosePrice() {
        let checkboxs = document.querySelectorAll('.chooseBox .middle input');
        console.log(checkboxs);
        let leftPrice = document.querySelectorAll('.chooseBox .middle li div span');
        console.log(leftPrice);
        let totalPrice = document.querySelector('.chooseBox .right i');
        console.log(totalPrice);

        for (let i = 0; i < checkboxs.length; i++) {
            checkboxs[i].addEventListener('click', function () {
                // 基础价
                let basePrice = parseInt(document.querySelector('.listWrap .left p').innerText.slice(1));
                console.log(basePrice);

                // 每次点击后判断哪些是选中的
                for (let j = 0; j < checkboxs.length; j++) {
                    if (checkboxs[j].checked) {
                        basePrice += parseInt(leftPrice[j].innerText);
                    }
                }

                totalPrice.innerText = '￥' + basePrice;
            })
        }
    }

    // 公共选项卡点击函数
    function Tab(tabBtns, tabContents) {
        for (let i = 0; i < tabBtns.length; i++) {
            tabBtns[i].addEventListener('click', function () {
                // 排他
                for (let j = 0; j < tabBtns.length; j++) {
                    tabBtns[j].className = '';
                }
                this.className = 'active';

                // 对应内容显示
                for (let j = 0; j < tabContents.length; j++) {
                    tabContents[j].style.display = 'none';
                }
                tabContents[i].style.display = 'block';
            })
        }
    }

    // 点击左侧选项卡
    leftTab();
    function leftTab() {
        let leftBtns = document.querySelectorAll('.leftAside .asideTop h4');
        console.log(leftBtns);
        let leftContents = document.querySelectorAll('.leftAside .asideContent div');
        console.log(leftContents);

        Tab(leftBtns, leftContents);
    }

    // 点击右侧选项卡
    rightTab();
    function rightTab() {
        let rightBtns = document.querySelectorAll('.rightDetail .BottomDetail .tabBtns li');
        console.log(rightBtns);
        let rightContents = document.querySelectorAll('.rightDetail .BottomDetail .tabContents div');
        console.log(rightContents);

        Tab(rightBtns, rightContents);
    }

    // 右边侧边栏点击效果
    rightSlide();
    function rightSlide() {
        let rightContent = document.querySelector('.rightAside');
        console.log(rightContent);

        let asideBtnClose = document.querySelector('.rightAside .btnClose');
        console.log(asideBtnClose);
        asideBtnClose.addEventListener('click', function () {
            this.classList.remove('btnClose');
            this.classList.add('btnOpen');

            // 有了open的类名之后才可以绑定点击事件
            let asideBtnOpen = document.querySelector('.rightAside .btnOpen');
            console.log(asideBtnOpen);
            asideBtnOpen.addEventListener('click', function () {
                this.classList.remove('btnOpen');
                this.classList.add('btnClose');
            })
        })
    }
}