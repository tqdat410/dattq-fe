import React from "react";
import { Box, Typography, Button } from "@mui/material";

const TopBar: React.FC = () => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: 5,
      py: 2.5,
      borderRadius: "2rem",
    }}
  >
    <Typography
      variant="h1"
      sx={{
        fontSize: "5rem", // Tùy chỉnh kích thước chữ
        fontWeight: "bold",
        background: "linear-gradient(to top right, #86efac, #16a34a)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        userSelect: "none",
      }}
    >
      DaPortfolio
    </Typography>
    <Button
      variant="contained"
      color="primary"
      sx={{
        textTransform: "none",
        fontSize: "1.125rem",
        fontWeight: 600,
        borderRadius: "9999px",
        boxShadow: 3,
        px: 3,
        py: 1,
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "#60a5fa",
        },
      }}
    >
      Subscribe me &gt;
    </Button>
  </Box>
);

export default TopBar;
