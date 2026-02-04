import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: WelcomeEmailRequest = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending welcome email to: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Hanu Edu <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Hanu Edu - Your Setup Instructions",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Hanu Edu</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
              }
              .container {
                background: white;
                border-radius: 12px;
                padding: 40px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .logo {
                font-size: 28px;
                font-weight: 600;
                color: #1e40af;
                margin-bottom: 10px;
              }
              .welcome-title {
                font-size: 24px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 20px;
              }
              .content {
                margin-bottom: 30px;
              }
              .steps {
                background: #f1f5f9;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
              }
              .step {
                margin-bottom: 15px;
                padding-left: 30px;
                position: relative;
              }
              .step:before {
                content: counter(step-counter);
                counter-increment: step-counter;
                position: absolute;
                left: 0;
                top: 0;
                background: #1e40af;
                color: white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 600;
              }
              .steps {
                counter-reset: step-counter;
              }
              .cta-button {
                display: inline-block;
                background: #1e40af;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin: 20px 0;
                text-align: center;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">HANU CONSULTING</div>
                <div style="color: #6b7280; font-size: 16px;">AI-Powered Excellence</div>
              </div>
              
              <h1 class="welcome-title">Welcome to Hanu Edu!</h1>
              
              <div class="content">
                <p>Thank you for your interest in Hanu Edu. We're excited to have you join our community of forward-thinking professionals and businesses.</p>
                
                <p>Your email has been successfully registered, and you're now one step closer to accessing our comprehensive suite of AI-powered consulting services.</p>
                
                <div class="steps">
                  <h3 style="margin-top: 0; color: #1f2937;">Next Steps:</h3>
                  <div class="step">
                    <strong>Create Your Account:</strong> Click the button below to complete your account setup with your full profile information.
                  </div>
                  <div class="step">
                    <strong>Verify Your Email:</strong> You'll receive a verification email after creating your account.
                  </div>
                  <div class="step">
                    <strong>Explore Our Services:</strong> Once logged in, discover our expertise areas including Maritime, Energy, Technology, and more.
                  </div>
                  <div class="step">
                    <strong>Submit Your First Challenge:</strong> Share your business challenge and get matched with our expert consultants.
                  </div>
                </div>
                
                <div style="text-align: center;">
                  <a href="${Deno.env.get('SITE_URL') || 'https://hanu-consulting.com'}/auth?tab=signup" class="cta-button">
                    Complete Your Account Setup
                  </a>
                </div>
                
                <h3 style="color: #1f2937; margin-top: 30px;">What You'll Get Access To:</h3>
                <ul style="color: #4b5563;">
                  <li><strong>Expert Consultation:</strong> Connect with industry specialists across various sectors</li>
                  <li><strong>AI-Powered Insights:</strong> Leverage cutting-edge technology for business solutions</li>
                  <li><strong>Comprehensive Services:</strong> From strategy development to implementation support</li>
                  <li><strong>Exclusive Resources:</strong> Access to our knowledge base and industry reports</li>
                  <li><strong>Personalized Support:</strong> Dedicated account management for your projects</li>
                </ul>
                
                <p style="margin-top: 30px;">
                  <strong>Questions?</strong> Our team is here to help. Simply reply to this email or contact us at 
                  <a href="mailto:support@hanu-consulting.com" style="color: #1e40af;">support@hanu-consulting.com</a>
                </p>
              </div>
              
              <div class="footer">
                <p><strong>Hanu Edu</strong></p>
                <p>AI-Powered Excellence for Modern Businesses</p>
                <p>This email was sent because you signed up for updates from Hanu Edu.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Welcome email sent successfully",
        messageId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send welcome email",
        details: error.toString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);