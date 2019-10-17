export interface themeProps {
  themeController: number,
  setThemeController: (value: number | ((prevVar: number) => number)) => void,
};

export interface SideNavProps {
  navbarOpen: boolean,
  setNavBarOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
  navbarOpenCounter: number,
  setNavBarOpenCounter: (value: number | ((prevVar: number) => number)) => void,
}
