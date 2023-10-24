import { environment } from '../../environments/environment';
import { Location } from '@angular/common';

export class Util {
  public static apiPublicUrl(path: string) {
    const url = Location.joinWithSlash(environment.api_url, 'api');
    return Location.joinWithSlash(url, path);
  }

  public static apiAuthUrl(path: string) {
    const url = Location.joinWithSlash(environment.api_url, 'api/auth');
    return Location.joinWithSlash(url, path);
  }
}
