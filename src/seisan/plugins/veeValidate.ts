import { localize, setLocale } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import ja from '@vee-validate/i18n/dist/locale/ja.json';
import AllRules from '@vee-validate/rules';
import { defineRule, configure } from 'vee-validate';

import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ja/zod.json";

export default defineNuxtPlugin((nuxtApp) => {
  // VeeValidateの言語設定
  configure({
    generateMessage: localize({
      en,
      ja,
    }),
  });

  Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]); // 全ルールを使えるようにする
  });

  setLocale('ja');

  // zodの言語設定
  i18next.init({
    lng: "es",
    resources: {
      es: { zod: translation },
    },
  });
  z.setErrorMap(zodI18nMap);
});
