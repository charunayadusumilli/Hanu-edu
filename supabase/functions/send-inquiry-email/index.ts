import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryEmailRequest {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  inquiryType: string;
  message: string;
  budget?: string;
  timeline?: string;
  urgency?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const inquiryData: InquiryEmailRequest = await req.json();
    
    console.log("Sending inquiry email for:", inquiryData.fullName);

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          New Client Inquiry - Hanu Edu
        </h1>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0;">Contact Information</h2>
          <p><strong>Name:</strong> ${inquiryData.fullName}</p>
          <p><strong>Email:</strong> ${inquiryData.email}</p>
          ${inquiryData.phone ? `<p><strong>Phone:</strong> ${inquiryData.phone}</p>` : ''}
          ${inquiryData.companyName ? `<p><strong>Company:</strong> ${inquiryData.companyName}</p>` : ''}
        </div>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0;">Inquiry Details</h2>
          <p><strong>Type:</strong> ${inquiryData.inquiryType}</p>
          ${inquiryData.budget ? `<p><strong>Budget:</strong> ${inquiryData.budget}</p>` : ''}
          ${inquiryData.timeline ? `<p><strong>Timeline:</strong> ${inquiryData.timeline}</p>` : ''}
          ${inquiryData.urgency ? `<p><strong>Urgency:</strong> ${inquiryData.urgency}</p>` : ''}
        </div>
        
        <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0;">Message</h2>
          <p style="white-space: pre-wrap;">${inquiryData.message}</p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <p style="color: #6b7280; font-size: 14px;">
          This inquiry was submitted through the Hanu Edu website client onboarding form.
          <br>
          Timestamp: ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Hanu Edu <noreply@hanu-consulting.com>",
      to: ["contact@hanu-consulting.com"],
      subject: `New Client Inquiry: ${inquiryData.inquiryType} - ${inquiryData.fullName}`,
      html: emailHTML,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending inquiry email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);