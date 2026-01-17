import { normalizeToScore } from "./rfmUtils";
import { RFMItem } from "@/types/rfm";

type RawRFMItem = Omit<RFMItem, "frequencyScore" | "monetaryScore">;

export function withRfmScore(data: RawRFMItem[]): RFMItem[] {
  const { minFreq, maxFreq, minMon, maxMon } = data.reduce(
    (acc, item) => {
      acc.minFreq = Math.min(acc.minFreq, item.frequency);
      acc.maxFreq = Math.max(acc.maxFreq, item.frequency);
      acc.minMon = Math.min(acc.minMon, item.monetary);
      acc.maxMon = Math.max(acc.maxMon, item.monetary);
      return acc;
    },
    {
      minFreq: Infinity,
      maxFreq: -Infinity,
      minMon: Infinity,
      maxMon: -Infinity,
    }
  );

  return data.map((item) => ({
    ...item,
    frequencyScore: normalizeToScore(item.frequency, minFreq, maxFreq),
    monetaryScore: normalizeToScore(item.monetary, minMon, maxMon),
  }));
}

