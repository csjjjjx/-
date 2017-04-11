/**
 * Created by joker on 2017/3/6.
 */
const https = require('https');
const Promise = require('bluebird');
const url = require('url');
const dingRobotHost = 'oapi.dingtalk.com';

module.exports = {
    GET: function (path) {
        const href = url.format({
            protocol: 'https',
            host: dingRobotHost,
            path: path
        });
        return new Promise(function (resolve, reject) {
            https.get(href, function (res) {
                if (res.statusCode == 200) {
                    var body = '';
                    res
                        .on('data', function (data) {
                            body += data;
                        })
                        .on('end', function () {
                            const result = JSON.parse(body);
                            resolve(result);
                        })
                } else {
                    reject(res.statusCode);
                }
            }).on('error', function (err) {
                reject(err);
            })
        });
    },
    POST: function (header, path, dataStr) {
        const options = {
            method: 'POST',
            host: dingRobotHost,
            path: path
        };
        if (header) {
            options['headers'] = header;
        }
        return new Promise(function (resolve, reject) {
            const req = https.request(options, function (res) {
                if (res.statusCode === 200) {
                    var body = '';
                    res
                        .on('data', function (data) {
                            body += data;
                        })
                        .on('end', function () {
                            const result = JSON.parse(body);
                            resolve(result);
                        })
                } else {
                    reject(res.statusCode);
                }
            })
                .on('error', function (err) {
                    reject(err);
                });
            req.write(dataStr);
            req.end();
        })
    }
};
