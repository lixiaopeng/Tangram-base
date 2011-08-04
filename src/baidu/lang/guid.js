/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/guid.js
 * author: meizz
 * version: 1.1.0
 * date: 2010/02/04
 */

/**
 * 返回一个当前页面的唯一标识字符串。
 * @name baidu.lang.guid
 * @function
 * @grammar baidu.lang.guid()
 * @version 1.1.1
 * @meta standard
 *             
 * @returns {String} 当前页面的唯一标识字符串
 */
///import baidu.lang;
(function(global){
    //不直接使用window，可以提高3倍左右性能
    global._counter = global._counter || 1;

    baidu.lang.guid = function() {
        return "TANGRAM__" + global._counter ++;
    };

})(window[baidu.guid]);

// 20110803 将 window[baidu.guid] 作为参数传递的闭包中