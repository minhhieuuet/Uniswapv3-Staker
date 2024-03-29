# uniswap-v3-staker

This is the canonical staking contract designed for [Uniswap V3](https://github.com/Uniswap/uniswap-v3-core).

## Deployments

Note that the v1.0.0 release is susceptible to a [high-difficulty, never-exploited vulnerability](https://github.com/Uniswap/v3-staker/issues/219). For this reason, please use the v1.0.2 release, deployed and verified on Etherscan on all networks at the address: `0xe34139463bA50bD61336E0c446Bd8C0867c6fE65`:

| Network          | Explorer                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------- |
| Mainnet          | https://etherscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65                  |
| Rinkeby          | https://rinkeby.etherscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65          |
| Kovan            | https://kovan.etherscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65            |
| Ropsten          | https://ropsten.etherscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65          |
| Goerli           | https://goerli.etherscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65           |
| Arbitrum Rinkeby | https://testnet.arbiscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65           |
| Arbitrum One     | https://arbiscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65                   |
| Optimism         | https://optimistic.etherscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65       |
| Optimism Kovan   | https://kovan-optimistic.etherscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65 |

⚠️DEPRECATED⚠️: For historical verification purposes only, the staker at tag v1.0.0 was deployed at the address: `0x1f98407aaB862CdDeF78Ed252D6f557aA5b0f00d`

["Reward token ", "pool address", start date, end date, "refundee"]
["0x7783c490B6D12E719A4271661D6Eb03539eB9BC9","0x2d6672a0a15F01F076A50380Da7885076dAAaB61", 1695195247, 1695601743, "0x0878025B1D4362c3787121BFE7668a3fE031dB4C"]
Token: 11647

## Steps:
- Call **createIncentive** to create new incentive
- Approve v3NFT position for the staker contract
- Use **safeTransferFrom** to stake nft, with data, calculate by below code
```sh
struct IncentiveKey {
   address rewardToken;
   address pool;
   uint256 startTime;
   uint256 endTime;
   address refundee;
}
function computeUnhashedKey(IncentiveKey memory key)  public pure returns (bytes memory) {
       return abi.encode(key);
   }
```
- Now we can **getRewardInfo** to view the reward by the tokenId
* Unstake token
- Call **unstakeToken** first
- Call **claimReward** to withdraw the reward token, set the **amountRequested = 0** if you want to with draw all
- Call **withdrawToken** to withdraw the nft position
## Links:

- [Contract Design](docs/Design.md)

## Development and Testing

```sh
$ yarn
$ yarn test
```

## Gas Snapshots

```sh
# if gas snapshots need to be updated
$ UPDATE_SNAPSHOT=1 yarn test
```

## Contract Sizing

```sh
$ yarn size-contracts
```
