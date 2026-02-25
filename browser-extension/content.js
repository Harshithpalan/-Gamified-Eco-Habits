/**
 * content.js
 * Detects products on e-commerce pages and injects an eco-score overlay.
 */

console.log("EcoHabit Shopping Assistant active");

function injectEcoScore() {
    // Check if we're on a product page
    const productNameElement = document.getElementById("productTitle") ||
        document.querySelector(".B_NuCI"); // Amazon / Flipkart classes

    if (!productNameElement) return;

    const productName = productNameElement.innerText.trim();
    console.log("Product detected:", productName);

    // Avoid multiple injections
    if (document.getElementById("ecohabit-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "ecohabit-overlay";
    overlay.innerHTML = `
    <div class="eco-badge">
      <div class="eco-header">
        <span class="eco-icon">🍃</span>
        <span class="eco-title">Eco-Score</span>
      </div>
      <div class="eco-score">7.8 / 10</div>
      <div class="eco-details">
        <p>Sustainable Materials: High</p>
        <p>Carbon Footprint: Low</p>
      </div>
      <button class="eco-btn">View Alternatives</button>
    </div>
  `;

    // Inject into the page (typically near the price or title)
    const target = document.getElementById("priceBlockOutsideBuyBox") ||
        document.getElementById("corePrice_feature_div") ||
        productNameElement.parentElement;

    if (target) {
        target.appendChild(overlay);
    }
}

// Initial run
setTimeout(injectEcoScore, 2000);

// Watch for dynamic changes (SPAs)
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(injectEcoScore, 1000);
    }
}).observe(document, { subtree: true, childList: true });
