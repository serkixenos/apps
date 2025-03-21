// Copyright 2017-2025 @polkadot/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { TypeRegistry } from '@polkadot/types/create';
import { BN } from '@polkadot/util';

import { calculateBountyBond } from './calculateBountyBond.js';

describe('Calculate bounty bond', () => {
  it('sums deposit base and deposit for each byte of description', () => {
    const registry = new TypeRegistry();
    const depositBase = registry.createType('BalanceOf', new BN(166666666666));
    const depositPerByte = registry.createType('BalanceOf', new BN(1666666666));

    expect(calculateBountyBond('Kusama network UI Bounty', depositBase, depositPerByte)).toEqual(new BN(206666666650));
  });

  it('handles utf-8 chars', () => {
    const registry = new TypeRegistry();
    const depositBase = registry.createType('BalanceOf', new BN(100));
    const depositPerByte = registry.createType('BalanceOf', new BN(10));

    expect(calculateBountyBond('óy😅€', depositBase, depositPerByte)).toEqual(new BN(200));
  });
});
