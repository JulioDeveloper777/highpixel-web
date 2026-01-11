import { highpixelConfig } from '@config/highpixel.config';
import { MailProvider } from '@infra/providers/mail/implementations/MailProvider';
import { WhitelistChangeStatus } from '@templates/EmailTemplates/WhitelistChangeStatus';

export default {
  key: 'WhitelistChangeEmail',
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
      subject: 'A sua whitelist mudou de status.',
      body: WhitelistChangeStatus(data.name)
    });
  },
};
