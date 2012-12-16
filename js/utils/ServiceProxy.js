define(['jquery'], function ($) {
    (function () {
        /*
        ServiceProxy.js  
        Version 0.964 - 9/15/09
        touchup by: T. Killilea, invoke w/ options
        (c) 2008-2009 Rick Strahl, West Wind Technologies 
        www.west-wind.com
        Licensed under MIT License
        http://en.wikipedia.org/wiki/MIT_License
        */
        ///
        /// summary: 
        ///
        this.ServiceProxy = function (serviceUrl) {
            /// <summary>
            /// Generic Service Proxy class that can be used to
            /// call JSON Services generically using jQuery
            /// depends on JSON2.js modified for MS Ajax usage
            /// </summary>
            /// <param name="serviceUrl" type="string">
            /// The Url of the service ready to accept the method name
            /// should contain trailing slash (or other URL separator ?,&)
            /// </param>
            /// <example>
            /// var proxy = new ServiceProxy("JsonStockService.svc/");
            /// proxy.invoke("GetStockQuote",{symbol:"msft"},
            ///              function(quote) { alert(result.LastPrice); },onPageError);
            ///</example>

            var _I = this;
            this.serviceUrl = serviceUrl;

            // invoke the client proxy with options.
            this.invoke = function (options) {

                // Default settings
                var settings = {
                    serviceMethod: '',
                    data: null,
                    callback: null,
                    error: null,
                    type: "POST",
                    processData: true,
                    contentType: "application/json",
                    timeout: 60000, //Not Preferable, but needed for now.
                    dataType: "text",
                    bare: false,
                    isWcf: false
                };


                // extend/merge user options with defaults..
                if (options) {
                    $.extend(settings, options);
                }


                // important for handling WCF's date format, remember, JS does not have a standardized date format
                this.isWcf = settings.isWcf;

                //this.invoke = function(Options) {
                /// <summary>
                /// Calls a WCF/ASMX service and returns the result.
                /// </summary>    
                /// <param name="method" type="string">The method of the service to call</param>
                /// <param name="params" type="object">An object that represents the parameters to pass {symbol:"msft",years:2}       
                /// <param name="callback" type="function">Function called on success. 
                /// Receives a single parameter of the parsed result value</parm>
                /// <param name="errorCallback" type="function">Function called on failure. 
                /// Receives a single error object with Message property</parm>
                /// <param name="isBare" type="boolean">Set to true if response is not a WCF/ASMX style 'wrapped' object</parm>

                var json = _I.isWcf ? JSON.stringifyWcf(settings.data) : JSON.stringify(settings.data);

                // Service endpoint URL        
                var url = _I.serviceUrl + settings.serviceMethod;

                $.ajax({
                    url: url,
                    data: json,
                    type: settings.type,
                    processData: settings.processData,
                    contentType: settings.contentType,
                    timeout: settings.timeout,
                    dataType: settings.dataType,
                    success: function (res) {
                        if (!settings.callback) {
                            return;
                        }

                        // Use json EXTNEDED library so we can fix up MS AJAX dates
                        var result = JSON.parseWithDate(res);

                        if (result.ExceptionDetail) {
                            OnPageError(result.Message);
                            return;
                        }
                        // Bare message IS result
                        if (settings.bare) {
                            settings.callback(result);
                            return;
                        }

                        // Wrapped message contains top level object node
                        // strip it off  ie result.d
                        for (var property in result) {
                            settings.callback(result[property]);
                            break;
                        }
                    },
                    error: settings.error
                });
            }
        }


        /*
        http://www.JSON.org/json2.js
        2009-04-16
        Public Domain.
        */
        if (!this.JSON) {
            this.JSON = {};
        }
        (function () {
            function f(n) { return n < 10 ? '0' + n : n; }
            if (typeof Date.prototype.toJSON !== 'function') {
                Date.prototype.toJSON = function (key) {
                    debugger; return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' +
f(this.getUTCMonth() + 1) + '-' +
f(this.getUTCDate()) + 'T' +
f(this.getUTCHours()) + ':' +
f(this.getUTCMinutes()) + ':' +
f(this.getUTCSeconds()) + 'Z' : null;
                }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf(); };
            }
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; }
            function str(key, holder) {
                var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); }
                if (typeof rep === 'function') { value = rep.call(holder, key, value); }
                switch (typeof value) {
                    case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; }
                        gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') {
                            length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; }
                            v = partial.length === 0 ? '[]' : gap ? '[\n' + gap +
partial.join(',\n' + gap) + '\n' +
mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v;
                        }
                        if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { k = rep[i]; if (typeof k === 'string') { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } }
                        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v;
                }
            }
            if (typeof JSON.stringify !== 'function') {
                JSON.stringify = function (value, replacer, space) {
                    var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; }
                    rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); }
                    return str('', { '': value });
                };
            }
            if (typeof JSON.parse !== 'function') {
                JSON.parse = function (text, reviver) {
                    var j; function walk(holder, key) {
                        var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } }
                        return reviver.call(holder, key, value);
                    }
                    cx.lastIndex = 0; if (cx.test(text)) {
                        text = text.replace(cx, function (a) {
                            return '\\u' +
('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                        });
                    }
                    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({ '': j }, '') : j; }
                    throw new SyntaxError('JSON.parse');
                };
            }
        } ());


        if (this.JSON && !this.JSON.parseWithDate) {
            var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
            var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
            // original var reMsAjax = /^\/Date\((d|-|.*)\)\/$/;

            JSON.parseWithDate = function (json) {
                /// <summary>
                /// parses a JSON string and turns ISO or MSAJAX date strings
                /// into native JS date objects
                /// </summary>    
                /// <param name="json" type="var">json with dates to parse</param>        
                /// </param>
                /// <returns type="value, array or object" />
                try {
                    var res = JSON.parse(json,
            function (key, value) {
                if (typeof value === 'string') {
                    var a = reISO.exec(value);
                    if (a)
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
                    a = reMsAjax.exec(value);
                    if (a) {
                        var b = a[1].split(/[-+,.]/);
                        return new Date(b[0] ? +b[0] : 0 - +b[1]);
                    }
                }
                return value;
            });
                    return res;
                } catch (e) {
                    // orignal error thrown has no error message so rethrow with message
                    throw new Error("JSON content could not be parsed.");
                    return null;
                }
            };
            JSON.stringifyWcf = function (json) {
                /// <summary>
                /// Wcf specific stringify that encodes dates in the
                /// a WCF compatible format ("/Date(9991231231)/")
                /// Note: this format works ONLY with WCF. 
                ///       ASMX can use ISO dates as of .NET 3.5 SP1
                /// </summary>
                /// <param name="key" type="var">property name</param>
                /// <param name="value" type="var">value of the property</param>         
                return JSON.stringify(json, function (key, value) {
                    if (typeof value == "string") {
                        var a = reISO.exec(value);
                        if (a) {
                            var val = '/Date(' + new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6])).getTime() + ')/';
                            this[key] = val;
                            return val;
                        }
                    }
                    return value;
                })
            };
            JSON.dateStringToDate = function (dtString) {
                /// <summary>
                /// Converts a JSON ISO or MSAJAX string into a date object
                /// </summary>    
                /// <param name="" type="var">Date String</param>
                /// <returns type="date or null if invalid" /> 
                var a = reISO.exec(dtString);
                if (a)
                    return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
                a = reMsAjax.exec(dtString);
                if (a) {
                    var b = a[1].split(/[-,.]/);
                    return new Date(+b[0]);
                }
                return null;
            };
        }


        //Error Handling
        function postErrorAndUnBlockUI(xhr, errorMsg, thrown) {
            //$.unblockUI();
            OnPageError(xhr, errorMsg, thrown);
        }

        function showErrorMsg(Msg) {


            if (!AJAXError || AJAXError.length === 0) { //If the error element was added after $.Ready we need to regrab it.
                AJAXError = $("#AJAXError");
            }

            AJAXError.show();
            AJAXError.insertStatusMessage({ statusMessage: Msg });
        }


        function OnPageError(xhr, errorMsg, thrown) {

            if (typeof xhr == "string") {
                showErrorMsg(xhr);
                return;
            }
            else if (typeof (xhr.responseText) == "string" && xhr.responseText != "") {
                var err = JSON2.parse(xhr.responseText);

                switch (err.ExceptionType) {

                    case 'System.Exception':
                        showErrorMsg(err.Message);
                        return;
                    default:
                        showErrorMsg(xhr.responseText);
                        return;
                }
            } else {
                showErrorMsg("Unknown error occurred in callback.");
            }
        }


        $.fn.insertStatusMessage = function (options) {

            if (this.length === 0) { return };

            // Default settings
            var settings = {
                msgElement: "<div class='{1}'>{0}</div>",
                statusMessage: "[Status Message]",
                msgClass: 'Confirm-Message-Area',
                insertAfter: true,
                timeOutTime: 5000,
                fadeOutTime: 5000
            };
            if (options) {
                $.extend(settings, options);
            }

            var strMsg = settings.msgElement.replace("{0}",
        settings.statusMessage).replace("{1}", settings.msgClass);

            if (settings.insertAfter) {
                $(this).after(strMsg);
            } else {
                $(this).html(strMsg);
            }

            var msgClassSelector = "." + settings.msgClass;

            if ($(msgClassSelector).length > 0) {

                if (settings.timeOutTime > 0) {
                    var t = setTimeout(
            function () {
                if (settings.fadeOutTime > 0) {
                    $(msgClassSelector).fadeOut(settings.fadeOutTime);
                } else {
                    $(msgClassSelector).hide();
                }
            }, settings.timeOutTime);
                } else {
                    if (settings.fadeOutTime > 0) {
                        $(msgClassSelector).fadeOut(settings.fadeOutTime);
                    }
                }
            }

        };
    })();
});