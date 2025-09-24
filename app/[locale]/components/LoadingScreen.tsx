"use client";
import { RootState } from "@/redux/store";
import { LinearProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const LoadingScreen = () => {
  const loadingScreenOpen = useSelector((state: RootState) => state.loading.loadingScreenOpen);
  return (
    <div
      className={`fixed top-0 left-0 bottom-0 right-0 bg-white flex items-center justify-center transition ${loadingScreenOpen ? "opacity-100 z-50" : "opacity-0 -z-50"}`}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-10">
          Social <span className="text-[#F4AF01]">App</span>
        </h1>
        <LinearProgress
          sx={{
            width: 265,
            height: 10,
            backgroundColor: "F4AF01",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "black",
            },
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
