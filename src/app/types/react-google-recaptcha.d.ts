declare module "react-google-recaptcha" {
    import React from "react";
  
    interface ReCAPTCHAProps {
      sitekey: string;
      onChange?: (token: string | null) => void;
      onExpired?: () => void;
      onErrored?: () => void;
      size?: "invisible" | "normal" | "compact";
      theme?: "light" | "dark";
      tabindex?: number;
      badge?: "bottomright" | "bottomleft" | "inline";
      hl?: string;
    }
  
    const ReCAPTCHA: React.FC<ReCAPTCHAProps>;
  
    export default ReCAPTCHA;
  }
  