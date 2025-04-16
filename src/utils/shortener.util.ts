import * as crypto from 'crypto';

export function generateHashFromUrl(url: string, length = 6): string {
  const hash = crypto.createHash('sha256').update(url).digest('hex');
  return hash.substring(0, length);
}
