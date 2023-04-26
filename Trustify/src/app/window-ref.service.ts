/**
 * Riferimento al codice: https://juristr.com/blog/2016/09/ng2-get-window-ref/
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  get nativeWindow(): any {
    return window;
  }
}
