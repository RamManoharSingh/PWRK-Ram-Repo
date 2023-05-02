import { Route, Routes } from "react-router-dom";
import Title from "../components/dashboard/title/title";
import Officelevel from "../components/dashboard/officelevel/officelevel";
import Master from "../components/common/Layout/Layout";
import routeNames from "./routeName";
import Officeunit from "../components/dashboard/officeunit/officeunit";
import Createcase from "../components/dashboard/title/createtitle";
import CreateOfficeUnit from "../components/dashboard/officeunit/createofficeunit";
import Createofficelevel from "../components/dashboard/officelevel/createofficelevel";
import Login from "../components/dashboard/Login/login";

import Dashboard from "../components/dashboard";
import Office from "../components/dashboard/Office/office";
import CreateOffice from "../components/dashboard/Office/createoffice";
import { ForgotPassword } from "../components/dashboard/UserResetPassword/ForgotPassword";
import ResetPassword from "../components/dashboard/UserResetPassword/ResetPassword";

import CreateState from "../components/dashboard/State/CreateState";

import CreateDdotype from "../components/dashboard/DdoType/createDdotype";
import Ddotype from "../components/dashboard/DdoType/Ddotype";

import Module from "../components/dashboard/Module/Module";
import CreateModule from "../components/dashboard/Module/CreateModule";
import SignUp from "../components/dashboard/SignUp/signup";

import CreateTitle from "../components/dashboard/title/createtitle";
import Designation from "../components/dashboard/Designation/Designation";
import District from "../components/dashboard/District/District";
import OfficeType from "../components/dashboard/OfficeType/OfficeType";
import RTIDesignation from "../components/dashboard/RTIDesignation/RtiDesignation";
import State from "../components/dashboard/State/State";
import CreateDesignation from "../components/dashboard/Designation/CreateDesignation";
import CreateDistrict from "../components/dashboard/District/CreateDistrict";
import CreateOfficeType from "../components/dashboard/OfficeType/CreateOfficeType";
import CreateRTIDesignation from "../components/dashboard/RTIDesignation/CreateRTI";
import Createuser from "../components/dashboard/User/createuser";
import User from "../components/dashboard/User/user";
import CreateRole from "../components/dashboard/Role/Createrole";
import Role from "../components/dashboard/Role/role";
import OfficeAccountDetails from "../components/dashboard/OfficeAccountDetails/officeAccountDetails";
import CreateOfficeAccountDetails from "../components/dashboard/OfficeAccountDetails/CreateOfficeAccountDetails";
import OtherOffice from "../components/dashboard/OtherOffice/otherOffice";

// import { User } from "parse";
export default function Router() {
  return (
    <Routes>
      <Route path={routeNames.LOGIN} element={<Login />} />
      <Route path={routeNames.SIGNUP} element={<SignUp />} />

      <Route
        path={routeNames.RESETPASSWORD + `/:userId/:resetKey`}
        element={<ResetPassword />}
      />

      <Route path={routeNames.FORGOTPASSWORD} element={<ForgotPassword />} />
      <Route
        path={routeNames.DASHBOARD}
        element={
          //<ProtectedRotes>
          <Master />
          // </ProtectedRotes>
        }
      >
        <Route path={routeNames.DASHBOARD} element={<Dashboard />} />
        <Route path={routeNames.DESIGNATION} element={<Designation />} />
        <Route path={routeNames.DISTRICT} element={<District />} />
        <Route path={routeNames.TITLE} element={<Title />} />

        <Route path={routeNames.STATE} element={<State />} />
        <Route path={routeNames.RTIDESIGNATION} element={<RTIDesignation />} />
        <Route path={routeNames.OFFICETYPE} element={<OfficeType />} />
        <Route path={routeNames.CREATETITLE} element={<CreateTitle />} />
        <Route
          path={routeNames.CREATEOFFICETYPE}
          element={<CreateOfficeType />}
        />
        <Route
          path={routeNames.CREATERTIDESIGNATION}
          element={<CreateRTIDesignation />}
        />
        <Route path={routeNames.CREATEDISTRICT} element={<CreateDistrict />} />
        <Route
          path={routeNames.CREATEDESIGNATION}
          element={<CreateDesignation />}
        />
        <Route path={routeNames.CREATECASE} element={<Createcase />} />
        <Route path={routeNames.EDITCASE} element={<Createcase />} />

        <Route path={routeNames.OFFICELEVEL} element={<Officelevel />} />
        <Route path={routeNames.OFFICEUNIT} element={<Officeunit />} />
        <Route
          path={routeNames.CREATEOFFICEUNIT}
          element={<CreateOfficeUnit />}
        />

        <Route
          path={routeNames.CREATEOFFICELEVEL}
          element={<Createofficelevel />}
        />
        <Route path={routeNames.ROLE} element={<Role />} />
        <Route path={routeNames.OFFICE} element={<Office />} />
        <Route path={routeNames.CREATEROLE} element={<CreateRole />} />
        <Route path={routeNames.CREATESTATE} element={<CreateState />} />
        <Route path={routeNames.CREATEDDOTYPE} element={<CreateDdotype />} />
        <Route path={routeNames.DDOTYPE} element={<Ddotype />} />
        <Route path={routeNames.CREATEOFFICE} element={<CreateOffice />} />
        <Route
          path={routeNames.INSPECTIONCERTIFICATE}
          element={<inspectionCertificate />}
        />
        <Route path={routeNames.CREATEUSER} element={<Createuser />} />
        <Route path={routeNames.USER} element={<User />} />
        <Route path={routeNames.EDITUSER} element={<Createuser />} />
        <Route path={routeNames.MODULE} element={<Module />} />
        <Route path={routeNames.CREATEMODULE} element={<CreateModule />} />
        <Route
          path={routeNames.OFFICEACCOUNTDETAILS}
          element={<OfficeAccountDetails />}
        />
        <Route
          path={routeNames.CREATEOFFICEACCOUNTDETAILS}
          element={<CreateOfficeAccountDetails />}
        />
        <Route path={routeNames.OTHEROFFICE} element={<OtherOffice />} />
      </Route>
    </Routes>
  );
}
