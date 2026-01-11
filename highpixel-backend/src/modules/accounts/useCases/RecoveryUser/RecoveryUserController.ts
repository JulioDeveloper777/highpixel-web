import { Controller } from "@core/infra/Controller";
import { HttpResponse, clientError, ok } from "@core/infra/HttpResponse";
import { RecoveryPassword } from "@modules/accounts/useCases/RecoveryUser/RecoveryUser";
import { IRecoveryPasswordRequest } from "@modules/accounts/useCases/RecoveryUser/RecoveryUserDTO";

export class RecoveryPasswordController implements Controller {
  constructor(private recoveryPassword: RecoveryPassword) { }

  async handle({
    password,
    id,
  }: IRecoveryPasswordRequest): Promise<HttpResponse> {
    const result = await this.recoveryPassword.execute({ id, password });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok(result.value);
    }
  }
}