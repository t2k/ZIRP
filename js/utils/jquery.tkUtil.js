//  tkillilea  utility functions, add to global $ jquery namespace
define(['jquery'], function ($) {
    //IIFE  instantly invoked Function Expression
    (function () {
        // display elapsed time in relative terms  // pass in a timestamp ie dispay:  5 min(s) ago
        $.elapsedTimeString = function (createdAt) {
            if (!createdAt) { return 'n/a'; }

            var ageInSeconds = (new Date().getTime() - createdAt.getTime()) / 1000, n, s = function (x) { return x === 1 ? '' : 's'; };

            if (ageInSeconds < 2) {
                return 'just now';
            }
            if (ageInSeconds < 60) {
                n = Math.floor(ageInSeconds);
                //return n + ' second' + s(n) + ' ago';
                return n + 's';
            }
            if (ageInSeconds < 60 * 60) {
                n = Math.floor(ageInSeconds / 60);
                //return n + ' minute' + s(n) + ' ago';
                return n + 'm';
            }
            if (ageInSeconds < 60 * 60 * 24) {
                n = Math.floor(ageInSeconds / 60 / 60);
                //return n + ' hour' + s(n) + ' ago';
                return n + 'h';
            }
            if (ageInSeconds < 60 * 60 * 24 * 7) {
                n = Math.floor(ageInSeconds / 60 / 60 / 24);
                //return n + ' day' + s(n) + ' ago';
                return n + 'd';
            }
            if (ageInSeconds < 60 * 60 * 24 * 31) {
                n = Math.floor(ageInSeconds / 60 / 60 / 24 / 7);
                //return n + ' week' + s(n) + ' ago';
                return n + 'w';
            }
            if (ageInSeconds < 60 * 60 * 24 * 365) {
                n = Math.floor(ageInSeconds / 60 / 60 / 24 / 31);
                //return n + ' month' + s(n) + ' ago';
                return n + 'mth';
            }
            n = Math.floor(ageInSeconds / 60 / 60 / 24 / 365);
            //return n + 'year' + s(n) + ' ago';
            return n + 'yr';
        };

        // private methods...
        // UTILITIES
        // deferred wait function... 
        $.wait = function (time) {
            return $.Deferred(function (dfd) {
                setTimeout(dfd.resolve, time);
            }).promise();
        };

        /// private function
        $.get.NetAuthUserName = function () {
            return $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "wsProfile.asmx/UserName",
                data: "{}",
                dataType: "json"
            });
        };


    })();
});