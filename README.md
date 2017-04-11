# dingtalk-robot

[![Build Status](https://travis-ci.org/fineen/dingtalk-robot.svg?branch=master)](https://travis-ci.org/fineen/dingtalk-robot)

[钉钉自定义机器人](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.c0UBCT&treeId=257&articleId=105735&docType=1) Node.js API.

[![NPM](https://nodei.co/npm/dingtalk-robot.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dingtalk-robot/)

## 安装

```bash
~$ [sudo] npm install dingtalk-robot [-g] [--save]
```

## 使用

#### 1. 发送文本格式消息：

```javascript
// xxxxxxxxxx 为机器人webhook地址中access_token的值
var robot = require('dingtalk-robot')('xxxxxxxxxx');

// send text format message
robot.send({
    msgtype: 'text',
    text: {
        content: '我就是我, 是不一样的烟火'
    },
    at: {
        atMobiles: [
            '156xxxx8827',
            '189xxxx8325'
        ],
        isAtAll: false
    }
}, function(err, data) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
```

#### 2. 发送链接格式消息：

```javascript
// xxxxxxxxxx 为机器人webhook地址中access_token的值
var robot = require('dingtalk-robot')('xxxxxxxxxx');

// send link format message
robot.send({
    msgtype: 'link',
    link: {
        text: '这个即将发布的新版本，创始人陈航（花名“无招”）称它为“红树林”。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是“红树林”？',
        title: '时代的火车向前开',
        picUrl: '',
        messageUrl: 'https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI'
    }
}, function(err, data) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
```

#### 3. 发送Markdown格式消息：

```javascript
// xxxxxxxxxx 为机器人webhook地址中access_token的值
var robot = require('dingtalk-robot')('xxxxxxxxxx');

// send markdown format message
robot.send({
    msgtype: 'markdown',
    markdown: {
        title: '杭州天气',
        text: '#### 杭州天气\n' +
              '> 9度，西北风1级，空气良89，相对温度73%\n\n' +
              '> ![screenshot](http://image.jpg)\n' +
              '> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n'
    }
}, function(err, data) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
```

## Licence

MIT License

Copyright (c) 2017 Fineen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
