/*
Name: jquery.textCounter.js
Author: Andy Matthews
extended by: Ted Killilea 
    add bootstrap classes and better default naming
Website: http://www.andyMatthews.net
Packed With: http://jsutility.pjoneil.net/
*/
define(['jquery'], function ($) {
    (function () {
        $.fn.textCounter = function (o) {
            o = $.extend({}, $.fn.textCounter.defaults, o);

            return this.each(function (i, el) {  // i is the selection iterator , e is the element
                var $e = $(el);
                $e.text(o.limit);
                $(o.target).keyup(function () {
                    var cnt = this.value.length;

                    if (cnt === 0) {
                        $(o.action).attr('disabled', true);
                        $e.removeClass('badge-warning badge-important');
                    } else if (cnt <= (o.limit - o.alertAt)) {
                        // clear skies
                        $(o.action).removeAttr('disabled');
                        $e.removeClass('badge-warning badge-important');
                    } else if ((cnt > (o.limit - o.alertAt)) && (cnt <= (o.limit - o.stopAt))) {
                        // getting close
                        $(o.action).removeAttr('disabled');
                        $e.addClass('badge-warning badge-important');
                    } else {
                        // over limit
                        $(o.action).attr('disabled', 'disabled');
                        $e.removeClass('badge-warning').addClass('badge-important');
                        if (o.stopAtLimit) this.value = this.value.substring(0, o.limit);
                    }

                    $e.text(o.limit - cnt);

                }).trigger('keyup');
            });
        }

        $.fn.textCounter.defaults = {
            limit: 140,
            alertAt: 10,
            stopAt: 0,
            target: '',
            action: '',
            stopAtLimit: false
        };

    })();
});