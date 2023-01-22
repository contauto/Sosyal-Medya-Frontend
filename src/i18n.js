import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from "timeago.js";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        "Sign Up": "Sign Up",
        "Password mismatch": "Password mismatch",
        Username: "Username",
        Name: "Name",
        Password: "Password",
        "Re-Password": "Re-Password",
        Login: "Login",
        Logout: "Logout",
        Users: "Users",
        Previous: "<Previous",
        Next: "Next>",
        "Load Failed": "Load Failed",
        "User Not Found": "User Not Found",
        Edit: "Edit",
        "Change Name": "Change Name",
        Save: "Save",
        Cancel: "Cancel",
        "Change Image": "Change Image",
        "My Profile": "My Profile",
        "There are no sosses": "There are no sosses",
        "Load old sosses": "Load old sosses",
      },
    },
    tr: {
      translations: {
        "Sign Up": "Kayıt Ol",
        "Password mismatch": "Aynı şifreyi giriniz",
        Username: "Kullanıcı Adı",
        Name: "İsim",
        Password: "Şifre",
        "Re-Password": "Şifreyi Tekrarla",
        Login: "Giriş Yap",
        Logout: "Çıkış Yap",
        Users: "Kullanıcılar",
        Previous: "<Önceki",
        Next: "Sonraki>",
        "Load Failed": "Yükleme Başarısız",
        "User Not Found": "Kullanıcı Bulunamadı",
        Edit: "Düzenle",
        "Change Name": "İsminizi Değiştirin",
        Save: "Kaydet",
        Cancel: "İptal Et",
        "Change Image": "Profil Resminizi Değiştirin",
        "My Profile": "Hesabım",
        "There are no sosses": "Sos bulunamadı",
        "Load old sosses": "Eski sosları getir",
      },
    },
  },
  fallbackLng: "tr",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    useSuspense: true,
  },
});

const timeageTR = (number, index) => {
  return [
    ["az önce", "şimdi"],
    ["%s saniye önce", "%s saniye içinde"],
    ["1 dakika önce", "1 dakika içinde"],
    ["%s dakika önce", "%s dakika içinde"],
    ["1 saat önce", "1 saat içinde"],
    ["%s saat önce", "%s saat içinde"],
    ["1 gün önce", "1 gün içinde"],
    ["%s gün önce", "%s gün içinde"],
    ["1 hafta önce", "1 hafta içinde"],
    ["%s hafta önce", "%s hafta içinde"],
    ["1 ay önce", "1 ay içinde"],
    ["%s ay önce", "%s ay içinde"],
    ["1 yıl önce", "1 yıl içinde"],
    ["%s yıl önce", "%s yıl içinde"],
  ][index];
};
register("tr", timeageTR);

export default i18n;
