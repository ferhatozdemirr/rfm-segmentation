RFM Segmentation Grid

Bu proje RFM (Recency, Frequency, Monetary) verileri kullanılarak müşterilerin
5x5 lik bir grid üzerinde gösterilen bir frontend case çalışmasıdır.

Mock RFM verileri kullanılmış, frequency ve monetary değerleri normalize edilerek
1–5 arası skorlara dönüştürülmüş ve grid üzerinde görselleştirilmiştir.


Kullanılan Teknolojiler

Next.js
React
TypeScript
Tailwind CSS

RFM Mantığı

Recency: Son alışverişten bu yana geçen gün sayısı
Frequency: Yapılan alışveriş sayısı
Monetary: Toplam harcama tutarı

Grid üzerinde:
X ekseni frequencyScore
Y ekseni monetaryScore kullanır
F–M normalize edilmiş Frequency ve Monetary skorlarını ifade eder, grid hücreleri bu skor kombinasyonlarıba göre skorları gösterir.


Normalize Yaklaşımı

Frequency ve Monetary değerleri, dataset içindeki min–max aralığına göre normalize edilerek 1–5 arasında skorlara dönüştürülür.
Bu skorlar grid hücrelerinin koordinatlarını belirler.

Filtreleme ve Seçim

Recency, Frequency ve Monetary değerlerine göre filtreleme yapılabilir,
Grid hücreleri tıklanarak müşteri grupları seçilebilir,
Seçilen müşteri ID’leri mock bir API endpointine gönderilir

API

Seçilen ID’ler aşağıdaki endpoint’e POST isteği ile gönderilir:
POST /api/selected-ids


Datalar 

Datalar 100 tane ve statik olacak şekilde mockData altındaki klasöre yazılmıştır.