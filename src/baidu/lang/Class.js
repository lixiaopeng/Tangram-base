/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/Class.js
 * author: meizz, erik
 * version: 1.1.0
 * date: 2009/12/1
 */

///import baidu.lang.guid;
///import baidu.lang.isFunction;

/**
 * 
 * @class  Tangram继承机制提供的一个基类，用户可以通过继承baidu.lang.Class来获取它的属性及方法。
 * @name 	baidu.lang.Class
 * @grammar baidu.lang.Class(guid)
 * @param 	{string}	guid	对象的唯一标识
 * @meta standard
 * @remark baidu.lang.Class和它的子类的实例均包含一个全局唯一的标识guid。guid是在构造函数中生成的，因此，继承自baidu.lang.Class的类应该直接或者间接调用它的构造函数。<br>baidu.lang.Class的构造函数中产生guid的方式可以保证guid的唯一性，及每个实例都有一个全局唯一的guid。
 * @meta standard
 * @see baidu.lang.inherits,baidu.lang.Event
 */
baidu.lang.Class = function(guid) {
    this.guid = this.guid || guid || baidu.lang.guid();
    baidu._instances[this.guid] = this;
};

// 将_instances 变量的访问从原来的 window 向下访问改成直接访问 20110801
baidu._instances =
window[baidu.guid]._instances =
window[baidu.guid]._instances || {};

/**
 * 释放对象所持有的资源，主要是自定义事件。
 * @name dispose
 * @grammar obj.dispose()
 * TODO: 将_listeners中绑定的事件剔除掉
 */
baidu.lang.Class.prototype.dispose = function(){
    delete baidu._instances[this.guid];

    for(var property in this){
        typeof this[property] != "function" && (delete this[property]);
    }
    this.disposed = true;   // 20100716
};

/**
 * 重载了默认的toString方法，使得返回信息更加准确一些。
 * @return {string} 对象的String表示形式
 */
baidu.lang.Class.prototype.toString = function(){
    return "[object " + (this.__type || "Object" ) + "]";
};

/**
 * 返回用户指定 guid 的实例对象
 *
 * @param   {string}        guid    需要获取实例的guid
 * @returns {Object|null}           如果存在的话，返回;否则返回null。
 */
window.baiduInstance = function(guid) {
    return baidu && baidu._instances && baidu._instances[guid];
};

// 20110722 meizz 对于 _instances 集合从原来的 window 往下找改成 一步到位，提升效率
// 20110722 meizz 废除对 isFunction 的引用，在这种应用环境里不需要外挂这个模块
// 20110722 meizz 添加 baiduInstance(guid) 这个全局方法，原来的 baidu.lang.instance(guid) 是一个无效的方法，因为 baidu 这个顶级域名被闭包之后，这个方法就失效了。
