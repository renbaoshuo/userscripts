// ==UserScript==
// @name         S2OJ 显示真实点赞数
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  启用该脚本后可以显示 S2OJ 中真实的点赞数量。
// @author       Baoshuo
// @match        https://sjzezoj.com/*
// @match        https://www.sjzezoj.com/*
// @icon         https://sjzezoj.com/images/favicon.ico
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';

    var original_click_zan_block_fn = $.fn.click_zan_block;

    $.fn.click_zan_block = function() {
        return original_click_zan_block_fn.call(this).each(function() {
            var zan_cnt = $('.uoj-click-zan-cnt', this);

            zan_cnt.html('[<strong>' + zan_cnt.attr('title') + '</strong>]');
        });
    };

    $(document).ready(function() {
        $('.uoj-click-zan-cnt, .uoj-click-zan-cnt-inline').each(function() {
            var zan = $(this).attr('title');

            if (!zan) return;

            $(this).html('[<strong>' + zan + '</strong>]');
        });
    });
})();