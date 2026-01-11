import { highpixelConfig } from '@config/highpixel.config';
import { MailProvider } from '@infra/providers/mail/implementations/MailProvider';
import { AppointmentAlertTemplate } from '@templates/AppointmentTemplates/AppointmentAlertTemplate';

export default {
  key: 'AppointmentAlertMail',
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
      subject: 'A sua entrevista começa em 10 minutos.',
      body: AppointmentAlertTemplate(data.message),
    });
  },
};
