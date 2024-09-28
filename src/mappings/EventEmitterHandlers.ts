// SPDX-License-Identifier: Apache-2.0

// Auto-generated
import {
	Supply,
	Withdraw,
	Deposit,
	Redeem,
	Borrow,
	Repay,
	Swap,
	LiquidationPosition,
	Liquidation,
	ClosePosition,
	Close,
	PoolUpdated, PoolIntervalEntity , MyPrincipalEntity
} from "../types";
import {BorrowLog,CloseLog,ClosePositionLog,DepositLog,LiquidationLog,PoolUpdatedLog,LiquidationPositionLog,RedeemLog,RepayLog,SupplyLog,SwapLog,WithdrawLog,} from "../types/abi-interfaces/EventEmitter";
const crypto = require('crypto');

export async function handlePoolUpdateFourHourEventEmitterLog(log: PoolUpdatedLog ): Promise<void> {
	logger.info(`New transfer PoolUpdated 4H log at block ${log.blockNumber}`);
	const blockTimeStamp=log.transaction.blockTimestamp
	const pool=log.args!.pool
	const contractAddress=log.address
	const currentDate = new Date(Number(blockTimeStamp*BigInt(1000)));
	const currentHours = currentDate.getUTCHours();
	const startHour = Math.floor(currentHours / 4) * 4;
	const startDate = new Date(currentDate);
	startDate.setUTCHours(startHour, 0, 0, 0);
	const endDate = new Date(startDate);
	endDate.setUTCHours(startHour + 4);
	const endTimeStamp=(endDate.getTime()/Number(1000)).toString()
	const id=crypto.createHash('md5').update(pool+"_4H_"+endTimeStamp).digest('hex');
	const lastEntity=await PoolIntervalEntity.getByFields([
		["id", "=", id]
	]);
	if(lastEntity.length>0){
		const lastData=lastEntity[0]
		const updatedCount=lastData.updatedCount
		const totalCount=updatedCount+BigInt(1)
		let totalLiquidityRate = lastData.liquidityRate*updatedCount+BigInt(log.args!.liquidityRate.toString());
		let aveLiquidityRate=totalLiquidityRate/totalCount;
		let totalBorrowRate = lastData.borrowRate*updatedCount+BigInt(log.args!.borrowRate.toString());
		let aveBorrowRate=totalBorrowRate/totalCount;

		const poolUpdated4H = PoolIntervalEntity.create({
			id: lastData.id,
			updatedTimestamp: lastData.updatedTimestamp,
			contractAddress: lastData.contractAddress,
			pool:lastData.pool,
			liquidityRate: aveLiquidityRate,
			borrowRate: aveBorrowRate,
			updatedCount:totalCount,
			interval:"4H"
		});
		await poolUpdated4H.save();
	}else {
		const poolUpdated4H = PoolIntervalEntity.create({
			id: id,
			updatedTimestamp: BigInt(endTimeStamp),
			contractAddress: contractAddress,
			pool:pool,
			liquidityRate: BigInt(log.args!.liquidityRate.toString()),
			borrowRate: BigInt(log.args!.borrowRate.toString()),
			updatedCount:BigInt(1),
			interval:"4H"
		});

		await poolUpdated4H.save();
	}
}

export async function handleBorrowEventEmitterLog(log: BorrowLog ): Promise<void> {
    logger.info(`New transfer Borrow log at block ${log.blockNumber}`);
	const borrow = Borrow.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		borrower: log.args!.borrower,
		amount: BigInt(log.args!.amount.toString()),
		borrowRate: BigInt(log.args!.borrowRate.toString()),
		collateral:BigInt(log.args!.collateral.toString()),
		debtScaled:BigInt(log.args!.debtScaled.toString()),
	});

	await borrow.save();
}

export async function handleCloseEventEmitterLog(log: CloseLog ): Promise<void> {
    logger.info(`New transfer Close log at block ${log.blockNumber}`);
	const close = Close.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
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
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
		pool: log.args!.pool,		
		poolUsd: log.args!.poolUsd,
		account: log.args!.account,
		debtClosed: BigInt(log.args!.debtClosed.toString()),
		remainUsd: BigInt(log.args!.remainUsd.toString()),
		remainCollateral: BigInt(log.args!.remainCollateral.toString()),
		collateralSold: BigInt(log.args!.collateralSold.toString()),
		collateralUsd: BigInt(log.args!.collateralUsd.toString()),
		debtScaledUsd: BigInt(log.args!.debtScaledUsd.toString())
	});

	await closePosition.save();
}

export async function handleDepositEventEmitterLog(log: DepositLog ): Promise<void> {
    logger.info(`New transfer Deposit log at block ${log.blockNumber}`);
	const deposit = Deposit.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		depositer: log.args!.depositer,
		amount: BigInt(log.args!.amount.toString()),
		collateral: BigInt(log.args!.collateral.toString()),
		debtScaled: BigInt(log.args!.debtScaled.toString())
	});

	await deposit.save();
}

export async function handleLiquidationEventEmitterLog(log: LiquidationLog ): Promise<void> {
    logger.info(`New transfer Liquidation log at block ${log.blockNumber}`);
	const liquidation = Liquidation.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
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

export async function handlePoolUpdatedEventEmitterLog(log: PoolUpdatedLog ): Promise<void> {
    logger.info(`New transfer PoolUpdated log at block ${log.blockNumber}`);
	const poolUpdate = PoolUpdated.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		liquidityRate: BigInt(log.args!.liquidityRate.toString()),
		borrowRate: BigInt(log.args!.borrowRate.toString()),
		liquidityIndex: BigInt(log.args!.liquidityIndex.toString()),
		borrowIndex: BigInt(log.args!.borrowIndex.toString()),
	});

	await poolUpdate.save();
}

export async function handlePositionLiquidationEventEmitterLog(log: LiquidationPositionLog ): Promise<void> {
    logger.info(`New transfer PositionLiquidation log at block ${log.blockNumber}`);

	const txId = log.transactionHash;
	const contractAddress = log.address;
	const pool = log.args!.pool;
	const account = log.args!.account;
	const liquidator = log.args!.liquidator;
	const liquidationPositionId=crypto.createHash('md5').update(txId+pool+account+liquidator+contractAddress).digest('hex');
	const positionLiquidation = LiquidationPosition.create({
		id: liquidationPositionId,
		txId:txId,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
		contractAddress: contractAddress,
		liquidator: liquidator,
		pool: pool,
		account: account,
		collateralUsd: BigInt(log.args!.collateralUsd.toString()),
	    debtUsd: BigInt(log.args!.debtUsd.toString()),
	});

	await positionLiquidation.save();
}

export async function handleRedeemEventEmitterLog(log: RedeemLog ): Promise<void> {
    logger.info(`New transfer Redeem log at block ${log.blockNumber}`);
	const redeem = Redeem.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		redeemer: log.args!.redeemer,
		to: log.args!.to,
		amount: BigInt(log.args!.amount.toString()),
		collateral: BigInt(log.args!.collateral.toString()),
		debtScaled: BigInt(log.args!.debtScaled.toString())
	});

	await redeem.save();
}

export async function handleRepayEventEmitterLog(log: RepayLog ): Promise<void> {
    logger.info(`New transfer Repay log at block ${log.blockNumber}`);
	const repay = Repay.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
		contractAddress: log.address,
		pool: log.args!.pool,
		repayer: log.args!.repayer,
		amount: BigInt(log.args!.amount.toString()),
		useCollateral: log.args!.useCollateral,
		collateral: BigInt(log.args!.collateral.toString()),
		debtScaled: BigInt(log.args!.debtScaled.toString())
	});

	await repay.save();
}

export async function handleSupplyEventEmitterLog(log: SupplyLog ): Promise<void> {
    logger.info(`New transfer Supply log at block ${log.blockNumber}`);

	const supplierAddress = log.args!.supplier;
	const poolAddress=log.args!.pool;
	const supplyAmount=BigInt(log.args!.amount.toString());

	const supply = Supply.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
		contractAddress: log.address,
		pool: poolAddress,
		supplier: supplierAddress,
		to: log.args!.to,
		amount: supplyAmount,
	});

	await supply.save();

	const id=crypto.createHash('md5').update(poolAddress+supplierAddress).digest('hex');
	const myPrincipals=await MyPrincipalEntity.getByFields([
		["id", "=", id]
	]);
	if(myPrincipals.length>0){
		const principalData=myPrincipals[0]
		const principal=supplyAmount+principalData.principal;
		const myPrincipal = MyPrincipalEntity.create({
			id:id,
			account:supplierAddress,
			pool:poolAddress,
			principal:principal
		});
		await myPrincipal.save();
	}else{
		const myPrincipal = MyPrincipalEntity.create({
			id:id,
			account:supplierAddress,
			pool:poolAddress,
			principal:supplyAmount,
		});
		await myPrincipal.save();
	}
}

export async function handleSwapEventEmitterLog(log: SwapLog ): Promise<void> {
    logger.info(`New transfer Swap log at block ${log.blockNumber}`);
	const swap = Swap.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
		contractAddress: log.address,
		poolIn: log.args!.poolIn,
		poolOut: log.args!.poolOut,
		account: log.args!.account,
		amountIn: BigInt(log.args!.amountIn.toString()),
		amountOut: BigInt(log.args!.amountOut.toString()),
		fee: BigInt(log.args!.fee.toString()),
		collateralIn: BigInt(log.args!.collateralIn.toString()),
		debtScaledIn:BigInt(log.args!.debtScaledIn.toString()),
		collateralOut: BigInt(log.args!.collateralOut.toString()),
		debtScaledOut: BigInt(log.args!.debtScaledOut.toString())
	});

	await swap.save();
}

export async function handleWithdrawEventEmitterLog(log: WithdrawLog ): Promise<void> {
    logger.info(`New transfer Withdraw log at block ${log.blockNumber}`);

	const withdrawer = log.args!.withdrawer;
	const poolAddress=log.args!.pool;
	const withdrawAmount=BigInt(log.args!.amount.toString());

	const withdraw = Withdraw.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		blockTimestamp: BigInt(log.transaction.blockTimestamp.toString()),
		contractAddress: log.address,
		pool: poolAddress,
		withdrawer: withdrawer,
		to: log.args!.to,
		amount: withdrawAmount,
	});

	await withdraw.save();


	const id=crypto.createHash('md5').update(poolAddress+withdrawer).digest('hex');
	const myPrincipals=await MyPrincipalEntity.getByFields([
		["id", "=", id]
	]);
	if(myPrincipals.length>0){
		const principalData=myPrincipals[0]
		const principal=principalData.principal-withdrawAmount<BigInt(0)? BigInt(0):principalData.principal-withdrawAmount;
		const myPrincipal = MyPrincipalEntity.create({
			id:id,
			account:withdrawer,
			pool:poolAddress,
			principal:principal
		});
		await myPrincipal.save();
	}else{
		const myPrincipal = MyPrincipalEntity.create({
			id:id,
			account:withdrawer,
			pool:poolAddress,
			principal:BigInt(0),
		});
		await myPrincipal.save();
	}
}

