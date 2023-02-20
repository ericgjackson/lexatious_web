// Return the dimensions for the major elements that can resize depending on the screen size.
// indexHeight is the height of the screen (it is linked to the height of a div that contains
// everything).
//
// We calculate remHeight by taking indexHeight and subtracting the height of some fixed size
// elements.  Namely the Message, the Competitors, and some margins/padding.  It is unfortunate
// that we have these expressed as "magic" constants here.  TODO: fix.

// After that we calculate the size of the buttons.  It is the minimum of:
// 1) 10% of remHeight
// 2) 1/6 of 1/3 of the width of the screen (1/6 because there are 6 nav buttons).
// 3) 100px
// remHeight2 is remHeight minus the size of the two button rows.

// The remaining height (remHeight2) is allocated 90% to the board and 10% to the rack.
//
// For the most part, it's assumed that the the height is the limiting dimension rather than the
// width.  This makes sense for devices with landscape orientation like most desktops and laptops.
// This doesn't work so well for mobile web, but we currently don't plan to support phones and
// tablets (in part because they are too small, in part because the web interface assumes
// keyboard input).  Better to force the user to use the native apps on those devices.

import { Config } from 'ltypes';

interface Dims {
  cellSize: number;
  rackTileSize: number;
  buttonSize: number;
}

const getDims = (config: Config, screenHeight: number, screenWidth: number): Dims => {
  // 46 for the Message and Competitors components.
  // Font size 16, 1.5x for h2, 1.5x for line height, 2*5 for margin of 5
  // 10 is the padding inside NavButtons/GameButton/Rack
  // 20 for a little margin at the top and bottom
  const remHeight = screenHeight - 2 * 46 - 6 * 10 - 20;
  const buttonSize1 = Math.floor(remHeight / 10.0);
  const buttonSize2 = Math.floor(screenWidth / 3.0 / 6.0);
  const buttonSize = Math.min(Math.min(buttonSize1, buttonSize2), 100);
  const remHeight2 = remHeight - 2 * buttonSize;
  const cellSize = Math.floor(((9.0 * remHeight2) / 10.0) / config.boardHeight);
  const rackTileSize = Math.floor(remHeight2 / 10.0);
  return { cellSize, rackTileSize, buttonSize };
};

export default getDims;
