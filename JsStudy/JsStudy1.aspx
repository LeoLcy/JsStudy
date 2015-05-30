<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="JsStudy1.aspx.cs" Inherits="JsStudy.JsStudy1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>旋转木马</title>
    <link href="Common/css/carousel.css" rel="stylesheet" />
    <script src="Common/JS/jquery-2.1.4.js"></script>
    <script src="Common/JS/carousel.js"></script>
</head>
<body style="padding:100px;">
        <div class="J_Poser poster-main" data-setting='{"width": 1000,
            "height": 270,
                "posterWidth": 640,
                "posterHeight": 270,
                "scale": 0.8,
                "speed":50,"verticalAlign":"middle"}'>
            <div class="poster-btn poster-prev-btn"></div>
            <ul class="poster-list">
                <li class="poster-item"><a href="javascript:void(0)">
                    <img width="100%" src="Common/image/1.jpg" /></a></li>
                <li class="poster-item"><a href="javascript:void(0)">
                    <img width="100%" src="Common/image/2.jpg" /></a></li>
                <li class="poster-item"><a href="javascript:void(0)">
                    <img width="100%" src="Common/image/3.jpg" /></a></li>
                <li class="poster-item"><a href="javascript:void(0)">
                    <img width="100%" src="Common/image/4.jpg" /></a></li>
                <li class="poster-item"><a href="javascript:void(0)">
                    <img width="100%" src="Common/image/5.jpg" /></a></li>
                <li class="poster-item"><a href="javascript:void(0)">
                    <img width="100%" src="Common/image/2.jpg" /></a></li>
                <li class="poster-item"><a href="javascript:void(0)">
                    <img width="100%" src="Common/image/3.jpg" /></a></li>
                <li class="poster-item"><a href="javascript:void(0)">
                    <img width="100%" src="Common/image/4.jpg" /></a></li>
                <li class="poster-item"><a href="javascript:void(0)">
                    <img width="100%" src="Common/image/5.jpg" /></a></li>
            </ul>
            <div class="poster-btn poster-next-btn"></div>
        </div>
    <script>
        $(function () {
            //var carousel = new Carousel($(".J_Poser").eq(0));

            var setting = {
                width: 1000,
                height: 270,
                posterWidth: 640,
                posterHeight: 270,
                scale: 0.9,//后边图片显示的是前边图片的0.9
                speed:500,//速度
                verticalAlign:"middle"
            }

            Carousel.init($(".J_Poser"));
        });
    </script>
</body>
</html>
