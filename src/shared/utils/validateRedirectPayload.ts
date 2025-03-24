import { Redirect } from "../../domain/entities/user.entity";
import { RedirectPayloadIsNotValid } from "../../exceptions/redirect-payload-not-valid";

export function validateRedirectPayload(payload: Redirect): void {
  if (!payload.links || !Array.isArray(payload.links)) {
    throw new RedirectPayloadIsNotValid('Links must be an array');
  }

  if (payload.links.length === 1) {
    const link = payload.links[0];
    if (typeof link.to !== 'string') {
      throw new RedirectPayloadIsNotValid('Link "to" must be a string');
    }
    if (link.percent !== undefined) {
      throw new RedirectPayloadIsNotValid('Link "percent" must not exist for a single link');
    }
    validateUrl(link.to);
    return;
  }

  let totalPercent = 0;
  const urls = new Set<string>();

  for (const link of payload.links) {
    if (typeof link.to !== 'string') {
      throw new RedirectPayloadIsNotValid('Link "to" must be a string');
    }
    validateUrl(link.to);
    if (typeof link.percent !== 'number') {
      throw new RedirectPayloadIsNotValid('Link "percent" must be a number');
    }
    if (urls.has(link.to)) {
      throw new RedirectPayloadIsNotValid('Duplicate links are not allowed');
    }
    urls.add(link.to);
    totalPercent += link.percent;
  }

  if (totalPercent !== 100) {
    throw new RedirectPayloadIsNotValid('Total percent must equal 100');
  }
}

function validateUrl(url: string): void {
  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.hostname.includes('.')) {
      throw new RedirectPayloadIsNotValid(`Invalid URL: ${url}`);
    }
  } catch (_) {
    throw new RedirectPayloadIsNotValid(`Invalid URL: ${url}`);
  }
}