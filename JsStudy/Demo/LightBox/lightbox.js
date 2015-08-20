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
        this.picViewArea = this.popupWin.find(".lightbox-pic-view");
        this.popupPic = this.popupWin.find(".lightbox-image");
        this.picCaptionArea = this.popupWin.find(".lightbox-pic-caption");
        this.prevBtn = this.picViewArea.find(".lightbox-prev-btn");
        this.nextBtn = this.picViewArea.find(".lightbox-next-btn");
        this.captionText = this.picCaptionArea.find(".lightbox-pic-desc");//图片标题
        this.currentIndex = this.picCaptionArea.find(".lightbox-of-index");//索引
        this.closeBtn = this.picCaptionArea.find(".lightbox-close-btn");//关闭按钮
        //准备开发时间委托，获取组数据
        this.groupName = null;
        this.groupData = [];//放置同一组数据
        this.bodyNode.delegate("js-lightbox,*[data-role=lightbox]","click", function(e) {
            //阻止事件冒泡
            e.stopPropagation();
            var currentGroupName = $(this).attr("data-group");

            if (currentGroupName != self.groupName) {
                self.groupName = currentGroupName;
                //根据当前组名获取同一组数据
                self.getGroup();
            }
            self.initPouup($(this));
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
                //
            });
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