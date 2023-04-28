// ==UserScript==
// @name         Emoji S2OJ
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @author       Baoshuo
// @match        https://sjzezoj.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sjzezoj.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Use SM.MS VVIP (China mainland CDN) endpoint
    var SM_MS_ENDPOINT = '//s1.baoshuo.ren'; // '//arina.loli.net';

    var QQ_EMOJIS = {
        yiw: SM_MS_ENDPOINT + '/2023/04/28/WxCtcMJmDNh6zTq.gif', // 'https://www.emojiall.com/img/platform/qq/031@2x.gif',
        shuai: SM_MS_ENDPOINT + '/2023/04/28/qmQElb483eX1xpO.gif', // 'https://www.emojiall.com/img/platform/qq/035@2x.gif',
        jy: SM_MS_ENDPOINT + '/2023/04/28/eZcGjlyVSbh4fmY.gif', // 'https://www.emojiall.com/img/platform/qq/000@2x.gif',
        zhm: SM_MS_ENDPOINT + '/2023/04/28/MxA3jwUIHuzvsk7.gif', // 'https://www.emojiall.com/img/platform/qq/030@2x.gif',
        shui: SM_MS_ENDPOINT + '/2023/04/28/h8BnplbPmH1Quc2.gif', // 'https://www.emojiall.com/img/platform/qq/008@2x.gif',
        oh: SM_MS_ENDPOINT + '/2023/04/28/cEWinw3NHSKDzuX.gif', // 'https://www.emojiall.com/img/platform/qq/066@2x.gif',
        hsh: SM_MS_ENDPOINT + '/2023/04/28/oWmGH1RrItnbU93.gif', // 'https://www.emojiall.com/img/platform/qq/103@2x.gif',
        zhq: SM_MS_ENDPOINT + '/2023/04/28/xTiR9swp7SQ6Ulr.gif', // 'https://s2.loli.net/2023/02/28/atHeX39NGlMfnYI.gif',
        kuk: SM_MS_ENDPOINT + '/2023/04/28/J34PTRjQ8nFtg5v.gif', // 'https://www.emojiall.com/img/platform/qq/016@2x.gif',
        tiao: SM_MS_ENDPOINT + '/2023/04/28/yp8ufSIWNeMBnHg.gif', // 'https://www.emojiall.com/img/platform/qq/041@2x.gif',
        qd: SM_MS_ENDPOINT + '/2023/04/28/MxNOVyJL8Fje6Wn.gif', // 'https://www.emojiall.com/img/platform/qq/074@2x.gif',
        kx: SM_MS_ENDPOINT + '/2023/04/28/67UXiKBobnGdrMv.gif', // 'https://www.emojiall.com/img/platform/qq/216@2x.gif',
        my: SM_MS_ENDPOINT + '/2023/04/28/KbRWY14sT6gFHqV.gif', // 'https://www.emojiall.com/img/platform/qq/219@2x.gif',
        ll: SM_MS_ENDPOINT + '/2023/04/28/hvPqgWMSU74l3xp.gif', // 'https://www.emojiall.com/img/platform/qq/005@2x.gif',
        gz: SM_MS_ENDPOINT + '/2023/04/28/atQDXAGq9snToUY.gif', // 'https://www.emojiall.com/img/platform/qq/073@2x.gif',
        qiao: SM_MS_ENDPOINT + '/2023/04/28/MBqvzfFmaGIUNHc.gif', // 'https://www.emojiall.com/img/platform/qq/037@2x.gif',
        kk: SM_MS_ENDPOINT + '/2023/04/28/jPofqydGtmRegHs.gif', // 'https://www.emojiall.com/img/platform/qq/081@2x.gif',
        cy: SM_MS_ENDPOINT + '/2023/04/28/ZnNVOvu5qXibHes.gif', // 'https://www.emojiall.com/img/platform/qq/013@2x.gif',
        dz: SM_MS_ENDPOINT + '/2023/04/28/trULEIgTBhQuiJy.gif', // 'https://www.emojiall.com/img/platform/qq/172@2x.gif',
        gg: SM_MS_ENDPOINT + '/2023/04/28/O2DzI95QcJ8f1Kd.gif', // 'https://www.emojiall.com/img/platform/qq/010@2x.gif',
        hanx: SM_MS_ENDPOINT + '/2023/04/28/q3EfL2lkvowWy7i.gif', // 'https://www.emojiall.com/img/platform/qq/027@2x.gif',
        fad: SM_MS_ENDPOINT + '/2023/04/28/TzIYXrhWDCVGiHS.gif', // 'https://www.emojiall.com/img/platform/qq/039@2x.gif',
    };

    function getScoreLevel(x) {
        if (x < 0) return 'yiw';
        else if (x == 0) return 'my';
        else if (x < 0.1) return 'shuai';
        else if (x < 0.2) return 'qiao';
        else if (x < 0.3) return 'shui';
        else if (x < 0.4) return 'gg';
        else if (x < 0.5) return 'oh';
        else if (x < 0.6) return 'hsh';
        else if (x < 0.7) return 'tiao';
        else if (x < 0.8) return 'hanx';
        else if (x < 0.9) return 'gz';
        else if (x < 1.0) return 'kx';
        else if (x == 1.0) return 'kuk';
        else return 'jy';
    }

    $.fn.__s2oj_userscript_emoji_s2oj = function () {
        return $(this).each(function () {
            var score = parseFloat($(this).text());
            var maxscore = parseFloat($(this).data('max'));

            if (isNaN(score)) {
                return;
            }

            if (isNaN(maxscore)) {
                maxscore = 100;
            }

            $(this)
                .css('height', $(this).height())
                .css('max-width', '40px')
                .css('width', '0')
                .css('overflow', 'hidden')
                .css('transition', 'all 0.5s')
                .css('display', 'inline-block')
                .css('white-space', 'no-wrap')
                .wrap('<span class="__s2oj_userscript_emoji_s2oj__uoj-score__wrapper">')
                .parent()
                .append(' ')
                .append(
                    $('<img>')
                        .attr('class', '__s2oj_userscript_emoji_s2oj__uoj-score__emoji')
                        .attr('src', QQ_EMOJIS[getScoreLevel(score / maxscore)])
                        .css('width', '1.25em')
                        .css('height', '1.25em')
                        .css('overflow', 'hidden')
                        .css('transition', 'all 0.5s')
                        .css('vertical-align', 'text-top')
                )
                .on('mouseover', function () {
                    $('.uoj-score', this).css('width', '100%');
                    $('.__s2oj_userscript_emoji_s2oj__uoj-score__emoji', this).css('width', '0');
                })
                .on('mouseleave', function () {
                    $('.uoj-score', this).css('width', '0');
                    $('.__s2oj_userscript_emoji_s2oj__uoj-score__emoji', this).css('width', '1.25em');
                });
        });
    };

    $(document).ready(function () {
        $('.uoj-score').__s2oj_userscript_emoji_s2oj();
    });
})();
