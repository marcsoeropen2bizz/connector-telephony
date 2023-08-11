

odoo.define("asterisk_click2dial.systray.phone_top", function (require) {
    "use strict";

    var SystrayMenu = require("web.SystrayMenu");
    var Widget = require("web.Widget");
    var core = require('web.core');
    var _t = core._t;

    var OpenCallerMenu = Widget.extend({
        name: "open_caller",
        template: "asterisk_click2dial.systray.OpenCaller",
        events: {
            click: "on_open_caller",
        },

        on_open_caller: function (event) {
            event.stopPropagation();
            var self = this;
            var context = this.getSession().user_context;
            self._rpc({
                route: "/asterisk_click2dial/get_record_from_my_channel",
                params: { local_context: context },
            }).then(function (r) {
                // Console.log('RESULT RPC r='+r);
                // console.log('RESULT RPC type r='+typeof r);
                // console.log('RESULT RPC isNaN r='+isNaN(r));
                if (r === false) {
                    this.do_warn(
                        _t("IPBX error"),
                        _t(
                            "Calling party number not retreived from IPBX or IPBX unreachable by Odoo"
                        ),
                        false
                    );
                } else if (typeof r === "string" && isNaN(r)) {
                    this.do_warn(
                        r,
                        _t("The calling number is not a phone number!"),
                        false
                    );
                } else if (typeof r === "string") {
                    var action = {
                        name: _t("Number Not Found"),
                        type: "ir.actions.act_window",
                        res_model: "number.not.found",
                        view_mode: "form",
                        views: [[false, "form"]],
                        target: "new",
                        context: { default_calling_number: r },
                    };
                    this.do_action(action);
                } else if (typeof r === "object" && r.length === 3) {
                    this.do_notify(
                        _.str.sprintf(_t("On the phone with '%s'"), r[2]),
                        _.str.sprintf(
                            _t("Moving to form view of %s (%s ID %d)"),
                            r[2],
                            r[0],
                            r[1]
                        ),
                        false
                    );
                    var action = {
                        type: "ir.actions.act_window",
                        res_model: r[0],
                        res_id: r[1],
                        view_mode: "form,tree",
                        views: [[false, "form"]],
                        /* If you want to make it work with the 'web' module
                of Odoo Enterprise edition, you have to change the line
                target: 'current',
                  to:
                target: 'new',
                If you want to use target: 'current', with web/enterprise,
                you have to reload the Web page just after */
                        target: "current",
                        context: {},
                    };
                    self.do_action(action);
                }
            });

        },

    });
    SystrayMenu.Items.push(OpenCallerMenu);
    return OpenCallerMenu;
});
