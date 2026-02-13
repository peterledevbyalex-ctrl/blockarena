// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {ArenaFacet} from "../src/facets/ArenaFacet.sol";
import {OracleFacet} from "../src/facets/OracleFacet.sol";
import {FeeFacet} from "../src/facets/FeeFacet.sol";
import {EmergencyFacet} from "../src/facets/EmergencyFacet.sol";

interface IMockPriceFeed {
    function setPrice(int256 _price) external;
}

/// @title TestFlow — Full E2E test on MegaETH testnet
/// @dev forge script script/TestFlow.s.sol --rpc-url megaeth_testnet --broadcast --skip-simulation -vvvv
contract TestFlow is Script {
    address constant DIAMOND = 0xDe32993819Ca96eb08e8bE8b7D5A31585a17D033;
    address constant MOCK_FEED = 0x905e4aCb861E5FfA9fF4E7d80625F888394D0600;
    
    function run() external {
        vm.startBroadcast();
        
        ArenaFacet arena = ArenaFacet(DIAMOND);
        OracleFacet oracle = OracleFacet(DIAMOND);
        
        // 1. Create arena with long duration so we can interact (50000 blocks = ~500s)
        uint256 arenaId = arena.createArena(LibBlockArena.Tier(0), 50000);
        console.log("Created arena:", arenaId);
        
        // 2. Join arena
        arena.joinArena{value: 0.001 ether}(arenaId);
        console.log("Joined arena");
        
        // Note: commit/reveal/recordTicks need to happen after arena starts
        // and in separate transactions due to block timing
        
        vm.stopBroadcast();
        
        console.log("Arena created and joined. Now wait for arena to start, then:");
        console.log("1. recordTicks to build price tape");
        console.log("2. commitPrediction during arena");  
        console.log("3. revealPrediction after arena ends");
        console.log("4. finalizeArena");
    }
}
