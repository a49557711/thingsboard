///
/// Copyright © 2016-2019 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';

export function updateUserLang(translate: TranslateService, userLang: string) {
  let targetLang = userLang;
  console.log(`User lang: ${targetLang}`);
  if (!targetLang) {
    targetLang = translate.getBrowserCultureLang();
    console.log(`Fallback to browser lang: ${targetLang}`);
  }
  const detectedSupportedLang = detectSupportedLang(targetLang);
  console.log(`Detected supported lang: ${detectedSupportedLang}`);
  translate.use(detectedSupportedLang);
}

function detectSupportedLang(targetLang: string): string {
  const langTag = (targetLang || '').split('-').join('_');
  if (langTag.length) {
    if (environment.supportedLangs.indexOf(langTag) > -1) {
      return langTag;
    } else {
      const parts = langTag.split('_');
      let lang;
      if (parts.length === 2) {
        lang = parts[0];
      } else {
        lang = langTag;
      }
      const foundLangs = environment.supportedLangs.filter(
        (supportedLang: string) => {
          const supportedLangParts = supportedLang.split('_');
          return supportedLangParts[0] === lang;
        }
      );
      if (foundLangs.length) {
        return foundLangs[0];
      }
    }
  }
  return environment.defaultLang;
}