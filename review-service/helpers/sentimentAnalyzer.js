const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['id'] });

async function initializeSentimentAnalyzer() {
    manager.addDocument('id', 'sangat enak', 'sentiment.positive');
    manager.addDocument('id', 'enak sekali', 'sentiment.positive');
    manager.addDocument('id', 'makanan lezat', 'sentiment.positive');
    manager.addDocument('id', 'pelayanan bagus', 'sentiment.positive');
    manager.addDocument('id', 'suka banget', 'sentiment.positive');
    manager.addDocument('id', 'rekomendasi', 'sentiment.positive');
    manager.addDocument('id', 'harga terjangkau', 'sentiment.positive');
    manager.addDocument('id', 'worth it', 'sentiment.positive');
    manager.addDocument('id', 'recommended', 'sentiment.positive');
    manager.addDocument('id', 'mantap', 'sentiment.positive');
    manager.addDocument('id', 'puas', 'sentiment.positive');
    manager.addDocument('id', 'cepat', 'sentiment.positive');
    manager.addDocument('id', 'memuaskan', 'sentiment.positive');
    manager.addDocument('id', 'top markotop', 'sentiment.positive');
    manager.addDocument('id', 'gak nyesel', 'sentiment.positive');
    manager.addDocument('id', 'tidak mengecewakan', 'sentiment.positive');
    manager.addDocument('id', 'pesanan sesuai', 'sentiment.positive');
    manager.addDocument('id', 'porsi banyak', 'sentiment.positive');
    manager.addDocument('id', 'porsi pas', 'sentiment.positive');
    manager.addDocument('id', 'rasanya pas', 'sentiment.positive');
    manager.addDocument('id', 'rasa juara', 'sentiment.positive');
    manager.addDocument('id', 'nagih', 'sentiment.positive');
    manager.addDocument('id', 'bikin nagih', 'sentiment.positive');
    manager.addDocument('id', 'enak poll', 'sentiment.positive');
    manager.addDocument('id', 'enak parah', 'sentiment.positive');
    manager.addDocument('id', 'maknyus', 'sentiment.positive');
    manager.addDocument('id', 'nikmat', 'sentiment.positive');
    manager.addDocument('id', 'sedap', 'sentiment.positive');
    manager.addDocument('id', 'gurih', 'sentiment.positive');
    manager.addDocument('id', 'lembut', 'sentiment.positive');
    manager.addDocument('id', 'fresh', 'sentiment.positive');
    manager.addDocument('id', 'hangat', 'sentiment.positive');
    manager.addDocument('id', 'empuk', 'sentiment.positive');
    manager.addDocument('id', 'renyah', 'sentiment.positive');
    manager.addDocument('id', 'kriuk', 'sentiment.positive');
    manager.addDocument('id', 'kualitas bagus', 'sentiment.positive');
    manager.addDocument('id', 'bersih', 'sentiment.positive');
    manager.addDocument('id', 'higienis', 'sentiment.positive');
    manager.addDocument('id', 'ramah', 'sentiment.positive');
    manager.addDocument('id', 'pelayan ramah', 'sentiment.positive');
    manager.addDocument('id', 'respon cepat', 'sentiment.positive');
    manager.addDocument('id', 'pengiriman cepat', 'sentiment.positive');
    manager.addDocument('id', 'pengantaran tepat waktu', 'sentiment.positive');
    manager.addDocument('id', 'sampai dengan selamat', 'sentiment.positive');
    manager.addDocument('id', 'packing rapi', 'sentiment.positive');
    manager.addDocument('id', 'kemasan bagus', 'sentiment.positive');
    manager.addDocument('id', 'makanan sampai masih panas', 'sentiment.positive');
    manager.addDocument('id', 'porsi besar', 'sentiment.positive');
    manager.addDocument('id', 'kenyang', 'sentiment.positive');
    manager.addDocument('id', 'bikin kenyang', 'sentiment.positive');
    manager.addDocument('id', 'harga bersahabat', 'sentiment.positive');
    manager.addDocument('id', 'harga worth it', 'sentiment.positive');
    manager.addDocument('id', 'murah meriah', 'sentiment.positive');
    manager.addDocument('id', 'layak dicoba', 'sentiment.positive');
    manager.addDocument('id', 'layak harga', 'sentiment.positive');
    manager.addDocument('id', 'best seller', 'sentiment.positive');
    manager.addDocument('id', 'favorit', 'sentiment.positive');
    manager.addDocument('id', 'menu andalan', 'sentiment.positive');
    manager.addDocument('id', 'pasti pesan lagi', 'sentiment.positive');
    manager.addDocument('id', 'bakal repeat order', 'sentiment.positive');
    manager.addDocument('id', 'bakal beli lagi', 'sentiment.positive');
    manager.addDocument('id', 'bintang 5', 'sentiment.positive');
    manager.addDocument('id', 'bintang lima', 'sentiment.positive');
    manager.addDocument('id', 'pelayanan memuaskan', 'sentiment.positive');
    manager.addDocument('id', 'harga sesuai kualitas', 'sentiment.positive');
    manager.addDocument('id', 'cepat saji', 'sentiment.positive');
    manager.addDocument('id', 'gratis ongkir', 'sentiment.positive');
    manager.addDocument('id', 'ada promo', 'sentiment.positive');
    manager.addDocument('id', 'bonus melimpah', 'sentiment.positive');
    manager.addDocument('id', 'dapat bonus', 'sentiment.positive');
    manager.addDocument('id', 'diskon gede', 'sentiment.positive');
    manager.addDocument('id', 'makanan sampai utuh', 'sentiment.positive');
  
    manager.addDocument('id', 'tidak enak', 'sentiment.negative');
    manager.addDocument('id', 'gak enak', 'sentiment.negative');
    manager.addDocument('id', 'ga enak', 'sentiment.negative');
    manager.addDocument('id', 'kurang enak', 'sentiment.negative');
    manager.addDocument('id', 'hambar', 'sentiment.negative');
    manager.addDocument('id', 'terlalu asin', 'sentiment.negative');
    manager.addDocument('id', 'terlalu manis', 'sentiment.negative');
    manager.addDocument('id', 'kecewa', 'sentiment.negative');
    manager.addDocument('id', 'mahal', 'sentiment.negative');
    manager.addDocument('id', 'lambat', 'sentiment.negative');
    manager.addDocument('id', 'aneh rasanya', 'sentiment.negative');
    manager.addDocument('id', 'tidak suka', 'sentiment.negative');
    manager.addDocument('id', 'buruk', 'sentiment.negative');
    manager.addDocument('id', 'mengecewakan', 'sentiment.negative');
    manager.addDocument('id', 'gak bisa dimakan', 'sentiment.negative');
    manager.addDocument('id', 'tidak sesuai', 'sentiment.negative');
    manager.addDocument('id', 'pelayanan buruk', 'sentiment.negative');
    manager.addDocument('id', 'kelamaan', 'sentiment.negative');
    manager.addDocument('id', 'lama banget', 'sentiment.negative');
    manager.addDocument('id', 'terlalu lama', 'sentiment.negative');
    manager.addDocument('id', 'pelayanan lama', 'sentiment.negative');
    manager.addDocument('id', 'pengantaran lama', 'sentiment.negative');
    manager.addDocument('id', 'harga kemahalan', 'sentiment.negative');
    manager.addDocument('id', 'mahal banget', 'sentiment.negative');
    manager.addDocument('id', 'terlalu mahal', 'sentiment.negative');
    manager.addDocument('id', 'tidak sebanding', 'sentiment.negative');
    manager.addDocument('id', 'gak worth it', 'sentiment.negative');
    manager.addDocument('id', 'ga worth', 'sentiment.negative');
    manager.addDocument('id', 'porsi sedikit', 'sentiment.negative');
    manager.addDocument('id', 'porsi dikit', 'sentiment.negative');
    manager.addDocument('id', 'porsinya kecil', 'sentiment.negative');
    manager.addDocument('id', 'kurang banyak', 'sentiment.negative');
    manager.addDocument('id', 'kurang puas', 'sentiment.negative');
    manager.addDocument('id', 'pesanan salah', 'sentiment.negative');
    manager.addDocument('id', 'salah pesanan', 'sentiment.negative');
    manager.addDocument('id', 'pesanan tidak lengkap', 'sentiment.negative');
    manager.addDocument('id', 'kurang bumbu', 'sentiment.negative');
    manager.addDocument('id', 'kurang garam', 'sentiment.negative');
    manager.addDocument('id', 'kurang manis', 'sentiment.negative');
    manager.addDocument('id', 'gak ada rasa', 'sentiment.negative');
    manager.addDocument('id', 'ga berasa', 'sentiment.negative');
    manager.addDocument('id', 'makanan dingin', 'sentiment.negative');
    manager.addDocument('id', 'sudah dingin', 'sentiment.negative');
    manager.addDocument('id', 'tidak segar', 'sentiment.negative');
    manager.addDocument('id', 'tidak fresh', 'sentiment.negative');
    manager.addDocument('id', 'basi', 'sentiment.negative');
    manager.addDocument('id', 'makanan basi', 'sentiment.negative');
    manager.addDocument('id', 'rasa aneh', 'sentiment.negative');
    manager.addDocument('id', 'ada rasa aneh', 'sentiment.negative');
    manager.addDocument('id', 'texturenya aneh', 'sentiment.negative');
    manager.addDocument('id', 'keras', 'sentiment.negative');
    manager.addDocument('id', 'alot', 'sentiment.negative');
    manager.addDocument('id', 'terlalu keras', 'sentiment.negative');
    manager.addDocument('id', 'terlalu lembek', 'sentiment.negative');
    manager.addDocument('id', 'gosong', 'sentiment.negative');
    manager.addDocument('id', 'kurang matang', 'sentiment.negative');
    manager.addDocument('id', 'setengah matang', 'sentiment.negative');
    manager.addDocument('id', 'masih mentah', 'sentiment.negative');
    manager.addDocument('id', 'kualitas menurun', 'sentiment.negative');
    manager.addDocument('id', 'tidak higienis', 'sentiment.negative');
    manager.addDocument('id', 'kotor', 'sentiment.negative');
    manager.addDocument('id', 'jorok', 'sentiment.negative');
    manager.addDocument('id', 'ada rambut', 'sentiment.negative');
    manager.addDocument('id', 'ada lalat', 'sentiment.negative');
    manager.addDocument('id', 'ada serangga', 'sentiment.negative');
    manager.addDocument('id', 'pelayan tidak ramah', 'sentiment.negative');
    manager.addDocument('id', 'pelayan jutek', 'sentiment.negative');
    manager.addDocument('id', 'kasir jutek', 'sentiment.negative');
    manager.addDocument('id', 'driver jutek', 'sentiment.negative');
    manager.addDocument('id', 'packing berantakan', 'sentiment.negative');
    manager.addDocument('id', 'kemasan rusak', 'sentiment.negative');
    manager.addDocument('id', 'makanan tumpah', 'sentiment.negative');
    manager.addDocument('id', 'kemasan bocor', 'sentiment.negative');
    manager.addDocument('id', 'bikin sakit perut', 'sentiment.negative');
    manager.addDocument('id', 'bikin mual', 'sentiment.negative');
    manager.addDocument('id', 'gak akan pesan lagi', 'sentiment.negative');
    manager.addDocument('id', 'tidak akan beli lagi', 'sentiment.negative');
    manager.addDocument('id', 'kapok', 'sentiment.negative');
    manager.addDocument('id', 'menyesal', 'sentiment.negative');
    manager.addDocument('id', 'nyesel', 'sentiment.negative');
    manager.addDocument('id', 'gak recommended', 'sentiment.negative');
    manager.addDocument('id', 'tidak direkomendasikan', 'sentiment.negative');
    manager.addDocument('id', 'bintang 1', 'sentiment.negative');
    manager.addDocument('id', 'rating 1', 'sentiment.negative');
    manager.addDocument('id', 'gak sesuai foto', 'sentiment.negative');
    manager.addDocument('id', 'gak sesuai gambar', 'sentiment.negative');
    manager.addDocument('id', 'tidak sesuai ekspektasi', 'sentiment.negative');
    manager.addDocument('id', 'tidak sesuai deskripsi', 'sentiment.negative');
    manager.addDocument('id', 'dicharge lebih', 'sentiment.negative');
    manager.addDocument('id', 'harga naik', 'sentiment.negative');
    manager.addDocument('id', 'ongkir mahal', 'sentiment.negative');
    manager.addDocument('id', 'tidak ada promo', 'sentiment.negative');
  
    manager.addDocument('id', 'biasa saja', 'sentiment.neutral');
    manager.addDocument('id', 'standar', 'sentiment.neutral');
    manager.addDocument('id', 'lumayan', 'sentiment.neutral');
    manager.addDocument('id', 'cukup', 'sentiment.neutral');
    manager.addDocument('id', 'tidak buruk', 'sentiment.neutral');
    manager.addDocument('id', 'tidak istimewa', 'sentiment.neutral');
    manager.addDocument('id', 'b aja', 'sentiment.neutral');
    manager.addDocument('id', 'biasa aja', 'sentiment.neutral');
    manager.addDocument('id', 'pas', 'sentiment.neutral');
    manager.addDocument('id', 'rasanya standar', 'sentiment.neutral');
    manager.addDocument('id', 'ya begitulah', 'sentiment.neutral');
    manager.addDocument('id', 'bisa dimakan', 'sentiment.neutral');
    manager.addDocument('id', 'bisa lah', 'sentiment.neutral');
    manager.addDocument('id', 'makan saja', 'sentiment.neutral');
    manager.addDocument('id', 'harga pas', 'sentiment.neutral');
    manager.addDocument('id', 'harga wajar', 'sentiment.neutral');
    manager.addDocument('id', 'porsi sedang', 'sentiment.neutral');
    manager.addDocument('id', 'rasa biasa', 'sentiment.neutral');
    manager.addDocument('id', 'agak lama', 'sentiment.neutral');
    manager.addDocument('id', 'mending makan di tempat', 'sentiment.neutral');
    manager.addDocument('id', 'gak terlalu enak', 'sentiment.neutral');
    manager.addDocument('id', 'gak terlalu buruk', 'sentiment.neutral');
    manager.addDocument('id', 'masih ok', 'sentiment.neutral');
    manager.addDocument('id', 'masih oke', 'sentiment.neutral');
    manager.addDocument('id', 'so so', 'sentiment.neutral');
    manager.addDocument('id', 'boleh lah', 'sentiment.neutral');
    manager.addDocument('id', 'masih masuk', 'sentiment.neutral');
    manager.addDocument('id', 'tidak spesial', 'sentiment.neutral');
    manager.addDocument('id', 'gak ada yang istimewa', 'sentiment.neutral');
    manager.addDocument('id', 'pelayanan biasa', 'sentiment.neutral');
    manager.addDocument('id', 'kadang enak kadang engga', 'sentiment.neutral');
    manager.addDocument('id', 'tergantung mood', 'sentiment.neutral');
    manager.addDocument('id', 'tergantung selera', 'sentiment.neutral');
    manager.addDocument('id', 'masih mending', 'sentiment.neutral');
    manager.addDocument('id', '3 bintang', 'sentiment.neutral');
    manager.addDocument('id', 'bintang 3', 'sentiment.neutral');
    manager.addDocument('id', 'rata-rata', 'sentiment.neutral');
    manager.addDocument('id', 'cukup memuaskan', 'sentiment.neutral');
    manager.addDocument('id', 'umum', 'sentiment.neutral');
    manager.addDocument('id', 'seperti restoran pada umumnya', 'sentiment.neutral');
    manager.addDocument('id', 'seperti biasa', 'sentiment.neutral');
    
    manager.addDocument('id', 'menu lengkap', 'sentiment.positive');
    manager.addDocument('id', 'banyak pilihan', 'sentiment.positive');
    manager.addDocument('id', 'ada varian baru', 'sentiment.positive');
    manager.addDocument('id', 'promo menarik', 'sentiment.positive');
    manager.addDocument('id', 'diskon besar', 'sentiment.positive');
    manager.addDocument('id', 'cashback gede', 'sentiment.positive');
    manager.addDocument('id', 'bayar mudah', 'sentiment.positive');
    manager.addDocument('id', 'banyak metode pembayaran', 'sentiment.positive');
    manager.addDocument('id', 'pemesanan mudah', 'sentiment.positive');
    manager.addDocument('id', 'aplikasi lancar', 'sentiment.positive');
    manager.addDocument('id', 'orderan cepat diproses', 'sentiment.positive');
    manager.addDocument('id', 'pengiriman tepat', 'sentiment.positive');
    manager.addDocument('id', 'estimasi waktu akurat', 'sentiment.positive');
    manager.addDocument('id', 'driver ramah', 'sentiment.positive');
    manager.addDocument('id', 'kurir cepat', 'sentiment.positive');
    manager.addDocument('id', 'tracking pesanan bagus', 'sentiment.positive');
    manager.addDocument('id', 'notifikasi update', 'sentiment.positive');
    
    manager.addDocument('id', 'menu terbatas', 'sentiment.negative');
    manager.addDocument('id', 'sedikit pilihan', 'sentiment.negative');
    manager.addDocument('id', 'habis terus', 'sentiment.negative');
    manager.addDocument('id', 'selalu kosong', 'sentiment.negative');
    manager.addDocument('id', 'menu favorit selalu habis', 'sentiment.negative');
    manager.addDocument('id', 'promo bohong', 'sentiment.negative');
    manager.addDocument('id', 'diskon palsu', 'sentiment.negative');
    manager.addDocument('id', 'aplikasi error', 'sentiment.negative');
    manager.addDocument('id', 'app lemot', 'sentiment.negative');
    manager.addDocument('id', 'sulit memesan', 'sentiment.negative');
    manager.addDocument('id', 'pembayaran gagal', 'sentiment.negative');
    manager.addDocument('id', 'pesanan dibatalkan', 'sentiment.negative');
    manager.addDocument('id', 'driver tidak bisa dihubungi', 'sentiment.negative');
    manager.addDocument('id', 'kurir hilang', 'sentiment.negative');
    manager.addDocument('id', 'estimasi waktu meleset', 'sentiment.negative');
    manager.addDocument('id', 'tracking tidak akurat', 'sentiment.negative');
    manager.addDocument('id', 'notifikasi spam', 'sentiment.negative');

  await manager.train();
  console.log('Sentiment analyzer for Indonesian language has been trained');
  
  return manager;
}

async function analyzeSentiment(text) {
  if (!manager.isLoaded) {
    await initializeSentimentAnalyzer();
  }
  
  const result = await manager.process('id', text);
  
  let highestConfidence = 0;
  let sentimentLabel = 'neutral';
  
  if (result.classifications && result.classifications.length > 0) {
    result.classifications.forEach(classification => {
      if (classification.confidence > highestConfidence) {
        highestConfidence = classification.confidence;
        
        sentimentLabel = classification.label.split('.')[1];
      }
    });
  }
  
  if (highestConfidence < 0.7) {
    const positiveWords = ['enak', 'lezat', 'mantap', 'nikmat', 'suka', 'bagus', 'recommended', 'puas'];
    const negativeWords = ['tidak enak', 'gak enak', 'ga enak', 'kurang enak', 'aneh', 'hambar', 'kecewa', 'mahal', 'buruk'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    const lowerText = text.toLowerCase();
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });
    
    const negations = ['tidak', 'bukan', 'kurang', 'belum', 'jangan'];
    negations.forEach(negation => {
      positiveWords.forEach(word => {
        if (lowerText.includes(`${negation} ${word}`)) {
          positiveCount--;
          negativeCount++;
        }
      });
    });
    
    if (positiveCount > negativeCount) {
      sentimentLabel = 'positive';
    } else if (negativeCount > positiveCount) {
      sentimentLabel = 'negative';
    }
  }
  
  console.log(`Text: "${text}"`);
  console.log(`Sentiment: ${sentimentLabel}`);
  console.log(`Confidence: ${highestConfidence}`);
  
  return sentimentLabel;
}

module.exports = {
  analyzeSentiment,
  initializeSentimentAnalyzer
};