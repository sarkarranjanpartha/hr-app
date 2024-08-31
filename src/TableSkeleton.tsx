import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function TableSkeleton() {
  return (
    <Stack spacing={1}>
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" height={60} />
    </Stack>
  );
}
