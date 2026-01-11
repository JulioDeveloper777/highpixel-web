import { highpixelConfig } from "@config/highpixel.config";
import { MailProvider } from "@infra/providers/mail/implementations/MailProvider";
import { AppointmentReadyTemplate } from "@templates/AppointmentTemplates/AppointmentReadyTemplate";

export default {
  key: 'AppointmentReadyMail',
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
      subject: 'Esta na hora! Entre na chamada da sua entrevista.',
      body: AppointmentReadyTemplate(data.username, data.message),
    });
  },
};
