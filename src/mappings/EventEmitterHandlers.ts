// SPDX-License-Identifier: Apache-2.0

// Auto-generated
import {Supply,Withdraw,Deposit,Redeem,Borrow,Repay,Swap,PositionLiquidation,Liquidation,ClosePosition,Close} from "../types";
import {BorrowLog,CloseLog,ClosePositionLog,DepositLog,LiquidationLog,PositionLiquidationLog,RedeemLog,RepayLog,SupplyLog,SwapLog,WithdrawLog,} from "../types/abi-interfaces/EventEmitter";


export async function handleBorrowEventEmitterLog(log: BorrowLog ): Promise<void> {
    logger.info(`New transfer Borrow log at block ${log.blockNumber}`);
	const borrow = Borrow.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		borrower: log.args!.borrower,
		amount: BigInt(log.args!.amount.toString()),
		borrowRate: BigInt(log.args!.borrowRate.toString()),
	});

	await borrow.save();
}

export async function handleCloseEventEmitterLog(log: CloseLog ): Promise<void> {
    logger.info(`New transfer Close log at block ${log.blockNumber}`);
	const close = Close.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,		
		poolUsd: log.args!.poolUsd,
		account: log.args!.account,
		amountUsdStartClose: BigInt(log.args!.amountUsdStartClose.toString()),
	    amountUsdAfterRepayAndSellCollateral: BigInt(log.args!.amountUsdAfterRepayAndSellCollateral.toString()),
	    amountUsdAfterBuyCollateralAndRepay: BigInt(log.args!.amountUsdAfterBuyCollateralAndRepay.toString()),
	});

	await close.save();
}

export async function handleClosePositionEventEmitterLog(log: ClosePositionLog ): Promise<void> {
    logger.info(`New transfer ClosePosition log at block ${log.blockNumber}`);
	const closePosition = ClosePosition.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,		
		poolUsd: log.args!.poolUsd,
		account: log.args!.account,
		collateral: BigInt(log.args!.collateral.toString()),
	    debt: BigInt(log.args!.debt.toString()),
	    remainUsd: BigInt(log.args!.remainUsd.toString()),
	});

	await closePosition.save();
}

export async function handleDepositEventEmitterLog(log: DepositLog ): Promise<void> {
    logger.info(`New transfer Deposit log at block ${log.blockNumber}`);
	const deposit = Deposit.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		depositer: log.args!.depositer,
		amount: BigInt(log.args!.amount.toString()),
	});

	await deposit.save();
}

export async function handleLiquidationEventEmitterLog(log: LiquidationLog ): Promise<void> {
    logger.info(`New transfer Liquidation log at block ${log.blockNumber}`);
	const liquidation = Liquidation.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		liquidator: log.args!.liquidator,		
		account: log.args!.account,
		healthFactor: BigInt(log.args!.healthFactor.toString()),
	    healthFactorLiquidationThreshold: BigInt(log.args!.healthFactorLiquidationThreshold.toString()),
	    totalCollateralUsd: BigInt(log.args!.totalCollateralUsd.toString()),
	    totalDebtUsd: BigInt(log.args!.totalDebtUsd.toString()),
	});

	await liquidation.save();
}

export async function handlePositionLiquidationEventEmitterLog(log: PositionLiquidationLog ): Promise<void> {
    logger.info(`New transfer PositionLiquidation log at block ${log.blockNumber}`);
	const positionLiquidation = PositionLiquidation.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		liquidator: log.args!.liquidator,		
		pool: log.args!.pool,
		account: log.args!.account,
		collateral: BigInt(log.args!.collateral.toString()),
	    debt: BigInt(log.args!.debt.toString()),
	    price: BigInt(log.args!.price.toString()),
	});

	await positionLiquidation.save();
}

export async function handleRedeemEventEmitterLog(log: RedeemLog ): Promise<void> {
    logger.info(`New transfer Redeem log at block ${log.blockNumber}`);
	const redeem = Redeem.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		redeemer: log.args!.redeemer,
		to: log.args!.to,
		amount: BigInt(log.args!.amount.toString()),
	});

	await redeem.save();
}

export async function handleRepayEventEmitterLog(log: RepayLog ): Promise<void> {
    logger.info(`New transfer Repay log at block ${log.blockNumber}`);
	const repay = Repay.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		repayer: log.args!.repayer,
		amount: BigInt(log.args!.amount.toString()),
		useCollateral: log.args!.useCollateral,
	});

	await repay.save();
}

export async function handleSupplyEventEmitterLog(log: SupplyLog ): Promise<void> {
    logger.info(`New transfer Supply log at block ${log.blockNumber}`);
	const supply = Supply.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		supplier: log.args!.supplier,
		to: log.args!.to,
		amount: BigInt(log.args!.amount.toString()),
	});

	await supply.save();
}

export async function handleSwapEventEmitterLog(log: SwapLog ): Promise<void> {
    logger.info(`New transfer Swap log at block ${log.blockNumber}`);
	const swap = Swap.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		underlyingAssetIn: log.args!.underlyingAssetIn,
		underlyingAssetOut: log.args!.underlyingAssetOut,
		account: log.args!.account,
		amountIn: BigInt(log.args!.amountIn.toString()),
		amountOut: BigInt(log.args!.amountOut.toString()),
	});

	await swap.save();
}

export async function handleWithdrawEventEmitterLog(log: WithdrawLog ): Promise<void> {
    logger.info(`New transfer Withdraw log at block ${log.blockNumber}`);
	const withdraw = Withdraw.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		withdrawer: log.args!.withdrawer,
		to: log.args!.to,
		amount: BigInt(log.args!.amount.toString()),
	});

	await withdraw.save();
}
