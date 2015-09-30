;
(function ($) {
    var LightBox = function () {
        var self = this;
        //创建遮罩和弹出框
        this.popupMask = $('<div id="G-lightbox-mask">');
        this.popupWin = $('<div id="G-lightbox-popup">');
        //保存body
        this.bodyNode = $(document.body);
        //渲染剩余的dom，并且插入到body
        this.renderDOM();
        this.picViewArea = this.popupWin.find(".lightbox-pic-view");//图片展示区域
        this.popupPic = this.popupWin.find(".lightbox-image");
        this.prevBtn = this.picViewArea.find(".lightbox-prev-btn");//左按钮
        this.nextBtn = this.picViewArea.find(".lightbox-next-btn");//右按钮
        this.picCaptionArea = this.popupWin.find(".lightbox-pic-caption");//图片标题区域
        this.captionText = this.picCaptionArea.find(".lightbox-pic-desc");//图片标题
        this.currentIndex = this.picCaptionArea.find(".lightbox-of-index");//索引
        this.closeBtn = this.picCaptionArea.find(".lightbox-close-btn");//关闭按钮
        //准备开发时间委托，获取组数据
        this.groupName = null;
        this.groupData = [];//放置同一组数据
        this.bodyNode.delegate("js-lightbox,*[data-role=lightbox]","click", function(e) {
            //阻止事件冒泡 
            e.stopPropagation();
            //$(this)为点击的对象
            var currentGroupName = $(this).attr("data-group");

            if (currentGroupName != self.groupName) {
                self.groupName = currentGroupName;
                //根据当前组名获取同一组数据
                self.getGroup();
            }
            self.initPouup($(this));
        });
        this.popupMask.click(function () {
            $(this).fadeOut();
            self.popupWin.fadeOut();
        });
        this.closeBtn.click(function () {
            self.popupMask.fadeOut();
            self.popupWin.fadeOut();
        });
        this.prevBtn.click(function () {

        }).mouseover(function () {
            $(this).addClass("lightbox-prev-btn-show");
        }).mouseout(function () {
            $(this).removeClass("lightbox-prev-btn-show");
        });
        this.nextBtn.click(function () {

        }).mouseover(function () {
            $(this).addClass("lightbox-next-btn-show");
        }).mouseout(function () {
            $(this).removeClass("lightbox-next-btn-show");
        });

    };
    LightBox.prototype = {
        showMaskAndPopup: function (sourceSrc, currentId) {
            var self = this;
            this.popupPic.hide();
            this.picCaptionArea.hide();
            this.popupMask.fadeIn();

            var winWidth = $(window).width();
            var winHeight = $(window).height();
            this.picViewArea.css({ width: winWidth / 2, height: winHeight / 2 });
            this.popupWin.fadeIn();

            var viewHeight = winHeight / 2 + 10;

            this.popupWin.css({
                width: winWidth / 2 + 10,
                height: winHeight / 2 + 10,
                marginLeft: -(winWidth / 2 + 10) / 2,
                top: -viewHeight
            }).animate({top:(winHeight-viewHeight)/2}, function() {
                //加载图片
                self.loadPicSize(sourceSrc);
            });
            //根据当前点击元素的id获取在当前组别中的索引
            this.index = this.getIndexOf(currentId);
            var groupLength = this.groupData.length;
            if (groupLength > 1) {
                if (this.index === 0) {
                    this.prevBtn.addClass("disabled");
                    this.nextBtn.removeClass("disabled");
                } else if (this.index === groupLength-1) {
                    this.prevBtn.removeClass("disabled");
                    this.nextBtn.addClass("disabled");
                } else {
                    this.prevBtn.removeClass("disabled");
                    this.nextBtn.removeClass("disabled");
                }
            }
        },
        loadPicSize: function (sourceSrc) {
            var self = this;
            //先清除之前设置的图片宽高
            self.popupPic.css({width:"auto",height:"auto"}).hide();
            this.preLoadPic(sourceSrc, function () {
                self.popupPic.attr("src", sourceSrc);
                var picWidth = self.popupPic.width(), picHeight = self.popupPic.height();
                self.changePic(picWidth,picHeight);
            });
        },
        changePic: function (picWidth, picHeight) {
            var self = this;
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            //计算宽度高度
            //如果图片宽高是否超出窗口宽高
            var scale = Math.min(winWidth / (picWidth + 10), winHeight / (picHeight + 10), 1);
            picHeight *= scale; picWidth *= scale;
            this.picViewArea.animate({
                width:picWidth-10,height:picHeight-10
            });
            this.popupWin.animate({
                width: picWidth,
                height: picHeight,
                marginLeft: -(picWidth / 2),
                top: (winHeight-picHeight)/2
            }, function () {
                self.popupPic.css({
                    width: picWidth-10,
                    height: picHeight-10
                }).fadeIn();
                self.picCaptionArea.fadeIn();
            });
            //设置描述文字和索引
            this.captionText.text(this.groupData[this.index].caption);
            this.currentIndex.text("当前索引：" + (this.index + 1) + " Of " + this.groupData.length);
        },
        preLoadPic: function (src, callback) {//图片加载完后获取图片的宽度高度
            var img = new Image();
            if (!!window.ActiveXObject) {
                img.onreadystatechange = function () {
                    if (this.readyState == "complete") {
                        callback();
                    };
                };
            } else {
                img.onload = function () {
                    callback();
                };
            };
            img.src = src;
        },
        getIndexOf: function (currentId) {
            var index = 0;
            $(this.groupData).each(function (i) {
                index=i;
                if (this.id === currentId) {
                    return false;
                }
            });
            return index;
        },
        initPouup: function(currentObj) {
            var self = this;
            var sourceSrc = currentObj.attr("data-source");
            var currentId = currentObj.attr("data-id");
            this.showMaskAndPopup(sourceSrc,currentId);
        },
        getGroup: function() {
            var self = this;
            //根据当前的组别名称获取页面中所有相同组别的对象
            var groupList = this.bodyNode.find("*[data-group=" + self.groupName + "]");
            //清空数组数据
            self.groupData.length = 0;
            groupList.each(function () {
                self.groupData.push({ src: $(this).attr("data-source"), id: $(this).attr("data-id"), caption: $(this).attr("data-caption") });
            });
        },
        renderDOM: function () {
            var strDom = '<div class="lightbox-pic-view">' +
                        '<span class="lightbox-btn lightbox-prev-btn"></span>' +
                        '<img class="lightbox-image" src="images/2-2.jpg" />' +
                        '<span class="lightbox-btn lightbox-next-btn"></span>' +
                    '</div>' +
                    '<div class="lightbox-pic-caption">' +
                        '<div class="lightbox-caption-area">' +
                            '<p class="lightbox-pic-desc"></p>' +
                            '<span class="lightbox-of-index"></span>' +
                        '</div>' +
                        '<span class="lightbox-close-btn"></span>' +
                    '</div>';
            //插入到弹出框中
            this.popupWin.html(strDom);
            this.bodyNode.append(this.popupMask,this.popupWin);
        }
    };
    window["LightBox"] = LightBox;
})(jQuery);