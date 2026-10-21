export const EMAIL = 'vadegor00@gmail.com';

// callers use the wobble action, which already plays the click sound
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
