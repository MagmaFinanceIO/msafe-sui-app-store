import { TransactionType } from '@msafe/sui3-utils';
import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletAccount } from '@mysten/wallet-standard';

import { BaseIntentionLegacy } from '@/apps/interface/sui-js';

import { getSwapRouterTxb } from '../api/swap';
import { CetusIntentionData, TransactionSubType, SuiNetworks } from '../types';

export class SwapIntention extends BaseIntentionLegacy<CetusIntentionData> {
  txType = TransactionType.Other;

  txSubType = TransactionSubType.Swap;

  constructor(public readonly data: CetusIntentionData) {
    super(data);
  }

  async build(input: {
    suiClient: SuiClient;
    account: WalletAccount;
    network: SuiNetworks;
  }): Promise<TransactionBlock> {
    const { account, network } = input;
    const { txbParams } = this.data;
    const txb = await getSwapRouterTxb(txbParams?.createTxParams, txbParams?.slippage, account, network);
    return txb;
  }

  static fromData(data: CetusIntentionData) {
    return new SwapIntention(data);
  }
}
