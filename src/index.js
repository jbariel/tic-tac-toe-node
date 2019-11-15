/**
 * Copyright 2019 Jarrett Bariel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const url = require('url');

const sl = require('server-lite');
const datez = require('date-utilz');
const stringz = require('string-utilz');
const om = require('output-manager');
const o = new om.Out();
const serverOut = new om.Out();

o.i('Starting tic-tac-toe...');

const utilz = new sl.utils(o);
const handler = new sl.handler(utilz, 'public', '/html/index.html', '/js/concat/', '/css/concat/');

function onReq(request, response) {
    o.d('Recieved request...');
    let tmpPath = url.parse(request.url).pathname;
    o.d(stringz.fmt('...for path "%{s}"', tmpPath));
    switch (tmpPath) {
        case '/concat.css':
            o.t('concat css');
            handler.concatenatedCss(request, response);
            break;
        case '/concat.js':
            o.t('concat js');
            handler.concatenatedJavscript(request, response);
            break;
        default:
            o.t('simple web server request');
            handler.simpleFileBasedWebServer(request, response);
            break;
    }
}

const cfg = new sl.config({
    out: serverOut,
    port: 8888,
    onRequest: onReq
});

const httpSvr = new sl.server.http(cfg);
httpSvr.start();
