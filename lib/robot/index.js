'use strict';

const _ = require('lodash');
const request = require('../HTTPS');
const qs = require('querystring');
const Promise = require('bluebird');

module.exports = {
    text: function (data) {
        if(!_.isObject(data)){
            throw new Error('鍐呭鏍煎紡涓?Object,鍙戦€佸唴瀹规牸寮?鍙傝€冮拤閽夋満鍣ㄤ汉鏂囨。 https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.zyo0qD&treeId=257&articleId=105735&docType=1');
        }
        if ('content' in data && data.content) {
            return {
                content: data.content
            };
        } else {
            throw new Error('鍙戦€佹秷鎭负绌?');
        }
    },
    link: function (data) {
        if(!_.isObject(data)){
            throw new Error('鍐呭鏍煎紡涓?Object,鍙戦€佸唴瀹规牸寮?鍙傝€冮拤閽夋満鍣ㄤ汉鏂囨。 https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.zyo0qD&treeId=257&articleId=105735&docType=1');
        }
        if ('title' in data && 'text' in data && 'messageUrl' in data) {
            return {
                title: data.title,
                text: data.text,
                messageUrl: data.messageUrl,
                picUrl: (data.picUrl ? data.picUrl : '')
            }
        } else {
            throw new Error('鍙戦€佹秷鎭负绌?');
        }
    },
    markdown: function (data) {
        if(!_.isObject(data)){
            throw new Error('鍐呭鏍煎紡涓?Object,鍙戦€佸唴瀹规牸寮?鍙傝€冮拤閽夋満鍣ㄤ汉鏂囨。 https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.zyo0qD&treeId=257&articleId=105735&docType=1');
        }
        if ('title' in data && 'text' in data) {
            return {
                title: data.title,
                text: data.text
            }
        } else {
            throw new Error('鍙戦€佹秷鎭负绌?');
        }
    },
    send: function (accessToken, msgType, data, at, isAtAll) {
        const _self = this;
        const path = '/robot/send?';
        return new Promise(function (resolve, reject) {
            const options = {
                "msgtype": msgType
            };
            if (!accessToken) {
                reject(new Error('accessToken 蹇呭～椤?));
                return;
            }
            if (['link', 'text', 'markdown'].indexOf(msgType) == -1) {
                reject(new Error('鐩墠閽夐拤鏈哄櫒浜哄彧鏀寔[text, link, markdown]绫诲瀷娑堟伅鍙戦€?));
                return;
            }
            if (!Array.isArray(at)) {
                at = [at];
            }
            at = at.filter(function (val) {
                return _.isString(val) && /^1[3578]\d{9}$/.test(val);
            });
            //鍥犱负璋冪敤鏂规硶鍙兘鎶涘嚭寮傚父
            try {
                options[msgType] = _self[msgType](data);
            } catch (e) {
                reject(e);
            }

            if (at.length > 0) {
                options['at'] = {
                    'atMobiles': at,
                    'isAtAll': !!isAtAll
                }
            } else {
                options['at'] = {
                    'isAtAll': !!isAtAll
                }
            }
            request.POST({"content-type": "application/json"}, path + qs.stringify({access_token: accessToken}), JSON.stringify(options))
                .then(function (result) {
                    resolve(result)
                })
                .catch(function (err) {
                    reject(err);
                })
        })
    }
};
