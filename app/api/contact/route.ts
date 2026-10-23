import { NextResponse } from "next/server";
import { Resend } from "resend";

// Form values go into the email HTML, so escape them first
function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  // Created per request so the build doesn't need RESEND_API_KEY
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 500 }
    );
  }
  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { name, email, message, phone, sector, source } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const brand = source === "Vackert" ? "Vackert" : "Optima Technologies";

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Optima Technologies <optima@resend.dev>", // Replace with your verified domain in production
      to: process.env.CONTACT_EMAIL || "optimatech.dev@gmail.com",
      subject: `New ${brand} Submission: ${String(name).replace(/[\r\n]+/g, " ")}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0066FF;">New Message from ${brand}</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${sector ? `<p><strong>Sector:</strong> ${escapeHtml(sector)}</p>` : ""}
          <hr style="border: 1px solid #eee;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Message sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
