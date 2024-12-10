import WhyeUsClient from "./WhyUsCards";

const data = [
  {
    key: "easy",
    title: "Easy to Use",
    description:
      "Intuitive interface designed for businesses of all sizes, free for now.",
  },
  {
    key: "cost",
    title: "Cost-Effective",
    description:
      "No charges for now, giving you access to essential features at no cost.",
  },
  {
    key: "collaborative",
    title: "Collaborative",
    description:
      "Team-friendly features for seamless workflow management, available for free.",
  },
  {
    key: "secure",
    title: "Secure",
    description:
      "Bank-level security to protect your sensitive financial data, with no cost during the free period.",
  },
  {
    key: "reports",
    title: "Insightful Reports",
    description:
      "Gain valuable insights with our comprehensive reporting tools, completely free for now.",
  },
  {
    key: "payments",
    title: "Fast Payments",
    description:
      "Get paid faster with our streamlined invoicing process, at no cost during the free phase.",
  },
];

export async function WhyeUs() {
  return <WhyeUsClient data={data} />;
}
