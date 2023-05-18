import { Box, Grid } from "@mui/material";

export default function CenterLayout({ children }: any) {
  return (
    <>
      <main>
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            sm={10}
            md={5}
            sx={{
              minHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            {children}
          </Grid>
        </Grid>
      </main>
    </>
  );
}
