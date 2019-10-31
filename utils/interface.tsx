export interface headerBarProps {
  themeController: number,
  mobileNavBarOpen: boolean,
  setThemeController: (value: number | ((prevVar: number) => number)) => void,
  setMobileNavBarOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
}

export interface SideNavProps {
  navbarOpen: boolean,
  setNavBarOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
  navbarOpenCounter: number,
  setNavBarOpenCounter: (value: number | ((prevVar: number) => number)) => void,
}

export interface MobileSideNavProps {
  mobileNavBarOpen: boolean,
  setMobileNavBarOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
}
