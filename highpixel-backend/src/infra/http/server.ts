import 'dotenv/config';
import HighPixelAPI from '@infra/http/app';
import log from '@vendor/log';

HighPixelAPI.listen(process.env.PORT, () =>
  log.success('HighPixelAPI: Network & Web has been loaded')
);