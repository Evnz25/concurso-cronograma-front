import type { ReactNode } from "react";
import Svg, { Circle, Ellipse, Path, Rect } from "react-native-svg";
import type { IconName } from "@/interfaces";
import { colors } from "@/theme";

const PATHS: Record<IconName, ReactNode> = {
  home: <Path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />,
  calendar: (
    <>
      <Rect x="3" y="5" width="18" height="16" rx="3" />
      <Path d="M7 3v4m10-4v4M3 11h18m-14 4h2m3 0h2m3 0h1m-11 3h2m3 0h2" />
    </>
  ),
  book: <Path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15" />,
  chart: <Path d="M4 3v18h18M9 16v-5m5 5V7m5 9V3" />,
  user: (
    <>
      <Circle cx="12" cy="8" r="4" />
      <Path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </>
  ),
  arrow: <Path d="M4 12h16m-6-6 6 6-6 6" />,
  chevron: <Path d="m9 5 7 7-7 7" />,
  bell: <Path d="M5 9a7 7 0 0 1 14 0c0 7 3 7 3 9H2c0-2 3-2 3-9m4 12h6" />,
  clock: (
    <>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M12 7v5l3 2" />
    </>
  ),
  target: (
    <>
      <Circle cx="12" cy="12" r="9" />
      <Circle cx="12" cy="12" r="5" />
      <Circle cx="12" cy="12" r="1" />
    </>
  ),
  check: <Path d="m5 12 4 4L19 6" />,
  fire: (
    <Path d="M12 2c1 6-5 7-5 11 0 2 1 3 2 3-1-5 4-5 4-9 2 3 6 6 6 10a7 7 0 0 1-14 0c0-5 3-6 7-15Z" />
  ),
  spark: <Path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4ZM20 2v4m-2-2h4" />,
  code: <Path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" />,
  server: (
    <>
      <Rect x="3" y="3" width="18" height="7" rx="2" />
      <Rect x="3" y="14" width="18" height="7" rx="2" />
      <Path d="M7 6.5h.01M7 17.5h.01M16 7h2m-2 10h2" />
    </>
  ),
  database: (
    <>
      <Ellipse cx="12" cy="5" rx="8" ry="3" />
      <Path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7" />
    </>
  ),
  shield: (
    <>
      <Path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z" />
      <Path d="m8 12 3 3 5-6" />
    </>
  ),
  briefcase: (
    <>
      <Rect x="3" y="7" width="18" height="14" rx="2" />
      <Path d="M8 7V3h8v4M3 12c5 4 13 4 18 0m-11 2h4" />
    </>
  ),
  pin: (
    <>
      <Path d="M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 0 1 14 0Z" />
      <Circle cx="12" cy="9" r="2" />
    </>
  ),
  close: <Path d="m6 6 12 12M6 18 18 6" />,
  help: (
    <>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M9 8a3 3 0 0 1 6 1c0 2-3 2-3 5m0 3h.01" />
    </>
  ),
  settings: (
    <>
      <Path d="m9 3-1 3-3 1-2 4 2 2v3l3 2 1 3h6l1-3 3-2v-3l2-2-2-4-3-1-1-3Z" />
      <Circle cx="12" cy="12" r="3" />
    </>
  ),
  logout: <Path d="M9 3H4v18h5m5-15 6 6-6 6m-5-6h11" />,
  coffee: <Path d="M3 8h14v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Zm14 1h2a3 3 0 0 1 0 6h-2M7 2v3m5-3v3" />,
  trend: <Path d="m3 17 6-6 4 4 8-10m-6 0h6v6" />,
  mail: (
    <>
      <Rect x="2" y="4" width="20" height="16" rx="3" />
      <Path d="m2 6 10 7L22 6" />
    </>
  ),
};

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 20, color = colors.text }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </Svg>
  );
}
