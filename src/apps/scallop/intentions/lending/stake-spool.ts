import { TransactionType } from '@msafe/sui3-utils';
import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletAccount } from '@mysten/wallet-standard';

import { CoreBaseIntention } from '@/apps/msafe-core/intention';
import { SuiNetworks } from '@/types';

import { ScallopClient } from '../../models/scallopClient';
import { SupportStakeMarketCoins } from '../../types';
import { TransactionSubType } from '../../types/utils';
import { scallopInstance } from '../../models';

export interface StakeSpoolIntentionData {
  amount: number | string;
  marketCoinName: SupportStakeMarketCoins;
  stakeAccountId?: string | null;
}

export class StakeSpoolIntention extends CoreBaseIntention<StakeSpoolIntentionData> {
  txType: TransactionType.Other;

  txSubType: TransactionSubType.StakeSpool;

  constructor(public readonly data: StakeSpoolIntentionData) {
    super(data);
  }

  async build(input: {
    suiClient: SuiClient;
    account: WalletAccount;
    network: SuiNetworks;
  }): Promise<TransactionBlock> {
    const scallopClient = scallopInstance.client;
    scallopClient.client = input.suiClient;
    scallopClient.walletAddress = input.account.address;
    return scallopClient.stake(this.data.marketCoinName, Number(this.data.amount), undefined, input.account.address);
  }

  static fromData(data: StakeSpoolIntentionData): StakeSpoolIntention {
    return new StakeSpoolIntention(data);
  }
}
