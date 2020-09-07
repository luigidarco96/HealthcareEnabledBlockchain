/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import AccountList from "views/AccountList";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import PersonalInfoList from "views/PersonalInfoList";
import AddPatient from "views/AddPatient";
import SignOut from "views/SignOut";

const dashboardRoutes = [
  /*
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  */
  {
    path: "/accounts",
    name: "Patients List",
    icon: "pe-7s-user",
    component: AccountList,
    layout: "/admin",
    inSidebar: true
  },
  {
    path: "/personal-info/:id",
    name: "Personal Info List",
    icon: "pe-7s-graph",
    component: PersonalInfoList,
    layout: "/admin",
    inSidebar: false
  },
  {
    path: "/personal-info",
    name: "Personal Info List",
    icon: "pe-7s-graph",
    component: PersonalInfoList,
    layout: "/admin",
    inSidebar: true
  },
  {
    path: "/add-patient",
    name: "Add Patient",
    icon: "pe-7s-graph",
    component: AddPatient,
    layout: "/admin",
    inSidebar: false
  },
  {
    path: "/sign-out",
    name: "Logout",
    icon: "pe-7s-graph",
    component: SignOut,
    layout: "/admin",
    inSidebar: true,
  }
  /*
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade,
    layout: "/admin"
  }
  */
];

export default dashboardRoutes;
