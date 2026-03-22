# İstemci Geliştirme Yapılacaklar

## İ18n (Uluslararasılaştırma) Desteği

- [ ] i18n desteği ekle
   - [ ] Server tarafında kullanılan i18n kütüphanesiyle uyumlu olmasını sağla (aynı veya uyumlu kütüphane kullan)
   - [ ] package.json'a i18n kütüphanesini ekle
   - [ ] En az iki dil için dil tanım dosyaları ekle (Türkçe ve İngilizce)
   - [ ] Varsayılan dili Türkçe olarak belirle
   - [ ] Client klasörü altındaki bileşenleri tara ve bulduğun metinleri dil tanım dosyalarına ekle
   - [ ] Kod içinde dil anahtarlarını kullan
   - [ ] i18n kütüphanesini, browser dili tercihine ve localStorage'de saklı dile göre otomatik değiştirecek şekilde ayarla
   - [ ] Dil değiştirme butonu ekle ve kullanıcı tercihini localStorage'e kaydet

## Bileşen Geliştirme

- [x] Chat arayüzü bileşenleri geliştir
- [ ] Responsive tasarım ekle
- [ ] Tema (light/dark mode) desteği ekle

## Görsel ve Animasyon Geliştirmeleri

- [x] Tarot kartı görsel alt yapısının kurulması
   - [x] Tüm tarot kartı resimlerinin asset olarak projeye eklenmesi
   - [ ] Kartların ekranda dönel (rotational) bir biçimde hareket ettirilebilmesi için gerekli animasyon alt yapısının (framer-motion, gsap vb.) kurulması ve örnek bir bileşen oluşturulması

## Authentication Geliştirme

- [ ] Logout akışı ekle
   - [ ] Oturum bilgilerini saklayan state/context ve/veya localStorage temizle
   - [ ] Logout butonu oluştur ve nav/menu içerisinde konumlandır
   - [ ] Sunucuya logout isteği gönder (token invalidation, vs.)
   - [ ] Başarılı logout sonrası kullanıcıyı login sayfasına yönlendir
   - [ ] UI’ye loading ve hata durumları ekle
   - [ ] Test senaryolarını yaz (e2e/ünit)
   - [ ] Oturum açık değilken erişilememesi gereken sayfalara guard ekle
