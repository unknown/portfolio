import { motion, MotionProps } from "framer-motion";
import React from "react";

type TimelineItemElement = React.ElementRef<"div">;
type TimelineItemProps = React.ComponentPropsWithoutRef<"div"> & {
  data: {
    date: string;
    title: string;
    text: string;
  };
  tags: Array<{
    title: string;
    value: string;
    color: string;
  }>;
  drawLine?: boolean;
};

const TimelineItem = React.forwardRef<TimelineItemElement, TimelineItemProps>(
  ({ data, tags, drawLine = false, ...restProps }, forwardedRef) => {
    return (
      <div className="relative pb-8" {...restProps} ref={forwardedRef}>
        <p className="absolute -left-8 hidden -translate-x-full text-gray-400 lg:block">
          {data.date}
        </p>
        {drawLine && (
          <div className="absolute h-full w-px -translate-x-1/2 bg-gray-300" />
        )}
        <div className="absolute h-4 w-4 translate-y-1 -translate-x-1/2 rounded-full border-2 border-gray-300 bg-white ring-8 ring-white" />
        <div className="pl-8">
          <p className="mb-2 text-gray-400 lg:hidden">{data.date}</p>
          <div className="flex flex-row gap-3">
            {tags.map((item) => {
              return (
                <div
                  className="mb-3 rounded-lg px-3 py-1"
                  style={{ background: item.color }}
                  key={item.value}
                >
                  <p className="opacity-70">{item.title}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">{data.title}</h2>
            {data.text.split("\n").map((str, i) => (
              <p key={i}>{str}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

TimelineItem.displayName = "TimelineItem";

const MotionTimelineItem = motion(TimelineItem);

export default MotionTimelineItem;
