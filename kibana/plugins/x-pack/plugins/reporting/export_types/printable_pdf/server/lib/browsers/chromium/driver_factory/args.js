export const args = ({ userDataDir, bridgePort, viewport, disableSandbox, proxyConfig }) => {
  const flags = [
    // Disable built-in Google Translate service
    '--disable-translate',
    // Disable all chrome extensions entirely
    '--disable-extensions',
    // Disable various background network services, including extension updating,
    //   safe browsing service, upgrade detector, translate, UMA
    '--disable-background-networking',
    // Disable fetching safebrowsing lists, likely redundant due to disable-background-networking
    '--safebrowsing-disable-auto-update',
    // Disable syncing to a Google account
    '--disable-sync',
    // Disable reporting to UMA, but allows for collection
    '--metrics-recording-only',
    // Disable installation of default apps on first run
    '--disable-default-apps',
    // Mute any audio
    '--mute-audio',
    // Skip first run wizards
    '--no-first-run',
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    '--headless',
    '--hide-scrollbars',
    `--window-size=${Math.floor(viewport.width)},${Math.floor(viewport.height)}`,
    `--remote-debugging-port=${bridgePort}`,
  ];

  if (proxyConfig.enabled) {
    flags.push(`--proxy-server=${proxyConfig.server}`);
    if (proxyConfig.bypass) {
      flags.push(`--proxy-bypass-list=${proxyConfig.bypass.join(',')}`);
    }
  }

  if (disableSandbox) {
    flags.push('--no-sandbox');
  }

  if (process.platform === 'linux') {
    flags.push('--disable-setuid-sandbox');
  }

  return [...flags, 'about:blank'];
};
