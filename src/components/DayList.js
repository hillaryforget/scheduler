import React from "react";
import DayListItem from "./DayListItem";
import "components/DayListItem.scss";

export default function DayList(props) {
  const days = props.days.map((day) => {
    console.log(day.name, props.day);
    return (
      <DayListItem
        key={day.id}
        id={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={() => {props.setDay(day.name);
        }}
      />
    );
  });

  return <ul>{days}</ul>;
};
