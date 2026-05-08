export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzVIp9HoUqL_Z1s3_J70BVqB4ieAQI81gFR_ql3UArRH5IrvEbLUlaVpBGZSgAB3kPc/exec";

export const sanitizePhoneInput = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");

  if (!digitsOnly) {
    return "";
  }

  return digitsOnly.startsWith("380") ? digitsOnly : `380${digitsOnly}`;
};

export const createSubmissionTimestamp = () =>
  new Date().toLocaleString("uk-UA");

export const submitGoogleScriptForm = async (payload: Record<string, unknown>) => {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  if (!response.ok && !response.redirected) {
    throw new Error(`HTTP ${response.status}`);
  }
};
