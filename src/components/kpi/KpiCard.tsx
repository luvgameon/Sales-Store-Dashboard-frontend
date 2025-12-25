import { Card, CardContent, Typography } from "@mui/material";

export default function KpiCard({ title, value }: any) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
}
