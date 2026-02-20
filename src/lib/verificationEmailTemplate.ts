export function VerificationEmailTemplate(
  verificationLink: string,
): string {
  return `
    <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verificação de Email</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" 
              style="background:#ffffff;border-radius:12px;padding:40px;box-shadow:0 8px 24px rgba(0,0,0,0.08);">

              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <h1 style="margin:0;font-size:24px;color:#111827;">
                    Confirme seu Email
                  </h1>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding-bottom:16px;">
                  <p style="margin:0;font-size:16px;color:#4b5563;line-height:1.6;">
                    Obrigado por se cadastrar!  
                    Clique no botão abaixo para verificar seu endereço de email.
                  </p>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding:32px 0;">
                  <a href="${verificationLink}"
                    style="
                      background:linear-gradient(135deg,#6366f1,#8b5cf6);
                      color:#ffffff;
                      padding:14px 28px;
                      text-decoration:none;
                      font-weight:bold;
                      border-radius:8px;
                      display:inline-block;
                      font-size:16px;
                    ">
                    Verificar Email
                  </a>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding-top:8px;">
                  <p style="margin:0;font-size:14px;color:#6b7280;">
                    Ou copie e cole o link abaixo no seu navegador:
                  </p>
                  <p style="word-break:break-all;font-size:13px;color:#6366f1;margin-top:8px;">
                    ${verificationLink}
                  </p>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding-top:32px;">
                  <p style="margin:0;font-size:12px;color:#9ca3af;">
                    Se você não solicitou este cadastro, ignore este email.
                  </p>
                </td>
              </tr>

            </table>

            <table width="600" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
              <tr>
                <td align="center">
                  <p style="font-size:12px;color:#9ca3af;margin:0;">
                    © ${new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </body>
  </html>
    `;
}
