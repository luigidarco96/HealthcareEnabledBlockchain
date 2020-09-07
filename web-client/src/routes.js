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
import AccountList from "views/AccountList";
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
    path: "/personal-info/:id/:name",
    name: "Personal Info List",
    icon: "pe-7s-graph",
    component: PersonalInfoList,
    layout: "/admin",
    inSidebar: false
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
];

export default dashboardRoutes;
