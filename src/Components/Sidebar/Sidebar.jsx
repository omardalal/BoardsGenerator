import React, { useState } from "react";
import { styles } from "./styles.ts";
import { Add, Save, Login, Logout, User } from "@carbon/react/icons";
import PropTypes from "prop-types";
import useAuth from "../../CustomHooks/useAuth";
import { signOutUser } from "../../Utilities/AuthenticationUtils";

const Sidebar = (props) => {
  const { selectedTab, setSelectedTab } = props;

  const loggedUser = useAuth();

  const [hoveredBtn, setHoveredBtn] = useState(-1);

  const getSidebarBtn = (text, index, icon, logout) => {
    return (
      <div
        style={styles.sidebarBtn(hoveredBtn === index, selectedTab === index)}
        onMouseEnter={() => setHoveredBtn(index)}
        onMouseLeave={() => setHoveredBtn(-1)}
        onClick={async () => {
          if (logout) {
            try {
              await signOutUser();
            } catch (err) {
              console.error("Failed to logout, Error:" + err);
            }
          }
          setSelectedTab(index);
        }}
      >
        <div style={styles.btnIconContainer}>{icon}</div>
        {text}
      </div>
    );
  };

  return (
    <div style={styles.mainContainer}>
      {getSidebarBtn(
        "New Package",
        0,
        <Add style={styles.btnIconStyle(true)} />
      )}
      {getSidebarBtn(
        "Saved Packages",
        1,
        <Save style={styles.btnIconStyle(false)} />
      )}
      {getSidebarBtn(
        loggedUser.isSignedIn ? "Log out" : "Login",
        2,
        loggedUser.isSignedIn ? (
          <Login style={styles.btnIconStyle(false)} />
        ) : (
          <Logout style={styles.btnIconStyle(false)} />
        ),
        loggedUser?.isSignedIn
      )}
      {!loggedUser.isSignedIn &&
        getSidebarBtn(
          "Sign up",
          3,
          <User style={styles.btnIconStyle(false)} />
        )}
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  selectedTab: PropTypes.number,
  setSelectedTab: PropTypes.func,
};
