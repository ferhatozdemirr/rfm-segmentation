import { RFMItem } from "@/types/rfm";
import clsx from "clsx";
import {TEXTS} from '@/utils/textProps'

interface GridCellProps {
  x: number;
  y: number;
  items: RFMItem[];
  selectedIds: string[];
  onClick: () => void;
}

export function GridCell({
  x,
  y,
  items,
  selectedIds,
  onClick,
}: GridCellProps) {

  const ids = items?.map((i) => i?.id);
  const isSelected =
    ids?.length > 0 && ids?.every((id) => selectedIds?.includes(id));

const bgColor = isSelected
  ? "bg-green-400"
  : items?.length === 0
  ? "bg-gray-50"
  : items?.length <= 2
  ? "bg-blue-100"
  : items?.length <= 5
  ? "bg-blue-200"
  : items?.length <= 10
  ? "bg-blue-300"
  : "bg-blue-400";

  return (
    <div
      onClick={items?.length > 0 ? onClick : undefined}
      className={clsx(
        "relative border rounded-md p-3 min-h-[90px] flex items-center justify-center cursor-pointer transition",
        bgColor
      )}
    >
      <span className="absolute top-1 left-1 text-[10px] text-gray-600">
        {`${TEXTS.fsScoreText}${x} ${TEXTS.msScoreText}${y}`} 
      </span>

      {items?.length > 0 && (
        <span className="text-lg font-semibold">
          {items?.length}
        </span>
      )}
    </div>
  );
}
