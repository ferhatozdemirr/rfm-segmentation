export function normalizeToScore(
  value: number,
  min: number,   
  max: number    
): 1 | 2 | 3 | 4 | 5 {

  // Değerin min–max aralığındaki yüzdelik konumunu hesaplıyoruz.
  const percentile = ((value - min) / (max - min));
  console.log(percentile)
  // Yüzdelik dilime göre 1–5 arası score atıyoruz.
switch (true) {
  case percentile <= 0.2:
    return 1;
  case percentile <= 0.4:
    return 2;
  case percentile <= 0.6:
    return 3;
  case percentile <= 0.8:
    return 4;
  default:
    return 5;
}
}