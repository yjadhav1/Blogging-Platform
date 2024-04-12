import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar.jsx";
import { Link } from "react-router-dom";
import { AppContext } from "../App.js";


function Header(props) {
  const { user, setUser, type , handleSearch } = useContext(AppContext);
  const { sections, title } = props;
  const navigate = useNavigate();

  function handleClick() {
    navigate("/SignIn");
  }
  function handleLogout() {
    setUser("");
    navigate("/");
  }
  function handViewPost() {
    navigate("/DisplayPost");
  }
  function handCreatePost() {
    navigate("/CreatePost");
  }
  function handManageAccess() {
    navigate("/HandleUser");
  }
  function handleOnClick(e, section) {
    e.preventDefault();
    navigate(section.url);
  }
  function handleRecommendations() {
    navigate("/AgentComponent");
  }
  function handleSubscribe() {
    navigate("/CategoryList");
  }
  function handleNotify() {
    navigate("/Notification");
  }
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button onClick={handleSubscribe} size="small">Subscribe</Button>
        <Button onClick={handleNotify} size="small">Notifications</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
         <SearchBar onSearch={handleSearch} />
        <Button
            variant="outlined"
            size="small"
            onClick={handleRecommendations}
            sx={{ marginRight: 1 }}
          >
            Recommendations
          </Button>
        {user === "" ? (
          <Button
            variant="outlined"
            size="small"
            onClick={handleClick}
            sx={{ marginRight: 1 }}
          >
            Login/Sign Up
          </Button>
        ) : (
          <>
            <Typography sx={{ marginRight: 2 }}>Hi, {user}</Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              sx={{ marginRight: 1 }}
            >
              Logout
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handCreatePost}
              sx={{ marginRight: 1 }}
            >
              Create Post
              </Button>
              {type==="admin" && <Button
                variant="outlined"
                size="small"
                onClick={handManageAccess}
                sx={{ marginRight: 1 }}
              >
                Manage User
              </Button>}
          </>
        )}

        <Button variant="outlined" size="small" onClick={handViewPost}>
          View All Post
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
            onClick={(e)=>handleOnClick(e,section)}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default React.memo(Header);
