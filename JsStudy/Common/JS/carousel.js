//加;是防止与其他组件冲突
;(function ($) {
    var Carousel = function (poster) {
        var self = this;
        //保存单个旋转木马对象
        this.poster = poster;
        this.posterItemValue = poster.find("ul.poster-list");//整个ul的高度宽度
        this.prevBtn = poster.find(".poster-prev-btn");
        this.nextBtn = poster.find(".poster-next-btn");
        this.posterItems = this.posterItemValue.find("li.poster-item");
        this.posterFirstItem = this.posterItems.first();
        this.posterLastItem = this.posterItems.last();
        this.rotateFlag = true;
        //设置默认参数
        this.setting = {
            width: 1000,            //幻灯片宽度
            height: 270,            //幻灯片宽度
            posterWidth: 640,       //幻灯片第一帧宽度
            posterHeight: 270,      //幻灯片第一帧高度
            scale: 0.9,             //记录显示比例关系
            speed: 500,//速度
            autoPlay: false,
            delay:5000,
            verticalAlign: "middle"
        };
        $.extend(this.setting, this.getSetting());

        this.setSettingValue();
        this.setPosterPos();

        this.prevBtn.on("click", function () {
            if (self.rotateFlag) {
                self.rotateFlag = false;
                self.carouseRotate("right");
            }
        });
        this.nextBtn.on("click", function () {
            if (self.rotateFlag) {
                self.rotateFlag = false;
                self.carouseRotate("left");
            }
        });
        //是否开启自动播放
        if (this.setting.autoPlay) {
            this.autoPlay();
            this.poster.hover(function () {
                window.clearInterval(self.timer);
            }, function () {
                self.autoPlay();
            });
        }
    }
    Carousel.prototype = {
        autoPlay: function () {
            var self = this;
            this.timer = window.setInterval(function () {
                self.nextBtn.click();
            }, self.setting.delay);
        },
        //图片移动
        carouseRotate: function (dir) {
            var _this_=this,
                zIndexArr=[];
            if (dir === "left") {
                this.posterItems.each(function () {
                    var self = $(this),
                        prev = self.prev().get(0) ? self.prev() : _this_.posterLastItem,
                        width = prev.width(),
                        height = prev.height(),
                        zIndex = prev.css("zIndex"),
                        opacity = prev.css("opacity"),
                        left = prev.css("left"),
                        top = prev.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                        width: width,
                        height: height,
                        //zIndex: zIndex,
                        opacity:opacity,
                        left:left,
                        top: top
                    }, _this_.setting.speed, function () {
                        _this_.rotateFlag = true;
                    });
                });
                this.posterItems.each(function (i) {
                    $(this).css("zIndex", zIndexArr[i]);
                });
            } else if (dir === "right") {
                this.posterItems.each(function () {
                    var self = $(this),
                        next = self.next().get(0) ? self.next() : _this_.posterFirstItem,
                        width = next.width(),
                        height = next.height(),
                        zIndex = next.css("zIndex"),
                        opacity = next.css("opacity"),
                        left = next.css("left"),
                        top = next.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                        width: width,
                        height: height,
                        //zIndex: zIndex,
                        opacity: opacity,
                        left: left,
                        top: top
                    }, _this_.setting.speed, function () {
                        _this_.rotateFlag = true;
                    });
                });
                this.posterItems.each(function (i) {
                    $(this).css("zIndex", zIndexArr[i]);
                });
            }
        },
        //设置剩余帧的位置关系，设置每一个图片的位置关系
        setPosterPos: function () {
            var self = this;
            var sliceItems = this.posterItems.slice(1),         //去掉第一张图片，选出剩下的图片
                sliceSize = sliceItems.size() / 2,
                rightSlice = sliceItems.slice(0, sliceSize),    //应该放在右边的图片
                level = Math.floor(this.posterItems.size() / 2),//两遍图片分层的数量
                leftSlice = sliceItems.slice(sliceSize);        //应该放在左边的图片

            var rw = this.setting.posterWidth,
                rh = this.setting.posterHeight,
                gap = ((this.setting.width - this.setting.posterWidth) / 2) / level;
            //设置右边帧的位置关系、高度、宽度，top
            var firstLeft = (this.setting.width - this.setting.posterWidth) / 2;
            var fixOffsetLeft = firstLeft + rw;
            rightSlice.each(function (i) {
                level--;
                rw = rw * self.setting.scale;
                rh = rh * self.setting.scale;
                var j = ++i;
                $(this).css({
                    zIndex: level,
                    width: rw,
                    height: rh,
                    opacity: 1/j,
                    left: fixOffsetLeft+j*gap-rw,
                    top:self.setVerticalAlign(rh)
                });
            });
            var lw = rightSlice.last().width(),
                lh = rightSlice.last().height(),
                oloop = Math.floor(sliceItems.size() / 2);
            //设置左边位置关系
            leftSlice.each(function (i) {
                $(this).css({
                    zIndex: i,
                    width: lw,
                    height: lh,
                    opacity: 1 / oloop,
                    left: i * gap,
                    top: self.setVerticalAlign(lh)
                });
                lw = lw / self.setting.scale;
                lh = lh / self.setting.scale;
                oloop--;
            });
        },
        //设置垂直排列对齐
        setVerticalAlign: function (height) {
            var verticalAlign = this.setting.verticalAlign,
                top = 0;
            if (verticalAlign === "middle"){
                top = (this.setting.height - height) / 2;
            } else if (verticalAlign === "top") {
                top = 0;
            } if (verticalAlign === "bottom") {
                top = this.setting.height - height;
            } else {
                top = (this.setting.height - height) / 2;
            }
            return top;
        },
        //设置配置参数值去控制基本宽度高度
        setSettingValue:function(){
            this.poster.css({
                width: this.setting.width,
                height: this.setting.height
            });
            this.posterItemValue.css({
                width: this.setting.width,
                height: this.setting.height
            });
            //计算上下切换按钮的宽度
            var w = (this.setting.width - this.setting.posterWidth) / 2;
            this.prevBtn.css({
                width: w,
                height: this.setting.height,
                zIndex:Math.ceil(this.posterItems.size()/2)
            });
            this.nextBtn.css({
                width: w,
                height: this.setting.height,
                zIndex: Math.ceil(this.posterItems.size() / 2)
            });
            this.posterFirstItem.css({
                width: this.setting.posterWidth,
                height: this.setting.posterHeight,
                left: w,
                zIndex: Math.floor(this.posterItems.size() / 2)

            });
        },
        getSetting: function () {
            var setting = this.poster.attr("data-setting");
            if (setting && setting != "") {
                return $.parseJSON(setting);
            } else {
                return {};
            }
        }
    };
    Carousel.init = function (posters) {
        var _this = this;
        posters.each(function (i, elem) {
            //elem=$(this),这里的this指循环的中的对象
            new _this($(this));
        });
    }
    //全局注册
    window["Carousel"] = Carousel;
})(jQuery);