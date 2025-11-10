// 📦 src/utils/freshnessScore.js

/**
 * 🔹 Simulates realistic temperature (28–38°C)
 */
export async function getSimulatedTemperature() {
  const temperature = 28 + Math.floor(Math.random() * 10);
  console.log(`🌡️ Simulated Temperature: ${temperature}°C`);
  return temperature;
}

/**
 * 🔹 Calculates AI-based freshness score (0–100)
 */
export function calculateFreshnessScore(prepTime, deliveryTime, temperature) {
  let freshness = 100;

  freshness -= prepTime * 0.5;
  freshness -= deliveryTime * 0.8;

  if (temperature > 30 && temperature <= 35) freshness -= 5;
  else if (temperature > 35) freshness -= 10;

  freshness = Math.max(0, Math.min(100, Math.round(freshness)));

  return freshness;
}

/**
 * 🔹 Combines temperature + freshness formula
 */
export async function getPredictedFreshness(prepTime, deliveryTime) {
  const temperature = await getSimulatedTemperature();
  const freshnessScore = calculateFreshnessScore(prepTime, deliveryTime, temperature);

  return { prepTime, deliveryTime, temperature, freshnessScore };
}
