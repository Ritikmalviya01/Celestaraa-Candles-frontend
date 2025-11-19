import { LuLayoutDashboard } from "react-icons/lu";
// import tesImge from "../../../assets/testimonialsImg.png";
// import userImge from "../../../assets/usertestimonials.png";
// import Icons from "../../../common/Icons";
export const linksAdmin = [
  {
    type: "link",
    name: "Dashboard",
    icon: <LuLayoutDashboard size={22} />,
    path: "/admin",
  },
  {
    type: "dropdown",
    section: "Products",
    path: "/admin/add-products",
    icon: <LuLayoutDashboard size={22} />,
    items: [
      {
        name: "Add Products",
        path: "/admin/add-products",
      },
      {
        name: "View Products",
        path: "/admin/view-products",
      },
    ],
  },
   {
    type: "link",
    name: "View Users",
    icon: <LuLayoutDashboard size={22} />,
    path: "/admin/view-users",
  },

  {
    type: "dropdown",
    section: "Orders",
    path: "/admin/view-orders",
    icon: <LuLayoutDashboard size={22} />,
    items: [
      {
        name: "View Orders",
        path: "/admin/view-orders",
      },
      {
        name: "Completed Orders",
        path: "/admin/completed-orders",
      },
    ],
  },
  {
    type: "dropdown",
    section: "Blogs",
    path: "/admin/add-blogs",
    icon: <LuLayoutDashboard size={22} />,
    items: [
      {
        name: "Add Blog",
        path: "/admin/add-blogs",
      },
      {
        name: "View Blogs",
        path: "/admin/view-blogs",
      },
    ],
  },
  {
    type: "dropdown",
    section: "Testimonials",
    path: "/admin/add-testimonials",
    icon: <LuLayoutDashboard size={22} />,
    items: [
      {
        name: "Add Testimonials",
        path: "/admin/add-testimonials",
      },
      {
        name: "View Testimonials",
        path: "/admin/view-testimonials",
      },
    ],
  },
 
]