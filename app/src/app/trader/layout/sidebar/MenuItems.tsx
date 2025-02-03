import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconUserPlus,
  IconUser,
  IconShoppingBag,
  IconRegistered,
  IconBrandStripeFilled,
  IconFileDollar,
  IconBrandPaypay
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/trader",
  },
  {
    navlabel: true,
    subheader: "Tiendas",
  },
  {
    id: uniqueId(),
    title: "Tiendas",
    icon: IconShoppingBag,
    href: "/trader/stores",
  },
  {
    navlabel: true,
    subheader: "Suscripciones",
  },
  {
    id: uniqueId(),
    title: "Suscripciones",
    icon: IconRegistered,
    href: "/trader/suscriptions",
  },
  {
    navlabel: true,
    subheader: "Pagos",
  },
  {
    id: uniqueId(),
    title: "Pagos",
    icon: IconBrandPaypay,
    href: "/",
  },
];

export default Menuitems;
