import { pool } from "../database/database.js";
import { BookingCreate, BookingResponse } from "../schemas/booking.js";
import { EmailService } from "../services/emailService.js";

export class BookingRepository {
  public static async create(
    booking: BookingCreate
  ): Promise<BookingResponse> {

    const query = `
      INSERT INTO bookings (
        name,
        company_name,
        email,
        phone,
        budget_range,
        date,
        time,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `;

    const values = [
      booking.name,
      booking.company_name,
      booking.email,
      booking.phone,
      booking.budget_range,
      booking.date,
      booking.time,
      "Pending",
    ];

    const res = await pool.query(query, values);

    const newBooking: BookingResponse = res.rows[0];

    await EmailService.sendEmail(
      newBooking.email,
      "Booking Confirmation - Custom Websites",
      `Hello ${newBooking.name},

Thank you for booking a consultation call with Custom Websites.

BOOKING DETAILS:
--------------------------------------------------
• Client Name: ${newBooking.name}
• Company: ${newBooking.company_name}
• Date: ${newBooking.date}
• Time: ${newBooking.time}
• Budget Range: ${newBooking.budget_range}
• Status: ${newBooking.status}
--------------------------------------------------

We look forward to speaking with you!

Best regards,
Custom Websites Team`
    );

    return newBooking;
  }

  public static async getAll(): Promise<BookingResponse[]> {
    const res = await pool.query(
      "SELECT * FROM bookings ORDER BY date DESC, time DESC"
    );

    return res.rows;
  }

  public static async updateStatus(
    bookingId: number,
    status: string
  ): Promise<BookingResponse | null> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const res = await client.query(
        `
        UPDATE bookings
        SET status = $1
        WHERE id = $2
        RETURNING *;
        `,
        [status, bookingId]
      );

      if (res.rows.length === 0) {
        await client.query("ROLLBACK");
        return null;
      }

      const updatedBooking: BookingResponse = res.rows[0];

      if (status === "Cancelled") {
        const slotRes = await client.query(
          `
          UPDATE slots
          SET is_available = true
          WHERE date = $1
            AND time = $2
          RETURNING *;
          `,
          [updatedBooking.date, updatedBooking.time]
        );

        console.log(`[DEBUG] Booking Status: ${status}`);
        console.log(`[DEBUG] Date: ${updatedBooking.date}`);
        console.log(`[DEBUG] Time: ${updatedBooking.time}`);
        console.log(`[DEBUG] Number of updated rows: ${slotRes.rowCount}`);

        if (slotRes.rowCount === 0) {
          console.warn(
            `[WARNING] No matching slot was found for date: ${updatedBooking.date} and time: ${updatedBooking.time}`
          );
        } else {
          console.log(`[DEBUG] Updated Slot:`, slotRes.rows[0]);
        }
      }

      await client.query("COMMIT");

      // Send email notification outside the transaction block to avoid SMTP delays blocking DB connection
      await EmailService.sendEmail(
        updatedBooking.email,
        `Booking Status Update: ${updatedBooking.status}`,
        `Hello ${updatedBooking.name},

Your consultation booking status for ${updatedBooking.company_name} has been updated.

--------------------------------------------------
BOOKING STATUS DETAILS:
--------------------------------------------------
• Client Name: ${updatedBooking.name}
• Date: ${updatedBooking.date}
• Time: ${updatedBooking.time}
• New Status: ${updatedBooking.status}
--------------------------------------------------

Thank you for choosing Custom Websites!

Best regards,
Custom Websites Team`
      );

      return updatedBooking;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}