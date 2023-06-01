/* eslint-disable */

/*  Copyright 2014-2021 Akretion (Alexis de Lattre <alexis.delattre@akretion.com>)
    Copyright 2015-2021 Juris Malinens (port to v9)
    License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).   */

odoo.define("asterisk_click2dial.systray.OpenCaller", function (require) {
    "use strict";

    var core = require("web.core");
    var SystrayMenu = require("web.SystrayMenu");
    var Widget = require("web.Widget");

    var _t = core._t;

    var FieldPhone = require("base_phone.updatedphone_widget").FieldPhone;

    FieldPhone.include({
        showDialButton: function () {
            return true;
        },
    });

});
