/** @odoo-module **/

import { PhoneField } from "@web/views/fields/phone/phone_field";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class BPPhoneField extends PhoneField {
    setup(){
        this.rpc = useService("rpc");
        console.log(this);
    }
    get phoneHref() {
        return this.rpc("/asterisk_ click2dial/get_record_from_my_channel", {});

    } 
    async onClick() {
        await this.props.record.save();
        console.log("fcking hell");
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