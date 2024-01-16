/** @odoo-module **/

import { PhoneField } from "@web/views/fields/phone/phone_field";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class BPPhoneField extends PhoneField {
    setup(){
        this.rpc = useService("rpc");
        this.orm = useService("orm");
        console.log(this.phoneHref);        
    }
    get phoneHref() {
        return "/my"

    } 
    async onClick() {
        await this.rpc("/asterisk_click2dial/get_record_from_my_channel", {})
    }
}

BPPhoneField.template = "owl.BPPhoneField";
BPPhoneField.supportedTypes = ['char'];

export const bpPhoneField = {
    ...PhoneField,
    component: BPPhoneField,    
    };

registry.category("fields").add("bp_phone", bpPhoneField);
BPPhoneField.props = ["*"];