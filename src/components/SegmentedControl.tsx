import React from "react";

type SegmentedControlElement = React.ElementRef<"div">;
type SegmentedControlProps = React.ComponentPropsWithoutRef<"div"> & {
  options: Array<{ title: string; value: string }>;
  defaultIndex: number;
  callback: (value: string) => void;
};

const SegmentedControl = React.forwardRef<
  SegmentedControlElement,
  SegmentedControlProps
>(({ options, defaultIndex, callback }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState(defaultIndex);
  const [segmentBoundingBox, setSegmentBoundingBox] = React.useState<
    DOMRect | undefined
  >();
  const [wrapperBoundingBox, setWrapperBoundingBox] = React.useState<
    DOMRect | undefined
  >();

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const highlightRef = React.useRef<HTMLDivElement>(null);
  const segmentRefs = React.useMemo(
    () => options.map(() => React.createRef<HTMLDivElement>()),
    [options]
  );

  React.useEffect(() => {
    setSegmentBoundingBox(
      segmentRefs[activeIndex].current?.getBoundingClientRect()
    );
    setWrapperBoundingBox(wrapperRef.current?.getBoundingClientRect());
  }, [activeIndex]);

  const onChange = (value: string, index: number) => {
    setActiveIndex(index);
    callback(value);
  };

  const highlightStyles: React.CSSProperties = {};

  if (segmentBoundingBox && wrapperBoundingBox) {
    highlightStyles.width = `${segmentBoundingBox.width}px`;
    highlightStyles.left = `${
      segmentBoundingBox.left - wrapperBoundingBox.left
    }px`;
  }

  return (
    <div className="rounded-full bg-gray-100 p-1" ref={ref}>
      <div className="relative flex flex-row" ref={wrapperRef}>
        <div
          className="absolute top-0 left-0 z-0 h-10 rounded-full bg-white shadow-md transition-all"
          style={highlightStyles}
          ref={highlightRef}
        />
        {options.map((item, i) => (
          <div
            className="z-10 px-4 py-2"
            onClick={(e) => {
              onChange(item.value, i);
            }}
            key={item.value}
            ref={segmentRefs[i]}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
});

export default SegmentedControl;