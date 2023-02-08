import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const days = props.days.map((day) => {

    return (
      <DayListItem
        key ={day.id}
        id ={day.id}
        name ={day.name}
        spots ={day.spots}
        selected ={day.name === props.value}
        setDay ={() => {
          props.setDay(day.name);
        }}
      />
    );
  });

  return (
    <ul>
      {days}
    </ul>
  );
};