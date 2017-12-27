// Super Hackish install google analytics,
// Everything is hardcoded,
// I just want to get this out and verify analytics work
//
// thanks to: https://www.simoahava.com/gtm-tips/gtmtips-deploy-gtm-chrome-extension/

export default function setupGTAG() {
  // INJECT SCRIPT PART
  const other = document.getElementsByTagName('script')[0] // get the first element
  const elem = document.createElement('script') // create or new element
  elem.async = true
  elem.src = 'https://www.googletagmanager.com/gtag/js?id=UA-51519744-6'
  // Inject our script
  other.parentNode.insertBefore(elem, other)

  // GTAG PART
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', 'UA-51519744-6');
}
