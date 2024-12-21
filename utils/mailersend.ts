import 'dotenv/config'
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_TOKEN as string,
})

const sentFrom = new Sender('you@yourdomain.com', 'Your Company')

// Função para enviar email de recuperação de senha
export async function sendPasswordRecoveryEmail(
  recipientEmail: string,
  recipientName: string,
  temporaryPassword: string
) {
  const recipients = [new Recipient(recipientEmail, recipientName)]

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject('Recuperação de senha')
    .setHtml(`
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0;">
          <table align="center" width="600" style="background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
            <tr>
              <td style="text-align: center; padding: 20px;">
                <h1 style="color: #333;">Recuperação de Senha</h1>
                <p style="font-size: 16px; color: #666;">Olá, <strong>${recipientName}</strong>.</p>
                <p style="font-size: 16px; color: #666;">Aqui está sua senha temporária:</p>
                <p style="font-size: 20px; color: #000; font-weight: bold;">${temporaryPassword}</p>
                <p style="font-size: 14px; color: #999;">Recomendamos que você altere sua senha assim que fizer login.</p>
                <a href="https://yourdomain.com/reset-password" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Alterar minha senha</a>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; padding: 10px; font-size: 12px; color: #aaa;">
                © ${new Date().getFullYear()} Your Company. Todos os direitos reservados.
              </td>
            </tr>
          </table>
        </body>
      </html>
    `)
    .setText(
      `Olá ${recipientName},\n\nAqui está sua senha temporária: ${temporaryPassword}\n\nRecomendamos que você altere sua senha assim que fizer login.\n\nVisite https://yourdomain.com/reset-password para redefinir sua senha.`
    )

  try {
    await mailerSend.email.send(emailParams)
    console.log('Email de recuperação de senha enviado com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar email de recuperação de senha:', error)
  }
}
