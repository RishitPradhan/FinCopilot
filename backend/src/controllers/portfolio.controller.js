const Portfolio = require('../models/Portfolio');
const marketService = require('../services/marketService');

const portfolioController = {
    getHoldings: async (req, res, next) => {
        try {
            const holdings = await Portfolio.find({ userId: req.user.id });
            res.json({ success: true, holdings });
        } catch (error) {
            next(error);
        }
    },

    addHolding: async (req, res, next) => {
        try {
            const { stock, quantity, buyPrice, sector } = req.body;
            const holding = new Portfolio({
                userId: req.user.id,
                stock,
                quantity,
                buyPrice,
                sector: sector || 'Other'
            });
            await holding.save();
            res.status(201).json({ success: true, holding });
        } catch (error) {
            next(error);
        }
    },

    removeHolding: async (req, res, next) => {
        try {
            await Portfolio.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
            res.json({ success: true, message: 'Holding removed' });
        } catch (error) {
            next(error);
        }
    },

    getAnalysis: async (req, res, next) => {
        try {
            const holdings = await Portfolio.find({ userId: req.user.id });
            let totalValue = 0;
            let totalCost = 0;
            const sectorBreakdown = {};

            for (const h of holdings) {
                const currentPrice = await marketService.getCurrentPrice(h.stock);
                const cost = h.quantity * h.buyPrice;
                const value = h.quantity * currentPrice;

                totalCost += cost;
                totalValue += value;

                sectorBreakdown[h.sector] = (sectorBreakdown[h.sector] || 0) + value;
            }

            res.json({
                success: true,
                totalValue,
                totalPNL: totalValue - totalCost,
                pnlPercentage: totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0,
                sectorBreakdown
            });
        } catch (error) {
            next(error);
        }
    },

    getRisk: async (req, res, next) => {
        try {
            // Mock risk calculation logic
            res.json({
                success: true,
                riskScore: 68,
                diversificationIndex: 0.72,
                topEmissions: ['Tech', 'Energy']
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = portfolioController;
