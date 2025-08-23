import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email required" },
        { status: 400 }
      );
    }

    const existing = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({
        success: false,
        message: "You are already on the waitlist",
      });
    }

    await prisma.waitlist.create({
      data: { email },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
  from: `"Sañka" <${process.env.GMAIL_USER}>`,
  to: email,
  subject: "🎉 You’re on the Sañka Waitlist!",
  html: `<!DOCTYPE html>
<html
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--[if mso]>
      <xml
        ><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"
          ><w:DontUseAdvancedTypographyReadingMail
        /></w:WordDocument>
        <o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings
      ></xml>
    <![endif]-->
    <!--[if !mso]><!-->
    <!--<![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }
      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }
      p {
        line-height: inherit;
      }
      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }
      .image_block img + div {
        display: none;
      }
      sup,
      sub {
        font-size: 75%;
        line-height: 0;
      }
      @media (max-width: 620px) {
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }
        .mobile_hide {
          display: none;
        }
        .row-content {
          width: 100% !important;
        }
        .stack .column {
          width: 100%;
          display: block;
        }
        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }
        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
        .row-1 .column-1 .block-2.heading_block h1 {
          font-size: 19px !important;
        }
        .row-1 .column-1 .block-4.paragraph_block td.pad > div {
          font-size: 12px !important;
        }
        .row-1 .column-1 .block-5.social_block td.pad {
          padding: 0 !important;
        }
      }
    </style>
    <!--[if mso
      ]><style>
        sup,
        sub {
          font-size: 100% !important;
        }
        sup {
          mso-text-raise: 10%;
        }
        sub {
          mso-text-raise: -10%;
        }
      </style>
    <![endif]-->
  </head>
  <body
    class="body"
    style="
      background-color: #000000;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      class="nl-container"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #000000;
        background-image: none;
        background-position: top left;
        background-size: auto;
        background-repeat: no-repeat;
      "
    >
      <tbody>
        <tr>
          <td>
            <table
              class="row row-1"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: black;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: black;
                        border-radius: 20px;
                        color: #000000;
                        width: 600px;
                        margin: 0 auto;
                      "
                      width="600"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                            "
                          >
                            <table
                              class="image_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad" style="width: 100%">
                                  <div class="alignment" align="center">
                                    <div style="max-width: 600px">
                                      <img
                                        src="https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/wn5hca2m/imp/g1n/oqg/mail-cover.png"
                                        style="
                                          display: block;
                                          height: auto;
                                          border: 0;
                                          width: 100%;
                                        "
                                        width="600"
                                        alt
                                        title
                                        height="auto"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="heading_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <h1
                                    style="
                                      margin: 0;
                                      color: #919191;
                                      direction: ltr;
                                      font-family: TimesNewRoman,
                                        'Times New Roman', Times, Baskerville,
                                        Georgia, serif;
                                      font-size: 29px;
                                      font-weight: 400;
                                      letter-spacing: normal;
                                      line-height: 1.2;
                                      text-align: center;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                      mso-line-height-alt: 35px;
                                    "
                                  >
                                    <span
                                      class="tinyMce-placeholder"
                                      style="word-break: break-word"
                                      >Thanks for joining Sañka – You’re
                                      in!</span
                                    >
                                  </h1>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="divider_block block-3"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                    >
                                      <tr>
                                        <td
                                          class="divider_inner"
                                          style="
                                            font-size: 1px;
                                            line-height: 1px;
                                            border-top: 1px solid #dddddd;
                                          "
                                        >
                                          <span style="word-break: break-word"
                                            >&#8202;</span
                                          >
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="paragraph_block block-4"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #919191;
                                      direction: ltr;
                                      font-family: Arial, 'Helvetica Neue',
                                        Helvetica, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 1.2;
                                      text-align: left;
                                      mso-line-height-alt: 19px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 16px">
                                      Hi <b>${email}</b>,
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      Thanks for joining the
                                      <strong>Sañka waitlist</strong> – you’re
                                      now one step closer to experiencing the
                                      future of AI-powered creation.
                                    </p>
                                    <p style="margin: 0">
                                      Sañka helps you go from
                                      <strong
                                        >idea → production-ready code, agents
                                        and videos</strong
                                      >
                                      in seconds. Think of it as your personal
                                      AI partner – fast, reliable, and built for
                                      modern creators.
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="social_block block-5"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table
                                      class="social-table"
                                      width="36px"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-block;
                                      "
                                    >
                                      <tr>
                                        <td style="padding: 0 2px 0 2px">
                                          <a
                                            href="https://x.com/heynakul"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/twitter@2x.png"
                                              width="32"
                                              height="auto"
                                              alt="Twitter"
                                              title="twitter"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>
</html>
`,
});


    return NextResponse.json({
      success: true,
      message: "You’ve been added to the waitlist",
    });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await prisma.waitlist.count();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("Count error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to get count" },
      { status: 500 }
    );
  }
}
