import {
  Activity, ArrowLeft, ArrowRight, Baby, Briefcase, CalendarCheck, Check,
  ChevronDown, ChevronRight, CircleAlert, CircleParking, Clock, Hand,
  HeartPulse, Image as ImageIcon, Mail, MapPin, Menu, Phone, ShieldCheck,
  Star, Stethoscope, X, type LucideProps,
} from "lucide-react";

const ICONS = {
  activity: Activity,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  baby: Baby,
  briefcase: Briefcase,
  "calendar-check": CalendarCheck,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "circle-alert": CircleAlert,
  "circle-parking": CircleParking,
  clock: Clock,
  hand: Hand,
  "heart-pulse": HeartPulse,
  image: ImageIcon,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  phone: Phone,
  "shield-check": ShieldCheck,
  star: Star,
  stethoscope: Stethoscope,
  x: X,
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps extends Omit<LucideProps, "size" | "color"> {
  name: string;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 20, strokeWidth = 2, color = "currentColor", style, ...rest }: IconProps) {
  const Cmp = ICONS[name as IconName];
  if (!Cmp) return null;
  return (
    <Cmp
      aria-hidden="true"
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      color={color}
      style={{ flex: "0 0 auto", ...style }}
      {...rest}
    />
  );
}
