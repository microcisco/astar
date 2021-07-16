# astar

##  最近更新
新增了JPS（跳点寻路），欢迎大家提issue
https://github.com/microcisco/jpsFindPath
新增了TS版本，进一步的优化代码，以及进一步的简化用法，欢迎大家提issue
 https://github.com/microcisco/astartForTS
---

商业项目放心使用，有问题会及时更新！
最近要用到寻路算法，偷懒网上搜了一批，尼玛惨不忍睹，各种bug，没办法，自己动手丰衣足食。
本版本优化了两个地方，第一个是将经典的递归改成了循环避免了堆栈溢出，第二个是优化了路径尽量走直线。

关于用法
工程项目是cocos create的，其他项目直接调用 /assets/Script/AutoFindPath.js下的getPath即可参数和返回值如下, 另外点对象的结构如下(x: 0, y: 0)
/**
 *
 * @param {object} bron        出生点
 * @param {object} obstacles   障碍物数组
 * @param {object} target      目标
 * @param {object} map         地图
 * @param {object} girdLength  格子长度
 * @return{Array} route        路径点数组(空数组为死路)
 * */

 最后我的注释写的非常详细，如果大家发现bug欢迎提issues
 
