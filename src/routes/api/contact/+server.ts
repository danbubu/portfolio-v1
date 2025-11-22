import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  // Remove any potentially dangerous characters
  return input
    .replace(/[<>]/g, "") // Remove < and >
    .trim()
    .slice(0, 5000); // Limit length
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientAddress();

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { name, email, message } = await request.json();

    // Validate input exists
    if (!name || !email || !message) {
      return json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate input types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return json({ error: "Invalid input types" }, { status: 400 });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate input lengths
    if (name.length < 2 || name.length > 100) {
      return json(
        { error: "Name must be between 2 and 100 characters" },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return json(
        { error: "Message must be between 10 and 5000 characters" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Mock: In a real application, you would:
    // 1. Save to database with proper sanitization
    // 2. Send email notification
    // 3. Implement CAPTCHA verification
    // 4. Add honeypot field for bot detection

    // Log the received data (sanitized)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 CONTACT FORM SUBMISSION");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Name:", sanitizedName);
    console.log("Email:", sanitizedEmail);
    console.log("Message:", sanitizedMessage);
    console.log("IP:", clientIp);
    console.log("Timestamp:", new Date().toISOString());
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Simulate database save delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return success response
    return json(
      {
        success: true,
        message: "Contact form submitted successfully",
      },
      {
        status: 200,
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
        },
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  }
};
