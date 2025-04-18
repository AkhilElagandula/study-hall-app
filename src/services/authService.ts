// File: src/services/authService.ts

import handler from "./handler";
import { ApiResponse, Payload } from "@/types/types";
const api = '/api/auth/';

const EarlyUser = async (
  name: string,
  mobile: string,
  gender: string,
  showLoader?: () => void,
  hideLoader?: () => void
): Promise<ApiResponse> => {
  const req = {
    name: name,
    mobile: mobile,
    gender: gender
  }
  return await handler(
    "POST",
    `${api}/early-user`,
    req,
    '',
    showLoader,
    hideLoader,
  );
};

const SignUp = async (
  payload: Payload,
  showLoader?: () => void,
  hideLoader?: () => void
): Promise<ApiResponse> => {
  return await handler(
    "POST",
    `${api}/register`,
    payload,
    '',
    showLoader,
    hideLoader,
  );
};

const LoginReq = async (
  payload: Payload,
  showLoader?: () => void,
  hideLoader?: () => void
): Promise<ApiResponse> => {
  return await handler(
    "POST",
    `${api}/login`,
    payload,
    '',
    showLoader,
    hideLoader,
  );
};

const SendOtp = async (
  mobile: string,
  purpose: string,
  showLoader?: () => void,
  hideLoader?: () => void
): Promise<ApiResponse> => {
  const req = {
    mobile: mobile,
    channel: 'sms',
    purpose: purpose
  }
  return await handler(
    "POST",
    `${api}/otp/send`,
    req,
    '',
    showLoader,
    hideLoader,
  );
};

const VerifyOtp = async (
  payload: Payload,
  showLoader?: () => void,
  hideLoader?: () => void
): Promise<ApiResponse> => {
  return await handler(
    "POST",
    `${api}/otp/verify`,
    payload,
    '',
    showLoader,
    hideLoader,
  );
};

export { EarlyUser, SignUp, LoginReq, SendOtp, VerifyOtp };