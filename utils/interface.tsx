export interface headerBarProps {
  themeController: number,
  mobileNavBarOpen: boolean,
  setThemeController: (value: number | ((prevVar: number) => number)) => void,
  setMobileNavBarOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
}

export interface SideNavProps {
  navbarOpen: boolean,
  setNavBarOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
}

export interface MobileSideNavProps {
  mobileNavBarOpen: boolean,
  setMobileNavBarOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
}

export interface TableProps {
  search: string,
  userlist: Array<any>,
  setUserlist: (value: Array<any> | ((prevVar: Array<any>) => Array<any>)) => void,
}

export interface UserlistProps {
  setUserlist: (value: Array<any> | ((prevVar: Array<any>) => Array<any>)) => void,
}

export interface AUTCProps {
  userlist: Array<any>,
  setUserlist: (value: Array<any> | ((prevVar: Array<any>) => Array<any>)) => void,
}
