import { highpixelConfig } from '@config/highpixel.config';
import { MailProvider } from '@infra/providers/mail/implementations/MailProvider';
import { RegistrationEmailTemplate } from '@templates/EmailTemplates/RegistrationMailTemplate';

export default {
  key: 'RegistrationMail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    const mailProvider = new MailProvider();

    await mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: `${highpixelConfig.product}`,
        email: `${highpixelConfig.mailContact}`,
      },
      subject: 'Ative seu cadastro na HighPixel',
      body: RegistrationEmailTemplate(data.name, data.activation_token),
    });
  },
};
