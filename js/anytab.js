"use strict";

window.anytab = window.anytab || {};

anytab.Core = function() {
    this.timeStr    = "";
    this.timeEl     = $("#time");
    this.bgWapperEl = $("#bg-wrapper");
    this.imageUrl   = "";
};

anytab.Core.prototype = {
    setTime: function() {
        var date = new Date();
        var hours = date.getHours();
        var mins = date.getMinutes();
        if(mins < 10){
            mins = '0' + mins;
        }
        var ret = '';
        ret = ret + hours + ':' + mins;
        this.timeStr = ret;
    },
    updateTime: function() {
        this.setTime();
    },
    setStyle: function() {
        if (localStorage["bg_type"] == "image") {
            this.bgWapperEl.css('background-size', "contain");
            this.bgWapperEl.css('background-repeat', "no-repeat");
            this.bgWapperEl.css('background-position', "top center");
        }
    },
    getImageUrl: function() {
        switch (localStorage["type"]) {
            case 'url':
                var image_urls = localStorage["image_url"].split(",");
                this.imageUrl  = this.randAry(image_urls);
                break;
            case 'keyword':
                var keywords   = localStorage["keyword"].split(",");
                var keyword    = this.randAry(keywords);
                var image_urls = this.getSearchResults(keyword);
                this.imageUrl  = this.randAry(image_urls);
                break;
            case '-':
            default:
                this.imageUrl  = "https://source.unsplash.com/category/nature/1920x1080";
                break;
        }
    },
    start: function() {
        this.setTime();
        this.setStyle();
        this.render();
    },
    render: function() {
        this.timeEl.text(this.timeStr);
        this.getImageUrl();
        this.bgWapperEl.css('background-image', `url(${this.imageUrl})`);
    },
    getSearchResults: function(keyword) {
        var image_urls = new Array()
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://www.google.co.jp/search?q=${keyword}&tbm=isch`, false);
        xhr.onload = function(e) {
            $(this.response).find('.rg_meta').each(function(index, val) {
                var html = val.innerHTML;
                var obj  = $.parseJSON(html);
                image_urls.push(obj["ou"]);
            });
        };
        xhr.send();
        return image_urls;
    },
    randAry: function(ary){
        var aryKeys = Object.keys(ary);
        var index = aryKeys[Math.floor(Math.random() * aryKeys.length)];
        return ary[index];
    }
};
