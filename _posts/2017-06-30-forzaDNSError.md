---
title: Forza Horizon 3 极限竞速地平线3 关于线上多人模式，DNS解析错误解决办法
layout: post
excerpt: 极限竞速地平线3：入门体验
istop: true
category: other
---

> 极限竞速：也叫废渣，来自于Forza的音译，以下统称废渣，是一款区别于NFS等的拟真类型赛车游戏。 

![]({{site.baseurl}}/images/forza.jpg)



前几天一直受困于联机问题，可以打开商店，涂装，拍卖行，唯独加入游戏时出现网络问题。

如果要联机，首先必须有打开防火墙，其次要网络设备中要有Teredo这个设备。

对于具体问题的解决办法还是根据微软官方解答最为靠谱。
在开始菜单里找到Xbox应用，在左边栏选择最后一项：设置，点网络页签。通过自带的网络监测功能，查看问题，如果有问题的网络连接，微软也会给出相应问题解决链接，打开根据文档中的设置即可。

我的是由于Teredo设备没有安装导致的，是否还可能出现其他联机问题不确定。文档里主要方法也都是通过CMD或者PowerShell来操作，可以通过右键屏幕左下角来打开命令窗口（管理员），命令大多数也都是安装或者卸载Teredo设备，或者设置Teredo启用状态，如果讲Teredo状态设置为Default，则不用再次通过设备管理器安装，会自动安装。其中也有少部分操作设计注册表操作，跟普通教程都是通过reg窗口操作明显方便许多，官方果然叼一点。

如果设置完成后还有问题，请重启电脑尝试。

