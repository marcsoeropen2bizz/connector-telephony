# Copyright 2010-2021 Akretion France (http://www.akretion.com/)
# @author: Alexis de Lattre <alexis.delattre@akretion.com>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import _, api, fields, models
from odoo.exceptions import UserError, ValidationError


class ResPartner(models.Model):
    _inherit = "res.partner"

    def clickToDial(self):
        phone = self.env['phone.common']
        if self.phone:
            phone.click2dial(self.phone)

    def clickToDialMobile(self):
        mobile = self.env['phone.common']
        if self.mobile:
            mobile.click2dial(self.mobile)
