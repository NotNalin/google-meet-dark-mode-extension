chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (typeof request.enabled !== "undefined" && request.mode) {
    applyDarkMode(request.enabled, request.mode);
  }
});

function applyDarkMode(enabled, mode) {
  const styleId = "dark-mode-style";
  const existingStyle = document.getElementById(styleId);

  // Remove existing style if present
  if (existingStyle) {
    existingStyle.remove();
  }

  // Don't apply if disabled
  if (!enabled || mode === "off") return;

  const darkModeStyle = `
      .gb_ld, body, .VdLOD, input, .q6oraf .VfPpkd-StrnGf-rymPhb, .F1dYic, .uvC8rd:not(:disabled),
      .xTGfdf, .p2ZbV, .Sdwpn.P9KVB, .R3Gmyc, .hWX4r, .CYZUZd, .VfPpkd-cnG4Wd, .VfPpkd-T0kwCb,
      .p2ZbV.zKHdkd, .gAGjv, .DMZ54e, .VfPpkd-P5QLlc, .Sdwpn.P9KVBf, .O68mGe-hqgu2c, .OMfBQ,
      .W7g1Rb-rymPhb, .IZY82c, .v8W0vf, .mcadHd, textarea, .mazgFe, .VfPpkd-Jh9lGc, .gvnMbb,
      .uW2Fw-cnG4Wd, .uW2Fw-oclYLd, .acuQXc, .K4vxLd-WsjYwc, textarea {
        background-color: ${
          mode === "amoled" ? "#000000" : "#131314"
        } !important;
        color: #FAFAFA !important;
        border-color: #303030 !important;
      }
  
      .v1pyg, .Sh4xSc, .MZWksc, .r3f7Nb, .sxAeHb, .qdOxv-fmcmS-yrriRe:not(.qdOxv-fmcmS-yrriRe-OWXEXe-OWB6Me),
      .qdOxv-fmcmS-wGMbrd, .VfPpkd-xl07Ob, .VfPpkd-StrnGf-rymPhb-f7MjDc, .mUIrbf-vQzf8d, .LjDxcd:not(:disabled),
      ul.VfPpkd-StrnGf-rymPhb.DMZ54e, .qhNBS, .KcE4Mc, .VfPpkd-k2Wrsb-fmcmS, .DwIq5e, .y3zDAc,
      .pBT0sc, .rVgIze, .qNFnn, .CWB3Kb, .CgQKCd, .CWAlMc, .VA2JSc, .Ue6DPb, .tJifFd,
      .DLjNp.LlMNQd .Kx3qp, .iRyR1b, .roSPhc, .RV5qrc, .xo0BHf, span.VfPpkd-vQzf8d, .BOo8qd,
      .YuzLgb, .VTPC4c, .LCQ7g, .pKGwOc, .w29hZ, .J8vCN, .ipjXQd, svg, .V6tdP, .imgc2b, .d93U2d,
      .jKwXVe, .S8daBe-uusGie-fmcmS, .S8daBe-O1htCb.S8daBe-O1htCb-OWXEXe-XpnDCe .S8daBe-uusGie-fmcmS,
      .okqcNc, .poVWob, .ptNLrf, .L93jrd, .WCp1Jd, .uZLPsc, .rj3e3, .ij23Qd, .fliwXd-OWXEXe-V67aGc,
      .IhZkic,  .uW2Fw-Sx9Kwc-OWXEXe-vOE8Lb .uW2Fw-k2Wrsb, .Hayy8b, .yoXOr, .ik7H4c,
      .LXTxRc-AznF2e:not(.LXTxRc-AznF2e-OWXEXe-auswjd):not(:disabled), .LXTxRc-jY41G-V67aGc,
      .W7g1Rb-rymPhb-fpDzbe-fmcmS, W7g1Rb-rymPhb-Gtdoyb, .W7g1Rb-rymPhb-KkROqb, .W7g1Rb-rymPhb-KkROqb:has(.W7g1Rb-rymPhb-Abojl),
      .dA2hVd-NLUYnc-xRPttf-NLUYnc, .nTj3zc, .VfPpkd-rymPhb-fpDzbe-fmcmS, .MKVSQd, .a7dBNe, .MlA6sf {
        color: #FAFAFA !important;
      }
  
      .gb_Fa svg, .google-material-icons {
        color: #ffffff !important;
      }
      
      .gb8tFb, .k5Rjf-BIzmGd {
        background-color: #0b57d0 !important;
      }
    `;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = darkModeStyle;
  document.head.appendChild(style);
}

// Apply saved dark mode settings on script load
chrome.storage.sync.get(["enabled", "darkMode"], (data) => {
  if (data.enabled && data.darkMode) {
    applyDarkMode(data.enabled, data.darkMode);
  }
});
