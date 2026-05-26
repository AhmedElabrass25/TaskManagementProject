import { getTaskCalender } from "@/app/(dashboard)/my-statistics/action";
// import { FilterState } from "@/app/(dashboard)/my-statistics/features/Toolbar";
import { ITaskCalendarStatsResponse } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { format, addDays } from "date-fns";
export interface FilterState {
  projectId: string | null;
  status: string | null;
}
interface CalendarState {
  data: ITaskCalendarStatsResponse | null;
  loading: boolean;
  error: string | null;
  filters: FilterState;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}
const initialState: CalendarState = {
  data: null,
  loading: false,
  error: null,
  filters: {
    projectId: null,
    status: null,
  },
  dateRange: {
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 6), "yyyy-MM-dd"),
  },
};

export const fetchCalendarStats = createAsyncThunk(
  "calendar/fetchStats",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { calendar } = getState() as { calendar: CalendarState };

      const response = await getTaskCalender({
        p_start_date: calendar.dateRange.startDate,
        p_end_date: calendar.dateRange.endDate,
        p_project_id: calendar.filters.projectId,
        p_status: calendar.filters.status,
      });

      return response as ITaskCalendarStatsResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch statistics");
    }
  },
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setDateRange: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>,
    ) => {
      state.dateRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendarStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCalendarStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, setDateRange } = calendarSlice.actions;
export default calendarSlice.reducer;
