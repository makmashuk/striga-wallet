import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Logo from "@/components/elements/Logo";
import { useUserContext } from "@/context/user";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { KYC_STATUS } from "@/constans/kycstatus.constant";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import MobileOffIcon from "@mui/icons-material/MobileOff";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import VerifiedIcon from "@mui/icons-material/Verified";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
const drawerWidth = 240;
interface Props {
  children: React.ReactNode;
  window?: () => Window;
}

export default function DashLayout({ window, children }: Props) {
  const {
    user: currentUser,
    handleLogout,
    verificationState,
  } = useUserContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sideMenu = [
    { id: 1, title: "Wallets", route: "/dashboard" },
    { id: 2, title: "Profile", route: "/profile" },
    { id: 3, title: "Swap Transfer", route: "/dashboard/swap" },
  ];
  const drawer = (
    <div>
      <Toolbar variant="regular">
        <Logo />
      </Toolbar>
      <Divider />
      <List>
        {sideMenu.map((item, index) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={router?.pathname === item.route}
              onClick={() => router.push(item.route)}
              disabled={verificationState?.status != KYC_STATUS.APPROVED}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleLogout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  React.useEffect(() => {
    // console.log(currentUser);
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          variant="regular"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: "0", md: "1em" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Typography variant="h5" noWrap component="div">
              Wc {currentUser?.firstName}, {currentUser?.lastName}
            </Typography>
            <Typography variant="caption" noWrap component="div">
              Wallet Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1em" }}>
            {verificationState?.mobileVerified ? (
              <MobileFriendlyIcon fontSize="large" color="success" />
            ) : (
              <MobileOffIcon fontSize="large" color="warning" />
            )}
            {verificationState?.emailVerified ? (
              <MarkEmailReadIcon fontSize="large" color="success" />
            ) : (
              <UnsubscribeIcon fontSize="large" color="warning" />
            )}
            {verificationState?.missingFields ? (
              <PersonOffIcon fontSize="large" color="warning" />
            ) : (
              ""
            )}
            {verificationState?.status === KYC_STATUS.APPROVED ? (
              <VerifiedIcon fontSize="large" color="success" />
            ) : (
              <GppMaybeIcon fontSize="large" color="warning" />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar variant="regular" />
        {children}
      </Box>
    </Box>
  );
}
