export async function createStripeCheckoutSession() {
  const response = await fetch("/checkout/api");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
}
