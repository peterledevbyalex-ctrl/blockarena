// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {LibBlockArena} from "../libraries/LibBlockArena.sol";
import {IRedStonePriceFeed} from "../interfaces/IRedStonePriceFeed.sol";

/// @title OracleFacet — RedStone oracle integration
/// @dev MegaETH Notes:
///   - recordTick accesses block.number → triggers 20M volatile data gas cap.
///     Single tick recording is lightweight (~50K gas), well under limit.
///   - recordTicks (batch): loop writes to priceTapeWords. Each new uint256 word
///     is a 0→non-zero SSTORE (2M+ gas). For 256-tick arena: 1 word = 1 new slot.
///     For 1500-tick arena: 6 words = 6 new slots. Well under 1,000 slot limit.
///   - maxTicks param prevents exceeding per-TX gas limits. Recommend maxTicks ≤ 500.
contract OracleFacet {
    event OracleSet(address indexed oracle);
    event TicksRecorded(uint256 indexed arenaId, uint40 count);

    error OracleNotSet();
    error ArenaNotFound();
    error ArenaAlreadyFinalized();
    error ArenaNotActive();
    error TapeAlreadyComplete();
    error NoTicksToRecord();
    error ZeroAddress();

    function setOracle(address priceFeed) external {
        LibDiamond.enforceIsContractOwner();
        if (priceFeed == address(0)) revert ZeroAddress();
        LibBlockArena.appStorage().oracle = priceFeed;
        emit OracleSet(priceFeed);
    }

    function oracle() external view returns (address) {
        return LibBlockArena.appStorage().oracle;
    }

    function recordTick(uint256 arenaId) external {
        LibBlockArena.AppStorage storage s = LibBlockArena.appStorage();
        if (s.oracle == address(0)) revert OracleNotSet();
        LibBlockArena.Arena storage a = s.arenas[arenaId];
        if (a.startBlock == 0) revert ArenaNotFound();
        if (a.finalized) revert ArenaAlreadyFinalized();

        uint40 currentBlock = uint40(block.number);
        if (currentBlock < a.startBlock || currentBlock > a.endBlock) revert ArenaNotActive();

        LibBlockArena.OracleState storage os = s.oracleState[arenaId];
        uint40 totalTicks = a.endBlock - a.startBlock;
        if (os.ticksRecorded >= totalTicks) revert TapeAlreadyComplete();

        IRedStonePriceFeed feed = IRedStonePriceFeed(s.oracle);
        if (os.ticksRecorded == 0) {
            os.nextBlock = a.startBlock;
            os.lastPrice = feed.latestAnswer();
        }

        if (currentBlock < os.nextBlock) revert NoTicksToRecord();

        int256 currentPrice = feed.latestAnswer();
        uint40 tickIndex = os.ticksRecorded;
        uint256 wordIdx = tickIndex >> 8;
        uint256 bitIdx = 255 - (tickIndex & 0xFF);

        while (s.priceTapeWords[arenaId].length <= wordIdx) {
            s.priceTapeWords[arenaId].push(0);
        }

        if (currentPrice >= os.lastPrice) {
            s.priceTapeWords[arenaId][wordIdx] |= (1 << bitIdx);
        }

        os.lastPrice = currentPrice;
        os.ticksRecorded++;
        os.nextBlock = currentBlock + 1;

        emit TicksRecorded(arenaId, os.ticksRecorded);
    }

    function recordTicks(uint256 arenaId, uint40 maxTicks) external {
        LibBlockArena.AppStorage storage s = LibBlockArena.appStorage();
        if (s.oracle == address(0)) revert OracleNotSet();
        LibBlockArena.Arena storage a = s.arenas[arenaId];
        if (a.startBlock == 0) revert ArenaNotFound();
        if (a.finalized) revert ArenaAlreadyFinalized();

        uint40 currentBlock = uint40(block.number);
        if (currentBlock < a.startBlock) revert ArenaNotActive();

        LibBlockArena.OracleState storage os = s.oracleState[arenaId];
        uint40 totalTicks = a.endBlock - a.startBlock;
        if (os.ticksRecorded >= totalTicks) revert TapeAlreadyComplete();

        IRedStonePriceFeed feed = IRedStonePriceFeed(s.oracle);
        if (os.ticksRecorded == 0) {
            os.nextBlock = a.startBlock;
            os.lastPrice = feed.latestAnswer();
        }

        if (currentBlock < os.nextBlock) revert NoTicksToRecord();

        int256 currentPrice = feed.latestAnswer();
        uint40 endBlock = currentBlock < a.endBlock ? currentBlock : a.endBlock;
        uint40 availableTicks = endBlock - os.nextBlock + 1;
        uint40 remaining = totalTicks - os.ticksRecorded;
        uint40 ticksToRecord = availableTicks < remaining ? availableTicks : remaining;
        if (ticksToRecord > maxTicks) ticksToRecord = maxTicks;
        if (ticksToRecord == 0) revert NoTicksToRecord();

        bool isUp = currentPrice >= os.lastPrice;

        for (uint40 i; i < ticksToRecord; ++i) {
            uint40 tickIndex = os.ticksRecorded + i;
            uint256 wordIdx = tickIndex >> 8;
            uint256 bitIdx = 255 - (tickIndex & 0xFF);

            while (s.priceTapeWords[arenaId].length <= wordIdx) {
                s.priceTapeWords[arenaId].push(0);
            }

            if (isUp) {
                s.priceTapeWords[arenaId][wordIdx] |= (1 << bitIdx);
            }
        }

        os.lastPrice = currentPrice;
        os.ticksRecorded += ticksToRecord;
        os.nextBlock = endBlock + 1;

        emit TicksRecorded(arenaId, os.ticksRecorded);
    }
}
