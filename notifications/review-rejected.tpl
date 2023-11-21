{%-
  # Swell recommends building email templates using MJML (https://mjml.io/).
  #
  # The following global vars are available in all templates:
  #
  #   get: function(url, data) // helper to get swell data via api
  #   settings: { ... } // your app settings
  #   store: {
  #     id: string
  #     name: string
  #     url: string
  #     admin_url: string
  #     logo: { url: string }
  #     logo_width: number
  #     color: string // store primary color
  #     support_email: string
  #     support_phone: string
  #     currency: string
  #   }
-%}

<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 0 0 13px 0;
    }
  </style>
  <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <style type="text/css">
  </style>
</head>

<body style="word-spacing:normal;">
  <div style="">
    <p>Hi {{ account.first_name }},</p>

    <p>Your {{ rating }} star review for <a href="{{ product_url }}">{{ product.name }}</a> was not approved for the following reason:</p>

    <p>{{ rejected_reason }}</p>

    <p>--</p>

    <p>{{ body }}</p>

    <p>--</p>

    <p>If you have any feedback about this decision, we welcome your feedback. You can reply to this email.</p>

    <p>Thank you</p>
  </div>
</body>

</html>