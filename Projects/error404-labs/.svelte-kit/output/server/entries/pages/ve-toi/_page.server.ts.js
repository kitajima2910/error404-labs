const load = async () => {
  const ABOUT = (await import("../../../chunks/ABOUT.js")).default;
  return {
    dataABOUTRaw: ABOUT
  };
};
export {
  load
};
