// services/web/src/lib/utils/validators.ts

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// ============================================
// PHONE NUMBER VALIDATORS
// ============================================

export const validatePhone = (phone: string): ValidationResult => {
  const cleaned = phone.replace(/\D/g, "");

  if (!cleaned) {
    return { isValid: false, error: "Phone number is required" };
  }

  // Indian phone number: starts with 6-9, 10 digits
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(cleaned)) {
    return {
      isValid: false,
      error: "Please enter a valid 10-digit phone number",
    };
  }

  return { isValid: true };
};

// ============================================
// EMAIL VALIDATORS
// ============================================

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true };
};

// ============================================
// OTP VALIDATORS
// ============================================

export const validateOTP = (otp: string): ValidationResult => {
  if (!otp) {
    return { isValid: false, error: "OTP is required" };
  }

  const cleaned = otp.replace(/\D/g, "");

  if (cleaned.length !== 6) {
    return { isValid: false, error: "OTP must be 6 digits" };
  }

  return { isValid: true };
};

// ============================================
// NAME VALIDATORS
// ============================================

export const validateName = (name: string): ValidationResult => {
  if (!name || !name.trim()) {
    return { isValid: false, error: "Name is required" };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters" };
  }

  if (name.trim().length > 100) {
    return { isValid: false, error: "Name must be less than 100 characters" };
  }

  return { isValid: true };
};

// ============================================
// ADDRESS VALIDATORS
// ============================================

export const validateAddress = (address: string): ValidationResult => {
  if (!address || !address.trim()) {
    return { isValid: false, error: "Address is required" };
  }

  if (address.trim().length < 10) {
    return { isValid: false, error: "Please enter a complete address" };
  }

  return { isValid: true };
};

export const validatePincode = (pincode: string): ValidationResult => {
  if (!pincode) {
    return { isValid: false, error: "Pincode is required" };
  }

  const pincodeRegex = /^[1-9][0-9]{5}$/;

  if (!pincodeRegex.test(pincode)) {
    return { isValid: false, error: "Please enter a valid 6-digit pincode" };
  }

  return { isValid: true };
};

// ============================================
// PRICE VALIDATORS
// ============================================

export const validatePrice = (price: number | string): ValidationResult => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numPrice)) {
    return { isValid: false, error: "Please enter a valid price" };
  }

  if (numPrice < 0) {
    return { isValid: false, error: "Price cannot be negative" };
  }

  if (numPrice === 0) {
    return { isValid: false, error: "Price must be greater than zero" };
  }

  return { isValid: true };
};

// ============================================
// QUANTITY VALIDATORS
// ============================================

export const validateQuantity = (
  quantity: number | string
): ValidationResult => {
  const numQuantity =
    typeof quantity === "string" ? parseInt(quantity) : quantity;

  if (isNaN(numQuantity)) {
    return { isValid: false, error: "Please enter a valid quantity" };
  }

  if (numQuantity < 1) {
    return { isValid: false, error: "Quantity must be at least 1" };
  }

  if (numQuantity > 100) {
    return { isValid: false, error: "Quantity cannot exceed 100" };
  }

  return { isValid: true };
};

// ============================================
// RATING VALIDATORS
// ============================================

export const validateRating = (rating: number): ValidationResult => {
  if (rating < 1 || rating > 5) {
    return { isValid: false, error: "Rating must be between 1 and 5" };
  }

  return { isValid: true };
};

// ============================================
// COUPON CODE VALIDATORS
// ============================================

export const validateCouponCode = (code: string): ValidationResult => {
  if (!code || !code.trim()) {
    return { isValid: false, error: "Coupon code is required" };
  }

  const cleanCode = code.trim().toUpperCase();

  if (cleanCode.length < 3) {
    return { isValid: false, error: "Coupon code is too short" };
  }

  if (cleanCode.length > 20) {
    return { isValid: false, error: "Coupon code is too long" };
  }

  // Only alphanumeric characters
  if (!/^[A-Z0-9]+$/.test(cleanCode)) {
    return {
      isValid: false,
      error: "Coupon code can only contain letters and numbers",
    };
  }

  return { isValid: true };
};

// ============================================
// FILE VALIDATORS
// ============================================

export const validateImageFile = (file: File): ValidationResult => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Please upload a valid image file (JPEG, PNG, or WebP)",
    };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: "Image size must be less than 5MB" };
  }

  return { isValid: true };
};

// ============================================
// GST NUMBER VALIDATORS
// ============================================

export const validateGSTNumber = (gst: string): ValidationResult => {
  if (!gst) {
    return { isValid: false, error: "GST number is required" };
  }

  // GST format: 15 characters (alphanumeric)
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  if (!gstRegex.test(gst.toUpperCase())) {
    return { isValid: false, error: "Please enter a valid GST number" };
  }

  return { isValid: true };
};

// ============================================
// VEHICLE NUMBER VALIDATORS
// ============================================

export const validateVehicleNumber = (vehicleNo: string): ValidationResult => {
  if (!vehicleNo) {
    return { isValid: false, error: "Vehicle number is required" };
  }

  // Indian vehicle number format: XX00XX0000 or XX-00-XX-0000
  const cleaned = vehicleNo.replace(/[-\s]/g, "").toUpperCase();
  const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;

  if (!vehicleRegex.test(cleaned)) {
    return { isValid: false, error: "Please enter a valid vehicle number" };
  }

  return { isValid: true };
};

// ============================================
// AADHAR NUMBER VALIDATORS
// ============================================

export const validateAadharNumber = (aadhar: string): ValidationResult => {
  if (!aadhar) {
    return { isValid: false, error: "Aadhar number is required" };
  }

  const cleaned = aadhar.replace(/\D/g, "");

  if (cleaned.length !== 12) {
    return { isValid: false, error: "Aadhar number must be 12 digits" };
  }

  return { isValid: true };
};

// ============================================
// PAN NUMBER VALIDATORS
// ============================================

export const validatePANNumber = (pan: string): ValidationResult => {
  if (!pan) {
    return { isValid: false, error: "PAN number is required" };
  }

  // PAN format: AAAAA0000A
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(pan.toUpperCase())) {
    return { isValid: false, error: "Please enter a valid PAN number" };
  }

  return { isValid: true };
};

// ============================================
// FORM VALIDATORS
// ============================================

export const validateForm = (
  fields: Record<string, any>,
  validators: Record<string, (value: any) => ValidationResult>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  Object.keys(validators).forEach((field) => {
    const result = validators[field](fields[field]);
    if (!result.isValid) {
      errors[field] = result.error || "Invalid value";
      isValid = false;
    }
  });

  return { isValid, errors };
};
