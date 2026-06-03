import { Activity, BadgeDollarSign, Bot, Brain, CalendarDays, Plane, School, ShieldCheck, Trophy, Users, Zap } from "lucide-react";

export type BusinessKey = "soccer" | "tfi" | "cloudroute" | "playfield";

export type Metric = {
  label: string;
  value: string;
  delta: string;
  tone: "blue" | "green" | "violet" | "amber";
};

export type ModuleMetric = {
  label: string;
  value: string;
};

export type BusinessModule = {
  key: BusinessKey;
  name: string;
  description: string;
  icon: typeof Trophy;
  focus: string[];
  metrics: ModuleMetric[];
  weekly: string[];
  insights: string[];
  health: number;
};

export const globalMetrics: Metric[] = [
  { label: "Total Leads", value: "1,284", delta: "+18.4% this month", tone: "blue" },
  { label: "New Leads This Week", value: "96", delta: "+21 vs last week", tone: "green" },
  { label: "Active Clients", value: "342", delta: "87% retained", tone: "violet" },
  { label: "Revenue Tracking", value: "$148.6K", delta: "+12.8% pipeline", tone: "green" },
  { label: "Conversion Rate", value: "28.7%", delta: "+3.2pp weekly", tone: "blue" },
  { label: "AI Recommendations", value: "14", delta: "5 urgent actions", tone: "amber" }
];

export const businessModules: BusinessModule[] = [
  {
    key: "soccer",
    name: "SoccerRangers / TFS",
    description: "Youth football growth, trials, camps, attendance, and retention intelligence.",
    icon: Trophy,
    focus: ["Trial Players", "Active Players", "Camp Registrations", "Parent Leads", "Conversion Funnel", "Attendance", "Retention Rate"],
    metrics: [
      { label: "Trial Players", value: "42" },
      { label: "Active Players", value: "186" },
      { label: "Camp Registrations", value: "68" },
      { label: "Retention", value: "91%" }
    ],
    weekly: ["31 new parent leads", "18 new registrations", "24 renewal opportunities", "7 at-risk players flagged"],
    insights: ["Most new leads are coming from Xiaohongshu.", "Saturday trial sessions have the highest conversion rate.", "U10 attendance dipped 8%; trigger parent follow-up workflow."],
    health: 92
  },
  {
    key: "tfi",
    name: "TFI",
    description: "Education pathway, partnerships, coach recruitment, and international opportunity pipeline.",
    icon: School,
    focus: ["Student Leads", "School Partnerships", "Coach Recruitment", "International Opportunities"],
    metrics: [
      { label: "Student Leads", value: "118" },
      { label: "Partners", value: "14" },
      { label: "Coach Pipeline", value: "23" },
      { label: "Opportunities", value: "9" }
    ],
    weekly: ["12 new student leads", "3 partner meetings", "5 coach candidates", "2 pathway proposals ready"],
    insights: ["Two school partnerships are ready for executive follow-up.", "Coach recruitment velocity is strong but onboarding documents lag.", "International pathway interest is highest among U15 families."],
    health: 84
  },
  {
    key: "cloudroute",
    name: "CloudRoute",
    description: "Travel, housing, visitor services, and international conversion operations.",
    icon: Plane,
    focus: ["Travel Inquiries", "Housing Leads", "International Visitors", "Conversion Funnel"],
    metrics: [
      { label: "Travel Inquiries", value: "77" },
      { label: "Housing Leads", value: "34" },
      { label: "Visitors", value: "19" },
      { label: "Conversion", value: "22%" }
    ],
    weekly: ["9 high-intent inquiries", "6 housing packages quoted", "4 visitor itineraries", "11 stalled follow-ups"],
    insights: ["Most requested services are housing plus airport transfer bundles.", "Shanghai-to-London remains the highest potential route.", "Follow-up SLA needs tightening for inquiries older than 48 hours."],
    health: 76
  },
  {
    key: "playfield",
    name: "PlayField",
    description: "AI × youth maker programs, community momentum, events, and hackathon pipeline.",
    icon: Brain,
    focus: ["Community Growth", "Event Registrations", "Hackathon Participants", "AI Program Leads"],
    metrics: [
      { label: "Community", value: "612" },
      { label: "Event Regs", value: "143" },
      { label: "Hackathon", value: "52" },
      { label: "AI Leads", value: "88" }
    ],
    weekly: ["73 new community members", "44 event registrations", "16 hackathon applicants", "3 sponsor conversations"],
    insights: ["Growth trend is strongest after short-form AI demo posts.", "Maker event engagement is 34% higher with parent co-attendance.", "Sponsor conversations should be consolidated into a formal partner deck."],
    health: 88
  }
];

export const executiveInsights = [
  {
    icon: Zap,
    title: "Biggest growth opportunity",
    body: "Bundle SoccerRangers trials with PlayField AI maker weekends to convert high-intent parent leads across sports and education."
  },
  {
    icon: ShieldCheck,
    title: "Biggest business risk",
    body: "CloudRoute has 11 stalled follow-ups. Without a 48-hour response workflow, high-potential visitors may leak from the funnel."
  },
  {
    icon: Activity,
    title: "Suggested next actions",
    body: "Prioritize Saturday trial capacity, schedule TFI partner follow-ups, and launch a unified weekly lead review ritual every Monday."
  },
  {
    icon: Bot,
    title: "Future agent handoff",
    body: "Enrollment, Marketing, Research, Operations, and Football Analysis agents can attach to the shared activities, reports, and ai_insights tables."
  }
];

export const agentRoadmap = [
  "Enrollment Agent",
  "Marketing Agent",
  "Research Agent",
  "Operations Agent",
  "Football Analysis Agent"
];

export const timeline = [
  { time: "Mon 09:00", event: "Weekly CEO report generated", owner: "AI Executive Assistant" },
  { time: "Mon 11:30", event: "SoccerRangers at-risk players reviewed", owner: "Operations" },
  { time: "Tue 14:00", event: "TFI school partnership follow-up", owner: "Growth" },
  { time: "Thu 16:00", event: "CloudRoute visitor funnel audit", owner: "Client Services" }
];

export const channelPerformance = [
  { channel: "Xiaohongshu", leads: 44, conversion: "34%" },
  { channel: "WeChat", leads: 31, conversion: "27%" },
  { channel: "Referrals", leads: 18, conversion: "42%" },
  { channel: "Events", leads: 26, conversion: "25%" }
];
