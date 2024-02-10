"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";

const ToolButton = ({ label, icon: Icon, onClick, isActive, isDisabled }) => {
  return (
    <Hint label={label} side='right' sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size='icon'
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolButton;
