/* eslint-disable @typescript-eslint/naming-convention */
import { format } from "date-fns-tz";
import type { VFC } from "react";
import { AcademicCapIcon, ScheduleIcon } from "src/components/icon";
import { BroadcastStatus } from "src/components/styled";
import { statusCheck } from "src/functions/statusCheck";
import type { Broadcast } from "src/types";
import { styled } from "src/utils";

export const BroadcastItem: VFC<Broadcast> = (props) => {
  const result = statusCheck(props.status);
  const date = format(new Date(props.scheduledStartTime), "yyyy年MM月dd日", { timeZone: "Asia/Tokyo" });

  return (
    <Root>
      <Upper>
        <BroadCastTitle>{props.title}</BroadCastTitle>
        <BroadcastStatus color={result.color}>{result.label}</BroadcastStatus>
      </Upper>

      <Lower>
        <ScheduleIcon />
        <BroadcastDate>{date}</BroadcastDate>
        <FlexGrow />
        <AcademicCapIcon />
        <CountLabel>エンジビア数</CountLabel>
        <span>{props._count.Trivia}</span>
      </Lower>
    </Root>
  );
};

const Root = styled("li", {
  width: 700,
  paddingX: "1.5rem",
  paddingY: "1rem",

  backgroundColor: "$slate2",
  borderBottom: "1px solid $slate6",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$slate4",
  },
  "&:first-child": {
    borderTopRadius: 5,
  },
  "&:last-child": {
    borderBottom: "none",
    borderBottomRadius: 5,
  },
});

const Upper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  paddingBottom: "0.5rem",
});

const BroadCastTitle = styled("div", {
  fontSize: "1rem",
  color: "$blue9",
});

const Lower = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",

  fontSize: "0.9rem",
  color: "$slate11",
});

const FlexGrow = styled("div", {
  flexGrow: 1,
});

const BroadcastDate = styled("span", {
  paddingLeft: "0.5rem",
});

const CountLabel = styled("span", {
  paddingLeft: "0.5rem",
  paddingRight: "0.25rem",

  color: "$slate11",
});
