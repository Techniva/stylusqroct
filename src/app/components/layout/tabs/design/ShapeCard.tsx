import React from "react";

interface ShapeCardProps<T extends string> {
  title: string;
  items: { value: T; svg: React.ReactNode }[];
  selected: T;
  onChange: (value: T) => void;
}

function ShapeCard<T extends string>({
  title,
  items,
  selected,
  onChange,
}: ShapeCardProps<T>) {
  return (
    <fieldset className="border border-gray-200 rounded-xl p-2 bg-white relative">
      <legend className="px-2 text-sm font-medium text-gray-700" style={{ marginLeft: 12 }}>
        {title}
      </legend>
      <div className="overflow-x-auto w-full pb-1">
        <div className="flex gap-2 min-w-max">
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => onChange(item.value)}
              className={`p-1 rounded-lg border-2 transition-colors bg-white ${
                selected === item.value
                  ? "border-[#063970] bg-[#063970]/10"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                {item.svg}
              </div>
            </button>
          ))}
        </div>
      </div>
    </fieldset>
  );
}

export default ShapeCard; 