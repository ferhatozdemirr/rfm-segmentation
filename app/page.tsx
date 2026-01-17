"use client";

import { useMemo, useState } from "react";
import { RFMGrid } from "@/components/Grid/rfmGrid";
import { mockRFMData } from "@/data/mockData";
import { withRfmScore } from "@/utils/withRfmScore";
import { RFMItem } from "@/types/rfm";
import { TEXTS } from "@/utils/textProps";
import { FilterSlider } from "@/components/Filter/filters";

export default function HomePage() {

  const dataWithScore: RFMItem[] = useMemo(
    () => withRfmScore(mockRFMData),
    []
  );

  const [filters, setFilters] = useState({
    recency: 365,
    frequency: 0,
    monetary: 0,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const filteredItems = useMemo(() => {
    return dataWithScore?.filter((item) => {
      if(item?.frequency && item?.monetary && item?.recency > 0)
      return (
        item?.recency <= filters?.recency &&
        item?.frequency >= filters?.frequency &&
        item?.monetary >= filters?.monetary
      );
    });
  }, [dataWithScore, filters]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function handleToggleSelect(ids: string[]) {
    setSelectedIds((prev) => {
      const set = new Set(prev);

      ids?.forEach((id) => {
        set?.has(id) ? set?.delete(id) : set?.add(id);
      });

      return Array.from(set);
    });
  }

async function handleSubmit() {
  if (selectedIds?.length === 0) return;

  setIsSubmitting(true);
  setSuccess(false);

  try {
    await fetch("/api/selected-ids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedIds }),
    });

    setSuccess(true);
  } catch (err) {
    console.error(err);
  }

  setIsSubmitting(false);
}

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{TEXTS.mainTitle}</h1>

      <div className="grid grid-cols-3 gap-6">
        <FilterSlider
          label={TEXTS.recencyLabelText}
          value={filters?.recency}
          max={365}
          onChange={(v) => setFilters({ ...filters, recency: v })}
        />
        <FilterSlider
          label={TEXTS.frequencyLabelText}
          value={filters?.frequency}
          max={50}
          onChange={(v) => setFilters({ ...filters, frequency: v })}
        />
        <FilterSlider
          label={TEXTS.monetaryLabelText}
          value={filters?.monetary}
          max={10000}
          step={100}
          onChange={(v) => setFilters({ ...filters, monetary: v })}
        />
      </div>

      <RFMGrid
        items={filteredItems}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
      />

      <div className="flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || selectedIds?.length === 0}
          className="px-4 py-2 rounded-md bg-black text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? TEXTS.isLoadingText
            : `${TEXTS.pushToSelectedText} (${selectedIds?.length})`}
        </button>

        {success && (
          <span className="text-green-600 text-sm">
            {TEXTS.succesText}
          </span>
        )}
      </div>
    </main>
  );
}


