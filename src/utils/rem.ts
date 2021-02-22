export const rootFontSize = 750;
export let setRem = () => {
  const width = document.documentElement.clientWidth
  const scale = width / rootFontSize
  document.documentElement.style.fontSize = rootFontSize * Math.min(scale, 750/rootFontSize) + 'px'
  if(width>750)
        constConfig.isPc = true
    else 
        constConfig.isPc = false
}
