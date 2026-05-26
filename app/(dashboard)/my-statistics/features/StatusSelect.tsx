"use client";

import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setFilters } from "@/store/slices/calenderSlice"; // تأكد من مسار الـ slice الصحيح لديك

interface StatusOption {
  value: string | null;
  label: string;
}

const StatusSelect = () => {
  const dispatch = useDispatch();

  const currentStatus = useSelector(
    (state: RootState) => state.calendar.filters.status,
  );

  const statusOptions: StatusOption[] = [
    { value: null, label: "All Statuses" },
    { value: "TO_DO", label: "TO DO" },
    { value: "IN_PROGRESS", label: "IN PROGRESS" },
    { value: "BLOCKED", label: "BLOCKED" },
    { value: "IN_REVIEW", label: "IN REVIEW" },
    { value: "READY_FOR_QA", label: "READY FOR QA" },
    { value: "REOPENED", label: "REOPENED" },
    { value: "READY_FOR_PRODUCTION", label: "READY FOR PRODUCTION" },
    { value: "DONE", label: "DONE" },
  ];
  const selectedValue =
    statusOptions.find((option) => option.value === currentStatus) ||
    statusOptions[0];

  return (
    <div className="w-52">
      <Select<StatusOption>
        instanceId="status-select-field"
        className="w-full"
        options={statusOptions}
        value={selectedValue}
        onChange={(selectedOption) => {
          dispatch(
            setFilters({
              status: selectedOption ? selectedOption.value : null,
            }),
          );
        }}
      />
    </div>
  );
};

export default StatusSelect;
