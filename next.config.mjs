import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// Keep production verification separate from the active local preview.
export default (phase) => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next" : ".next-production",
});
