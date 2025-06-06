const BookingModel = require('../../model/booking')
const { Resend } = require('resend')
const moment = require('moment')
//.env API
require('dotenv').config()
const resend = new Resend(process.env.RESEND_API_KEY)
// console.log(process.env.RESEND_API_KEY)
//.env API

class InventoryController {
    static inventory = async (req, res) => {
        try {
            const Booking = await BookingModel.find().populate('carId')
            console.log(Booking)
            const validBookings = Booking.filter(b => b.carId);
            res.render('admin/inventory', { b:validBookings, approve: req.flash('approve') })
        } catch (error) {
            console.log(error)
        }
    }
    static bookingStatus = async (req, res) => {
        try {
            // console.log(req.body)
            const id = req.params.id;
            const { status } = req.body
            const booking = await BookingModel.findByIdAndUpdate(id, {
                status,
            }).populate('carId')

            await resend.emails.send({
                from: 'Harshmotors@resend.dev',
                to: booking.email,
                subject: `Your Booking Has Been ${status}`,
                html: `
        <p><strong>Hi ${booking.name},</strong></p>

<p>Just letting you know — your booking for <strong>${booking.carId.cname}</strong> has been <strong>${status}</strong>.</p>

<p><strong>Date:</strong> ${moment().format('MMMM Do YYYY, h:mm A')}</p>

<p>Thanks for booking with us! If you have any questions or need help, feel free to reach out anytime.</p>

<p>Warm wishes,<br/>${`Harsh Motors`}</p>


      `,
            });
            req.flash('approve', "Car Booking Status Updated :)")
            return res.redirect('/admin/inventory')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = InventoryController