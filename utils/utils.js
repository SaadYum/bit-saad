// Utility Function for Formatting Numbers into K,M,G Format i.e. 1000 to 1K
// Main Purpose is to convert Artist Followers to a good Format.
// Three simple if Conditions for G, M, K respectively will do the work.
export function format_nums(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
}
