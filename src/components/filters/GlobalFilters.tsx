import { TextField, Stack } from "@mui/material";
import { useFilters } from "../../context/FilterContext";

export default function GlobalFilters() {
  const { filters, setFilters } = useFilters();

  return (
    <Stack direction="row" spacing={2} mb={3}>
      <TextField
        type="date"
        label="Start Date"
        value={filters.startDate}
        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
      />
      <TextField
        type="date"
        label="End Date"
        value={filters.endDate}
        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
      />
    </Stack>
  );
}
