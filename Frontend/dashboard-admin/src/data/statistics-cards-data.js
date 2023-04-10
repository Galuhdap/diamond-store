import {
  BanknotesIcon,
  UserIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "orange",
    icon: BanknotesIcon,
    title: "Today's Money",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "pink",
    icon: UserGroupIcon,
    title: "Player's",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "green",
    icon: UserIcon,
    title: "User's Client",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Sales",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
  {
    color: "green",
    icon: CheckCircleIcon,
    title: "complete Payments",
    value: "100",
    users: "Player's",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
  {
    color: "orange",
    icon: ClockIcon,
    title: "Pending Payments",
    value: "3462",
    users: "Player's",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "green",
    icon: ArrowUpCircleIcon,
    title: "Order IN",
    value: "100",
    users: "Player's",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
  {
    color: "red",
    icon: ArrowDownCircleIcon,
    title: "Order OUT",
    value: "3462",
    users: "Player's",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
