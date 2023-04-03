/**
 * Riferimento al codice: https://juristr.com/blog/2016/09/ng2-get-window-ref/
 */

import { Injectable } from '@angular/core';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  get nativeWindow(): any {
    return _window();
  }
}
