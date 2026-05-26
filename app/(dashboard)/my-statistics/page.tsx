import React from "react";
import Header from "./features/Header";
import Toolbar from "./features/Toolbar";
import SummaryCards from "./features/SummaryCards";
import WeeklyCalender from "./features/WeeklyCalender";
import Charts from "./features/Charts";
const page = () => {
  return (
    <section>
      <Header />
      <Toolbar />
      <SummaryCards />
      <div className="my-10">
        <WeeklyCalender />
      </div>
      <Charts />
    </section>
  );
};

export default page;
