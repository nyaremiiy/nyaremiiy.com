/**
 * Mentoring plans: numbers for structured data / llms.txt.
 * Display text (incl. the formatted price) lives in i18n `mentoring.plans`, same order.
 */
export const mentoringPlans = [
  { id: "group", price: 200, currency: "UAH", durationMinutes: 90, icon: "users" },
  { id: "individual", price: 300, currency: "UAH", durationMinutes: null, icon: "user" },
] as const;
