/** @odoo-module **/


import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";
// import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";

class click2dial extends Component{
    setup() {
        super.setup();
        // this.action = useService("action");
        // this.orm = useService("orm");
    
    }
    showDialButton(){
        return true;
    }
    
}
click2dial.template = 'base_phone.updatedphone_widget';

registry.category("fields").add("click2dial", {
    component: click2dial,
});
   




