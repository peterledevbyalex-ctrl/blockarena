// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {ArenaEngine} from "../src/ArenaEngine.sol";

/// @title Deploy ArenaEngine (standalone, non-diamond)
/// @dev MegaETH deployment:
///   forge script script/Deploy.s.sol \
///     --rpc-url megaeth_testnet \
///     --broadcast \
///     --skip-simulation \
///     --gas-limit 5000000 \
///     --interactives 1 \
///     -vvvv
///
///   Verify:
///   forge verify-contract <address> src/ArenaEngine.sol:ArenaEngine \
///     --chain 6343 \
///     --etherscan-api-key $MEGAETH_ETHERSCAN_KEY \
///     --verifier-url https://megaeth-testnet-v2.blockscout.com/api
contract DeployScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ArenaEngine engine = new ArenaEngine();
        console.log("ArenaEngine deployed to:", address(engine));

        vm.stopBroadcast();
    }
}
