import { AlphaFiHelper } from '@/apps/alphafi/helper';
import { ClaimRewardIntention } from '@/apps/alphafi/intentions/claim-reward';
import { DepositDoubleAssetIntention } from '@/apps/alphafi/intentions/deposit-double-asset';
import { DepositSingleAssetIntention } from '@/apps/alphafi/intentions/deposit-single-asset';
import { WithdrawIntention } from '@/apps/alphafi/intentions/withdraw';
import { WithdrawAlphaIntention } from '@/apps/alphafi/intentions/withdraw-alpha';
import { withdrawTxb } from '@alphafi/alphafi-sdk';
import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';

describe('AlphaFi App', () => {
  it('Test AlphaFi Double Asset intention serialization', () => {
    const intention = DepositDoubleAssetIntention.fromData({
      poolName: 'ALPHA-SUI',
      amount: '1000000',
      isAmountA: true,
    });

    expect(intention.serialize()).toBe('{"amount":"1000000","isAmountA":true,"poolName":"ALPHA-SUI"}');
  });

  it('Test AlphaFi Single Asset intention serialization', () => {
    const intention = DepositSingleAssetIntention.fromData({
      poolName: 'ALPHA',
      amount: '1000000',
    });

    expect(intention.serialize()).toBe('{"amount":"1000000","poolName":"ALPHA"}');
  });

  it('Test AlphaFi Withdraw Alpha intention serialization', () => {
    const intention = WithdrawAlphaIntention.fromData({
      xTokensAmount: '1000000',
      withdrawFromLocked: true,
    });

    expect(intention.serialize()).toBe('{"withdrawFromLocked":true,"xTokensAmount":"1000000"}');
  });

  it('Test AlphaFi Withdraw intention serialization', () => {
    const intention = WithdrawIntention.fromData({
      xTokensAmount: '1000000',
      poolName: 'ALPHA-SUI',
    });

    expect(intention.serialize()).toBe('{"poolName":"ALPHA-SUI","xTokensAmount":"1000000"}');
  });

  it('Test AlphaFi Claim Reward intention serialization', () => {
    const intention = ClaimRewardIntention.fromData({});

    expect(intention.serialize()).toBe('{}');
  });

  describe('Deserialization', () => {
    const helper = new AlphaFiHelper();
    const client = new SuiClient({ url: 'https://fullnode.mainnet.sui.io/' });

    it('Deserialize DepositSingleAsset transaction', async () => {
      const unresolvedTx = await withdrawTxb(
        '30099272',
        'BLUEFIN-SUI-USDC',
        '0xd239cf3655b8465545f36c5d8d6f63fa9d00f1f199646ae7296068328db4de54',
      );
      unresolvedTx.setSender('0xd239cf3655b8465545f36c5d8d6f63fa9d00f1f199646ae7296068328db4de54');

      const resolvedTx = Transaction.from(await unresolvedTx.build({ client }));
      const data = await helper.deserialize({ transaction: resolvedTx, suiClient: client } as any);

      expect(JSON.stringify(data)).toBe(
        `{\"txType\":\"Other\",\"txSubType\":\"withdraw\",\"intentionData\":{\"poolName\":\"BLUEFIN-SUI-USDC\",\"xTokensAmount\":\"30099272\"}}`,
      );
    });
  });
});

describe('Deserialization', () => {
  const helper = new AlphaFiHelper();
  const client = new SuiClient({ url: 'https://fullnode.mainnet.sui.io/' });

  it('Deserialize DepositSingleAsset transaction', async () => {
    const unresolvedTx = await withdrawTxb(
      '21495885',
      'NAVI-LOOP-HASUI-SUI',
      '0x7349d9ec168a7c8c127e138292c2d631df965ce6b33f51cbf7e41e9cc695ad22',
    );
    unresolvedTx.setSender('0x7349d9ec168a7c8c127e138292c2d631df965ce6b33f51cbf7e41e9cc695ad22');

    const resolvedTx = Transaction.from(await unresolvedTx.build({ client }));
    const data = await helper.deserialize({ transaction: resolvedTx, suiClient: client } as any);

    expect(JSON.stringify(data)).toBe(
      `{\"txType\":\"Other\",\"txSubType\":\"withdraw\",\"intentionData\":{\"poolName\":\"NAVI-LOOP-HASUI-SUI\",\"xTokensAmount\":\"21495885\"}}`,
    );
  });

  describe('Deserialization', () => {
    const helper = new AlphaFiHelper();
    const client = new SuiClient({ url: 'https://fullnode.mainnet.sui.io/' });

    it('Deserialize DepositSingleAsset transaction', async () => {
      const unresolvedTx = await withdrawTxb(
        '30811777',
        'NAVI-LOOP-USDC-USDT',
        '0xe136f0b6faf27ee707725f38f2aeefc51c6c31cc508222bee5cbc4f5fcf222c3',
      );
      unresolvedTx.setSender('0xe136f0b6faf27ee707725f38f2aeefc51c6c31cc508222bee5cbc4f5fcf222c3');

      const resolvedTx = Transaction.from(await unresolvedTx.build({ client }));
      const data = await helper.deserialize({ transaction: resolvedTx, suiClient: client } as any);

      expect(JSON.stringify(data)).toBe(
        `{\"txType\":\"Other\",\"txSubType\":\"withdraw\",\"intentionData\":{\"poolName\":\"NAVI-LOOP-USDC-USDT\",\"xTokensAmount\":\"30811777\"}}`,
      );
    });
  });
});
