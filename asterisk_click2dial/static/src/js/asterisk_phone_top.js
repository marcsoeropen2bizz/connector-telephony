

odoo.define("asterisk_click2dial.systray.phone_top", function (require) {
    "use strict";

    var SystrayMenu = require("web.SystrayMenu");
    var Widget = require("web.Widget");
    var core = require('web.core');
    var _t = core._t;
    var Dialog = require('web.Dialog');

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
            this._rpc({
                route: "/asterisk_ click2dial/get_record_from_my_channel",
                params: { local_context: context },
            }).then(function (r) {
                if (r === false) {
                    Dialog.alert(self, _t("Calling party number not retreived from IPBX or IPBX unreachable by Odoo"),{
                        title: _t("IPBX error"),
                    }),false     
                } else if (typeof r === "string" && isNaN(r)) {
                    Dialog.alert(self, _t("The calling number is not a phone number!"),{
                        title: _t(r+ " is not a number"),
                    },
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
                    self.do_action(action);
                } else if (typeof r === "object" && r.length === 3) {
                    self.displayNotification(
                        {
                            message: _.str.sprintf(_t("On the phone with '%s'"), r[2]),
                            message: _.str.sprintf(_t("Moving to form view of %s (%s ID %d)"),
                            r[2],
                            r[0],
                            r[1]
                            )
                        },
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
