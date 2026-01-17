import { RFMItem } from "@/types/rfm";
import { GridCell } from "./gridCell"

interface RFMGridProps {
  items: RFMItem[];
  selectedIds: string[];
  onToggleSelect: (ids: string[]) => void;
}

export function RFMGrid({
  items,
  selectedIds,
  onToggleSelect,
}: RFMGridProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {[5, 4, 3, 2, 1].map((y) => 
        [1, 2, 3, 4, 5].map((x) => {
          const cellItems = items?.filter(
            (item) => 
              item?.frequencyScore === x &&
              item?.monetaryScore === y
          );

          return (
            <GridCell
              key={`${x}-${y}`}
              x={x}
              y={y}
              items={cellItems}
              selectedIds={selectedIds}
              onClick={() =>
                onToggleSelect(cellItems?.map((i) => i?.id))
              }
            />
          );
        })
      )}
    </div>

  );
}
