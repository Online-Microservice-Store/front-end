import {
  IconLayoutDashboard,
  IconUser,
  IconBrandStripeFilled,
  IconFileDollar,
  IconBrandPaypay
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const MenuitemsClient = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Comprar",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Perfil",
    icon: IconUser,
    href: "/profile",
  },
  {
    navlabel: true,
    subheader: "Pedidos",
  },
  {
    id: uniqueId(),
    title: "Ordenes",
    icon: IconBrandStripeFilled,
    href: "/products/orders",
  },
  {
    navlabel: true,
    subheader: "Facturas",
  },
  {
    id: uniqueId(),
    title: "Facturas",
    icon: IconFileDollar,
    href: "/products/invoices",
  },
  {
    id: uniqueId(),
    title: "Pagos",
    icon: IconBrandPaypay,
    href: "/payments",
  },
];

export default MenuitemsClient;
