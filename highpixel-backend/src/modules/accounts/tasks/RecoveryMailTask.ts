import { highpixelConfig } from '@config/highpixel.config';
import { MailProvider } from '@infra/providers/mail/implementations/MailProvider';
import { RecoveryEmailTemplate } from '@templates/EmailTemplates/RecoveryEmailTemplate';

export default {
  key: 'RecoveryMail',
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
      subject: 'Recuperação de conta',
      body: RecoveryEmailTemplate(data.name, data.recovery_token),
    });
  },
};
