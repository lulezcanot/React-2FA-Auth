import React from "react";
import { useNavigate } from "react-router-dom";
import TwoFASetup from "../components/TwoFASetup";

const Verify2FA = () => {
  const navigate = useNavigate();

  const handleVerification = async () => {
    if (data) {
      navigate("/");
    }
  };

  const handle2FAReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };
  
  return (
    <TwoFASetup
      onVerifySuccess={handleVerification}
      onResetSuccess={handle2FAReset}
    />
  );
};

export default Verify2FA;
