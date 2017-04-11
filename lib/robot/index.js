'use strict';

const _ = require('lodash');
const request = require('../HTTPS');
const qs = require('querystring');
const Promise = require('bluebird');

module.exports = {
    text: function (data) {
        if(!_.isObject(data)){
            throw new Error('123123123');
        }
        if ('content' in data && data.content) {
            return {
                content: data.content
            };
        } else {
            throw new Error('123?');
        }
    },
    link: function (data) {
        if(!_.isObject(data)){
            throw new Error('123123123');
        }
        if ('title' in data && 'text' in data && 'messageUrl' in data) {
            return {
                title: data.title,
                text: data.text,
                messageUrl: data.messageUrl,
                picUrl: (data.picUrl ? data.picUrl : '')
            }
        } else {
            throw new Error('123?');
        }
    },
    markdown: function (data) {
        if(!_.isObject(data)){
            throw new Error('123123123');
        }
        if ('title' in data && 'text' in data) {
            return {
                title: data.title,
                text: data.text
            }
        } else {
            throw new Error('123?');
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
                reject(new Error('accessToken 111?));
                return;
            }
            if (['link', 'text', 'markdown'].indexOf(msgType) == -1) {
                reject(new Error('12345));
                return;
            }
            if (!Array.isArray(at)) {
                at = [at];
            }
            at = at.filter(function (val) {
                return _.isString(val) && /^1[3578]\d{9}$/.test(val);
            });
            //7777
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
