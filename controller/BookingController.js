const mongoose = require('mongoose')
const BookingModel = require('../model/booking')
const { Resend } = require('resend')
const moment = require('moment')
// .env API Package
require('dotenv').config();
const resend = new Resend(process.env.RESEND_API_KEY)
// .env API Package

// console.log("api :", process.env.RESEND_API_KEY )

class BookingController {

  static carbooking = async (req, res) => {
    try {

      const { name, image } = req.user
      // console.log(req.user)
      // console.log("User's ID:",id); // ✅ check yaha pe
      // console.log(req.udata)
      const booking = await BookingModel.find().populate('carId')

      // Filter out bookings with missing car
      const filteredBookings = booking.filter(b => b.carId !== null);

      res.render('booking', { n: name, i: image, book: filteredBookings, msg: req.flash('success') })
    } catch (error) {
      console.log(error)
    }
  }

  static createBooking = async (req, res) => {
    try {
      console.log(req.body)
      const { id } = req.params
      const { fromdate, todate, message, name, carname, email, carId } = req.body
      // console.log(req.body)
      const book = await BookingModel.create({
        fromdate,
        todate,
        message,
        carname,
        email,
        name,
        carId,
        user_id: id
      })

      // 2. Send email to user
      await resend.emails.send({
        from: 'Harshmotors@resend.dev',
        to: email,
        subject: 'Booking Received!',
        html: `
        <p><strong>Hello ${name},</strong></p>

<p>Thank you for your booking! We’ve received your request for <strong>${carname}</strong>, and it’s now in progress.</p>

<p><strong>Date:</strong> ${moment().format('MMMM Do YYYY, h:mm A')}</p>

<p>I’ll update you once your booking is approved or rejected. Really appreciate your patience!</p>

<p>Best regards,<br/>${`Harsh Motors`}</p>

      `,
      });
      // console.log(name, email)
      console.log("Booking saved successfully. Redirecting now...");
      req.flash('success', "Car Booked. Please check mail :)")
      res.redirect('/booking')

    } catch (error) {
      console.log(error)
    }
  }

}
module.exports = BookingController