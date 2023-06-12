import AppAction, { actionMap } from "@/utils/app-action";
import { platform } from "@/utils/index";
export function ChangeTheme(theme = "light") {
  // if (["dark", "light"].includes(theme)) {
  //   require(`../styles/theme/${theme}.less`);
  // }
  document.querySelector("html").classList.add(`theme-${theme}`);
}
export function checkMedia() {
  return new Promise((resolve) => {
    //启用媒体查询变色
    try {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return resolve("dark");
      }
      // else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      //   resolve("light");
      // } else {
      //   resolve("light");
      // }
      resolve("light");
    } catch (err) {
      resolve("light");
    }
  });
}
export async function initTheme() {
  if (platform.ios) {
    const theme = await checkMedia();
    ChangeTheme(theme);
  } else {
    try {
      const { success, data } = await AppAction(actionMap.getSystem);
      if (success) return ChangeTheme(data.theme);
      const theme = await checkMedia();
      ChangeTheme(theme);
    } catch (e) {}
  }
}
