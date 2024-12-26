import Cookies from 'js-cookie';

// Define cookie options type
interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Set a cookie
 * @param name - Cookie name
 * @param value - Cookie value
 * @param options - Cookie options (optional)
 */
export const setCookie = (
  name: string,
  value: string,
  options?: CookieOptions
): void => {
  Cookies.set(name, value, {
    ...options,
    // You might want to set some default options here
    secure: process.env.NODE_ENV === 'production', // Secure in production
    sameSite: 'lax', // Default sameSite policy
  });
};

/**
 * Get a cookie value
 * @param name - Cookie name
 * @returns Cookie value or undefined if not found
 */
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

/**
 * Remove a cookie
 * @param name - Cookie name
 * @param options - Cookie options (optional)
 */
export const removeCookie = (name: string, options?: CookieOptions): void => {
  Cookies.remove(name, {
    ...options,
    // You might want to set some default options here
    path: '/', // Default path
  });
};

/**
 * Check if a cookie exists
 * @param name - Cookie name
 * @returns boolean
 */
export const hasCookie = (name: string): boolean => {
  return !!getCookie(name);
};

/**
 * Get all cookies as an object
 * @returns Object with all cookies
 */
export const getAllCookies = (): { [key: string]: string } => {
  return Cookies.get();
};
