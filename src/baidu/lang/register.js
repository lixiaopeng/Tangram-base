/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/register.js
 * author: meizz
 * version: 1.4.0
 * date: 2011/07/22
 */

///import baidu.global.get;
///import baidu.global.set;

/**
 * 根据参数(guid)的指定，返回对应的实例对象引用
 * @name baidu.lang.register
 * @function
 * @grammar baidu.lang.register(Class, pluginFn)
 * @param   {Class}     Class   接受注册的载体
 * @meta standard
 *             
 */
baidu.lang.register = function (Class, plugin) {
    var key = Class.prototype.__type + baidu.version;
    var go = baidu.global.get(key);
    if (baidu.toString.call(go) != "Array") {
        go = baidu.global.set(key, []);
    }
    go[go.length] = plugin;
};
