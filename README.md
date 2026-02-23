# Chemical Dilution CTD

Web-based Chemical Dilution / Blending calculator for Rockline operators.

Supports two lines:
- **MT-17**
- **MT-25/26**

## Features
- Toggle between MT-17 and MT-25/26 (hard reset on mode change to prevent wrong calculations)
- Container + chemical selection with **line-based restrictions**
  - MT-17: Steel Tote / Plastic Tote / Carboy; chemicals: 0300, CIP-100 (no Foamer, no 3363)
  - MT-25/26: Steel Tote / Plastic Tote / Carboy / Foamer; chemicals: 3363, 0300 (no CIP-100)
- Calculates:
  - Empty weight (tare)
  - Combined weight
  - Water weight
  - Gallons
  - Chemical amount
  - Chemical addition (mL)
  - **CIP-100 shows kg equivalent** next to mL (using 1300 mL = 1.669 kg)
- **Reference Sheet** built into the UI (table view by line) for common fills
- Mobile responsive layout

## How to Use
1. Choose the correct line (MT-17 or MT-25/26).
2. Select container type and chemical type.
3. Enter **Weight of Container + Water (lbs)**.
4. Click **Calculate**.
5. Use **Reference Sheet** for common fills when in a rush.

## Files
- `index.html` – UI layout
- `styles.css` – styling + responsive layout
- `script.js` – calculations, mode rules, reference table rendering