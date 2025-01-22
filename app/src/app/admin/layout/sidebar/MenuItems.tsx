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
    href: "/admin",
  },
  {
    navlabel: true,
    subheader: "Users",
  },
  {
    id: uniqueId(),
    title: "Administradores",
    icon: IconUser,
    href: "/admin/users/admins",
  },
  {
    id: uniqueId(),
    title: "Comerciantes",
    icon: IconUser,
    href: "/admin/users/traders",
  },
  {
    id: uniqueId(),
    title: "Clientes",
    icon: IconUser,
    href: "/admin/users/clients",
  },
  {
    navlabel: true,
    subheader: "Tiendas",
  },
  {
    id: uniqueId(),
    title: "Tiendas",
    icon: IconShoppingBag,
    href: "/admin/stores",
  },
  {
    navlabel: true,
    subheader: "Suscripciones",
  },
  {
    id: uniqueId(),
    title: "Suscripciones",
    icon: IconRegistered,
    href: "/admin/suscriptions",
  },
  {
    navlabel: true,
    subheader: "Ordenes",
  },
  {
    id: uniqueId(),
    title: "Ordenes",
    icon: IconBrandStripeFilled,
    href: "/admin/orders",
  },
  {
    navlabel: true,
    subheader: "Facturas",
  },
  {
    id: uniqueId(),
    title: "Facturas",
    icon: IconFileDollar,
    href: "/admin/invoices",
  },
  {
    navlabel: true,
    subheader: "Pagos",
  },
  {
    id: uniqueId(),
    title: "Pagos",
    icon: IconBrandPaypay,
    href: "/admin/payments",
  },
];

export default Menuitems;
