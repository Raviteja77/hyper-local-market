// services/web/src/lib/utils/formatters.ts

// ============================================
// CURRENCY FORMATTERS
// ============================================

export const formatCurrency = (
  amount: number,
  currency: string = "₹"
): string => {
  return `${currency}${amount.toFixed(2)}`;
};

export const formatPrice = (price: number): string => {
  return formatCurrency(price);
};

export const formatDiscount = (discount: number): string => {
  return `${discount}% OFF`;
};

// ============================================
// DATE & TIME FORMATTERS
// ============================================

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  return formatDate(date);
};

// ============================================
// PHONE NUMBER FORMATTERS
// ============================================

export const formatPhone = (phone: string): string => {
  // Format: +91 98765 43210
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }

  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }

  return phone;
};

export const formatPhoneForDisplay = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length >= 10) {
    const last10 = cleaned.slice(-10);
    return `${last10.slice(0, 5)} ${last10.slice(5)}`;
  }

  return phone;
};

// ============================================
// DISTANCE FORMATTERS
// ============================================

export const formatDistance = (distanceInKm: number): string => {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m`;
  }
  return `${distanceInKm.toFixed(1)} km`;
};

// ============================================
// DELIVERY TIME FORMATTERS
// ============================================

export const formatDeliveryTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;

  if (remainingMins === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  return `${hours} hr ${remainingMins} min`;
};

// ============================================
// ORDER ID FORMATTERS
// ============================================

export const formatOrderId = (orderId: string): string => {
  // Format: ORD-12345 -> #12345
  if (orderId.startsWith("ORD-")) {
    return `#${orderId.slice(4)}`;
  }
  return `#${orderId}`;
};

// ============================================
// ADDRESS FORMATTERS
// ============================================

export const formatAddress = (address: {
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}): string => {
  const parts = [
    address.address,
    address.landmark,
    address.city,
    address.state,
    address.pincode,
  ].filter(Boolean);

  return parts.join(", ");
};

export const formatShortAddress = (
  address: string,
  maxLength: number = 50
): string => {
  if (address.length <= maxLength) {
    return address;
  }
  return `${address.slice(0, maxLength)}...`;
};

// ============================================
// NUMBER FORMATTERS
// ============================================

export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-IN");
};

export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// ============================================
// TEXT FORMATTERS
// ============================================

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};

export const formatCategoryName = (category: string): string => {
  return toTitleCase(category.replace(/_/g, " "));
};

// ============================================
// QUANTITY FORMATTERS
// ============================================

export const formatQuantity = (quantity: number, unit: string): string => {
  return `${quantity} ${unit}`;
};

// ============================================
// FILE SIZE FORMATTERS
// ============================================

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
