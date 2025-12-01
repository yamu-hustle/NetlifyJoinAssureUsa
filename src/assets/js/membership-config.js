/**
 * Membership Product Configuration
 * Maps product IDs to their RRP (Recommended Retail Price)
 */
export const PRODUCT_CONFIG = {
    // Product ID: RRP
    32: 476,  // Assure Platinum Annual
    33: 44,   // Assure Platinum Monthly
    34: 367,  // Assure Gold Annual
    35: 34,   // Assure Gold Monthly
};

// Dealer ID - can be changed if necessary
export const DEALER_ID = 7;

// Campaign name
export const CAMPAIGN_NAME = 'joinassureusa';

/**
 * Get RRP for a product ID
 * @param {number} productId - The product ID
 * @returns {number|null} - The RRP or null if not found
 */
export function getRRP(productId) {
    return PRODUCT_CONFIG[productId] || null;
}

