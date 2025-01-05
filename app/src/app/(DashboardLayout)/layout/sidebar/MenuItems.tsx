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
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Users",
  },
  {
    id: uniqueId(),
    title: "Todos",
    icon: IconUser,
    href: "/users",
  },
  {
    id: uniqueId(),
    title: "Administradores",
    icon: IconUser,
    href: "/users/admins",
  },
  {
    id: uniqueId(),
    title: "Comerciantes",
    icon: IconUser,
    href: "/users/traders",
  },
  {
    id: uniqueId(),
    title: "Clientes",
    icon: IconUser,
    href: "/users/clients",
  },
  {
    navlabel: true,
    subheader: "Tiendas",
  },
  {
    id: uniqueId(),
    title: "Tiendas",
    icon: IconShoppingBag,
    href: "/stores",
  },
  {
    navlabel: true,
    subheader: "Suscripciones",
  },
  {
    id: uniqueId(),
    title: "Suscripciones",
    icon: IconRegistered,
    href: "/suscriptions",
  },
  {
    navlabel: true,
    subheader: "Ordenes",
  },
  {
    id: uniqueId(),
    title: "Ordenes",
    icon: IconBrandStripeFilled,
    href: "/orders",
  },
  {
    navlabel: true,
    subheader: "Facturas",
  },
  {
    id: uniqueId(),
    title: "Facturas",
    icon: IconFileDollar,
    href: "/invoices",
  },
  {
    navlabel: true,
    subheader: "Pagos",
  },
  {
    id: uniqueId(),
    title: "Pagos",
    icon: IconBrandPaypay,
    href: "/payments",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
