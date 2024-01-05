"use client";
import Image from "next/image";
import React, { ReactNode } from "react";

export function AuthHeader({
  subtitle,
  showLogoText = true,
}: {
  subtitle?: ReactNode;
  showLogoText?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center p-2">
      <div className="avatar">
        <div className="w-24 rounded">
          <Image layout="fill" src="/logo.svg" alt="logo" />
        </div>
      </div>

      {showLogoText && <h6 className="font-bold">Proompter.ai</h6>}
      <div>{subtitle}</div>
    </div>
  );
}
