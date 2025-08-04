import React from "react";
import OnBoardingVideo from "./_components/OnBoardingVideo";
import OnboardingImage from "./_components/OnboardingImage";
import OnboardingTitle from "./_components/OnboardingTitle";

export default function OnBoardingPage() {
  return (
    <div className="space-y-5">
      <OnboardingTitle />
      <OnBoardingVideo />
      <OnboardingImage />
    </div>
  );
}
