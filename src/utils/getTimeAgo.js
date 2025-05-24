// utils/timeUtils.js (hoặc có thể đặt trong cùng file component nếu nhỏ)
export function getTimeAgo(isoString) {
  const now = new Date();
  const past = new Date(isoString);
  const diffMs = now - past;

  if (diffMs < 0) return "Trong tương lai";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return `${seconds} giây trước`;
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;
  if (weeks < 5) return `${weeks} tuần trước`;
  return `${months} tháng trước`;
}