import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../api/auth.api";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { IoIosLock, IoMdCreate } from "react-icons/io";
import { AiFillInfoCircle } from "react-icons/ai";
import { RiExchange2Fill } from "react-icons/ri";
import { TbCoinTakaFilled, TbLayoutListFilled } from "react-icons/tb";
import { GrFormNext, GrLinkPrevious } from "react-icons/gr";
import { BiHistory } from "react-icons/bi";
// import { FaListUl } from "react-icons/fa";
import { MdOutlineFormatListBulleted } from "react-icons/md";
// import { GiTrade } from "react-icons/gi";
import AnimateHeight from "react-animate-height";
import logo from "../imgs/user-128.png";
import ROUTES from "../constant/routes";

const DropdownNavbar = ({ height, userInfo, closeDropdown }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);

  const closeDropdownNavbar = () => {
    closeDropdown(0);
  };

  const renderedUserInfo = useMemo(() => {
    if (!userInfo) return;

    return (
      <div
        className="user-info"
        onClick={() => {
          navigate(ROUTES.PROFILE_USER_INFORMATION);
          closeDropdownNavbar();
        }}
      >
        <div className="user-info-item">
          <div className="user-info-item--avatar">
            <img src={userInfo.avatarUrl ? userInfo.avatarUrl : logo} alt="" />
          </div>
        </div>
        <div className="user-info-item">
          <span className="user-info-item--fullname">
            <strong>{userInfo.firstName + " " + userInfo.lastName}</strong>
          </span>
          {/* <span className="user-info-item--email">
            <b>{userInfo.email}</b>
          </span> */}
          <span className="user-info-item--point">
            🪙<b>{userInfo.point?.point || 0}</b>
          </span>
        </div>
      </div>
    );
    // eslint-disable-next-line
  }, [userInfo]);

  const menuItems = [
    {
      icon: <AiFillInfoCircle />,
      label: "Security & privacy",
      subItems: [
        {
          icon: <IoIosLock />,
          label: "Change password",
          route: ROUTES.PROFILE_ACCOUNT_INFO,
        },
        {
          icon: <MdOutlineFormatListBulleted />,
          label: "Activity log",
          // route: ROUTES.PROFILE_ACCOUNT_INFO,
        },
      ],
    },
    {
      icon: <TbLayoutListFilled />,
      label: "Recipe management",
      subItems: [
        {
          icon: <IoMdCreate />,
          label: "Created recipes",
          route: ROUTES.PROFILE_RECIPE_MANAGEMENT,
        },
        {
          icon: <RiExchange2Fill />,
          label: "Purchased recipes",
          route: ROUTES.PROFILE_PURCHASED_RECIPES,
        },
        {
          icon: <BiHistory />,
          label: "Transactions history",
          route: ROUTES.PROFILE_RECIPE_TRANSACTION_HISTORY,
        },
      ],
    },
    {
      icon: <TbCoinTakaFilled />,
      label: "Point history",
      route: ROUTES.PROFILE_POINT_HISTORY,
    },
    {
      icon: <IoMdSettings />,
      label: "Settings",
      route: ROUTES.SETTINGS,
    },
    {
      icon: <IoLogOut />,
      label: "Sign out",
      onClick: () => {
        closeDropdownNavbar();
        signOutUser(dispatch, navigate);
      },
    },
  ];

  const handleClickMenuItem = (item, index) => {
    if (item.subItems) {
      setActiveMenu(index);
    } else if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.route);
      closeDropdownNavbar();
    }
  };

  return (
    <AnimateHeight
      className="sub-menu-wrap"
      id="subMenu"
      duration={300}
      height={height}
    >
      <div className="sub-menu">
        {activeMenu === null ? (
          <>
            <div className="sub-menu__header">{renderedUserInfo}</div>
            {menuItems.map((item, index) => (
              <div
                className="sub-menu-link"
                key={index}
                onClick={() => handleClickMenuItem(item, index)}
              >
                <div className="sub-menu-link-before">{item.icon}</div>
                <p className="sub-menu-link_label">{item.label}</p>
                {item.subItems && (
                  <GrFormNext className="sub-menu-link-after" />
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="sub-menu__header">
              <button
                className="sub-menu-btn"
                onClick={() => setActiveMenu(null)}
              >
                <GrLinkPrevious />
              </button>
              <span>
                <b>{menuItems[activeMenu].label}</b>
              </span>
            </div>
            {menuItems[activeMenu].subItems.map((subItem, index) => (
              <div
                className="sub-menu-link"
                key={index}
                onClick={() => handleClickMenuItem(subItem, index)}
              >
                <div className="sub-menu-link-before">{subItem.icon}</div>
                <p className="sub-menu-link_label">{subItem.label}</p>
                {subItem.subItems && (
                  <GrFormNext className="sub-menu-link-after" />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </AnimateHeight>
  );
};

export default DropdownNavbar;

// <div
//           className="sub-menu-link"
//           onClick={() => {
//             navigate(ROUTES.PROFILE_USER_INFORMATION);
//             closeDropdownNavbar();
//           }}
//         >
//           <AiFillInfoCircle className="sub-menu-link-before" />
//           <p>Personal information</p>
//           {/* <GrFormNext className="sub-menu-link-after" /> */}
//         </div>

//         <div
//           className="sub-menu-link"
//           onClick={() => {
//             navigate(ROUTES.PROFILE_ACCOUNT_INFO);
//             closeDropdownNavbar();
//           }}
//         >
//           <TbLayoutListFilled className="sub-menu-link-before" />
//           <p>Your Recipes</p>
//           {/* <GrFormNext className="sub-menu-link-after" /> */}
//         </div>

//         <div
//           className="sub-menu-link"
//           onClick={() => {
//             navigate(ROUTES.PROFILE_ACCOUNT_INFO);
//             closeDropdownNavbar();
//           }}
//         >
//           <RiExchange2Fill className="sub-menu-link-before" />
//           <p>Recipe exchange history</p>
//           {/* <GrFormNext className="sub-menu-link-after" /> */}
//         </div>

//         <div
//           className="sub-menu-link"
//           onClick={() => {
//             navigate(ROUTES.PROFILE_ACCOUNT_INFO);
//             closeDropdownNavbar();
//           }}
//         >
//           <IoIosLock className="sub-menu-link-before" />
//           <p>Change password</p>
//           {/* <GrFormNext className="sub-menu-link-after" /> */}
//         </div>

//         <div
//           className="sub-menu-link"
//           onClick={() => {
//             navigate(ROUTES.SETTINGS);
//             closeDropdownNavbar();
//           }}
//         >
//           <IoMdSettings className="sub-menu-link-before" />
//           <p>Settings</p>
//           {/* <GrFormNext className="sub-menu-link-after" /> */}
//         </div>

//         <div
//           className="sub-menu-link"
//           onClick={() => {
//             closeDropdownNavbar();
//             signOutUser(dispatch, navigate);
//           }}
//         >
//           <IoLogOut className="sub-menu-link-before" />
//           <p>Sign out</p>
//           {/* <GrFormNext className="sub-menu-link-after" /> */}
//         </div>
