import { forbidden, notFound, ok } from '@core/infra/HttpResponse';
import { Middleware } from '@core/infra/Middleware';
import { FeatureFlags } from '@modules/accounts/domain/features';
import { PermissionDenied } from '@infra/http/errors/PermissionDenied';
import { RequisitedFlagNotExists } from '@infra/http/errors/RequesitedFlagNotExist';

export class EnsureFeatureFlagsMiddleware implements Middleware {
  readonly feature: string;

  constructor(feature: string) {
    this.feature = feature;
  }

  async handle({ user }) {
    if (!FeatureFlags.has(this.feature)) {
      return notFound(new RequisitedFlagNotExists(this.feature));
    }

    if (!FeatureFlags.can(user.features, this.feature)) {
      return forbidden(new PermissionDenied(this.feature));
    }

    return ok();
  }
}