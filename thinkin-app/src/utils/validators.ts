/**
 * Input validation utilities
 */

export const isValidDisplayName = (name: string): boolean => {
  return name.length >= 3 && name.length <= 30;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidThought = (content: string): boolean => {
  return content.length > 0 && content.length <= 280;
};

export const isValidResponse = (response: string): boolean => {
  return response.length > 10 && response.length <= 1000;
};
