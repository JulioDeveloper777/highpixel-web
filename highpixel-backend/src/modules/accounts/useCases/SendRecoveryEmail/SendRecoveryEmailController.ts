import { Controller } from "@core/infra/Controller";
import { HttpResponse, ok, fail } from "@core/infra/HttpResponse";
import { SendRecoveryEmail } from "@modules/accounts/useCases/SendRecoveryEmail/SendRecoveryEmail";
import { SendRecoveryEmailRequest } from "@modules/accounts/useCases/SendRecoveryEmail/SendRecoveryEmailDTO";

export class SendRecoveryEmailController implements Controller {
  constructor(private sendRecoveryEmail: SendRecoveryEmail) { }

  async handle({ email }: SendRecoveryEmailRequest): Promise<HttpResponse> {
    const result = await this.sendRecoveryEmail.execute({ email });

    if (result.isLeft()) {
      const error = result.value;
      return fail(error);
    } else {
      return ok();
    }
  }
}
