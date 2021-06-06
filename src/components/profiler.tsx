import React, { ProfilerOnRenderCallback, ProfilerProps } from "react";

type Props = {
  metadata?: any;
  phases?: ("mount" | "update")[];
} & Omit<ProfilerProps, "onRender">;

let queue: unknown[] = [];

const sendProfileQueue = () => {
  if (!queue.length) return;
  const queueToSend = [...queue];
  queue = [];
  console.log(queueToSend);
};

setInterval(sendProfileQueue, 5000);

export const Profiler = ({ metadata, phases, ...props }: Props) => {
  const reportProfiler: ProfilerOnRenderCallback = (
    id,
    phases,
    actualDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    if (!phases || phases.includes(phases)) {
      queue.push({
        id,
        phases,
        actualDuration,
        startTime,
        commitTime,
        interactions,
        metadata,
      });
    }
  };

  return <React.Profiler onRender={reportProfiler} {...props} />;
};
