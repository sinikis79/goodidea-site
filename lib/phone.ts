export const DEFAULT_PHONE_NUMBER = "031-8039-7701";
export const DEFAULT_PHONE_HREF = `tel:${DEFAULT_PHONE_NUMBER}`;

export function toPhoneHref(phone: string | null | undefined) {
  const trimmed = phone?.trim();

  if (!trimmed) {
    return DEFAULT_PHONE_HREF;
  }

  return trimmed.startsWith("tel:") ? trimmed : `tel:${trimmed}`;
}
