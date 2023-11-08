from odoo import _, models


class ResPartner(models.Model):
    _inherit = "project.task"

    def clickToDial(self):
        phone = self.env['phone.common']
        if self.phone:
            phone.click2dial(self.phone)