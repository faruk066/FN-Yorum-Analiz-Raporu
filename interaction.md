# Yorum Analizi Uygulaması - İnteraktif Tasarım

## Ana Sayfa (index.html)

### Kullanıcı Akışı
1. **URL Girişi**: Kullanıcı ürün veya firma web sitesi URL'sini girer
2. **Analiz Başlatma**: "Analiz Et" butonu ile işlem başlatılır
3. **Yükleme Ekranı**: Gerçek zamanlı ilerleme çubuğu ve animasyonlar
4. **Yönlendirme**: Analiz tamamlandığında sonuçlar sayfasına yönlendirme

### İnteraktif Öğeler
- **URL Input Field**: Otomatik URL doğrulama ve format kontrolü
- **Analiz Butonu**: Hover efektleri ve tıklama animasyonları
- **Progress Bar**: Gerçek zamanlı işlem ilerlemesi
- **Örnek URL'ler**: Hızlı test için örnek linkler

### Animasyonlar
- **Parallax Arka Plan**: Sayfa kaydırma ile derinlik efekti
- **Metin Yazım Efekti**: Başlıkta karakter karakter yazım animasyonu
- **Kart Hover Efektleri**: İçerik kartlarının yükselme animasyonu
- **Yükleme Animasyonları**: İşlem sırasında dönen ikon ve metin

## Analiz Sonuçları Sayfası (analysis.html)

### Rapor Bileşenleri
1. **İşletme/Ürün Bilgileri**: Temel bilgiler kartı
2. **Özet Analiz**: Ana bulguların kısa özeti
3. **Kritik Sorunlar**: Öncelikli çözülmesi gereken konular
4. **En Olumlu Yorum**: En yüksek puan alan yorum
5. **En Olumsuz Yorum**: En düşük puan alan yorum
6. **Şüpheli Yorumlar**: Sahte yorum tespiti
7. **Tarihsel Dağılım**: Yorumların zaman çizelgesi
8. **Duygu Dağılımı**: Pozitif, nötr, negatif oranları
9. **Anahtar Konular**: Sık geçen temalar ve konular

### İnteraktif Özellikler
- **Filtreleme Seçenekleri**: Tarih aralığı, duygu türü, platform
- **Grafik Etkileşimleri**: Hover detayları, zoom, filtreleme
- **Rapor Genişletme**: Detaylı analiz için kart genişletme
- **PDF İndirme**: Raporun PDF formatında dışa aktarılması

### Veri Görselleştirmeleri
- **Duygu Pasta Grafiği**: Renk kodlu duygu dağılımı
- **Zaman Çizelgesi Grafiği**: Yorum aktivitesi zaman çizelgesi
- **Konu Bulutu**: Önemli anahtar kelimelerin görselleştirilmesi
- **Skor Göstergeleri**: Sayısal değerlendirmelerin gösterimi

## İşlevsel Özellikler

### Gerçek Zamanlı Analiz
- **URL Tarama**: Web sitesi içeriğinin analizi
- **Yorum Toplama**: Çeşitli platformlardan yorum toplama
- **AI Analizi**: Yapay zeka destekli duygu ve konu analizi
- **Rapor Oluşturma**: Otomatik rapor oluşturma süreci

### Kullanıcı Deneyimi
- **Responsive Tasarım**: Tüm cihazlarda mükemmel çalışma
- **Hızlı Yükleme**: Optimize edilmiş performans
- **Erişilebilirlik**: WCAG 2.1 AA uyumlu
- **Çoklu Dil Desteği**: Türkçe ve İngilizce arayüz

### Veri Güvenliği
- **Gizlilik Politikası**: Kullanıcı verilerinin korunması
- **Geçici Veri Saklama**: Analiz sonrası veri temizliği
- **SSL Şifreleme**: Güvenli veri iletimi

## Teknik İmplementasyon

### Frontend Teknolojileri
- **HTML5**: Semantik yapı
- **CSS3**: Modern stiller ve animasyonlar
- **JavaScript (ES6+)**: İnteraktivite ve API entegrasyonu
- **Tailwind CSS**: Hızlı ve tutarlı stillendirme

### Kütüphane Entegrasyonları
- **Anime.js**: Animasyonlar ve geçişler
- **ECharts.js**: Veri görselleştirme
- **Pixi.js**: Parallax efektleri
- **Splitting.js**: Metin animasyonları
- **Typed.js**: Yazı efektleri
- **html2pdf.js**: PDF dışa aktarma

### API Entegrasyonu
- **Web Scraping**: Web sitesi içeriği analizi
- **Sentiment Analysis**: Duygu analizi API'leri
- **NLP Processing**: Doğal dil işleme
- **Data Visualization**: Grafik ve rapor oluşturma