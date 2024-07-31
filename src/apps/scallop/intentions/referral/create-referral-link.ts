import { TransactionType } from '@msafe/sui3-utils';
import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletAccount } from '@mysten/wallet-standard';

import { CoreBaseIntention } from '@/apps/msafe-core/intention';
import { SuiNetworks } from '@/types';

import { ScallopClient } from '../../models/scallopClient';
import { TransactionSubType } from '../../types/utils';
import { scallopInstance } from '../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateReferralLinkIntentionData {}

export class CreateReferralLinkIntention extends CoreBaseIntention<CreateReferralLinkIntentionData> {
  txType: TransactionType.Other;

  txSubType: TransactionSubType.CreateReferralLink;

  constructor(public readonly data: CreateReferralLinkIntentionData) {
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
    return scallopClient.createReferralLink();
  }

  static fromData(data: CreateReferralLinkIntentionData): CreateReferralLinkIntention {
    return new CreateReferralLinkIntention(data);
  }
}
